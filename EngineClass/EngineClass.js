class Engine {
    constructor(userProfile , submissions ){
        this.upperLimit = userProfile.maxRating  + 300 ;
        this.lowerLimit = userProfile.maxRating - 200 ;
        this.handle  = userProfile.handle ;
        this.tag_data = userProfile.tag_data ;
        this.submissions = submissions;
        this.targetRating = userProfile.rating + 200 ;
    }

    async recommendEngine( qnDB , submissions ){
        const questionsList = await qnDB.getQuestions(this.upperLimit , this.lowerLimit) ;
        for (const qn of questionsList){
            let tag_score = 0 ;
            let tagCount = 0 ;
            for(const tags of qn.tags){
            tag_score = tag_score + ( this.tag_data[tags]?.successRate  || 0 ) ;
            tagCount = tagCount + 1 ;
            }
            tag_score = tagCount ? tag_score/ tagCount : 0 ;
            qn['tag_score'] = 1- tag_score ;
            let rating_score = Math.exp(- Math.pow((qn.rating || qn['rating']) - this.targetRating, 2) / Math.pow(150, 2));
            qn['rating_score'] = rating_score ;
            let novelty_score = 1 / (1 + qn['solvedCount'] ) ;
            qn['novelty_score'] = novelty_score ;
            qn['final_score'] = 0.4 * qn['rating_score'] + 0.3 * qn['tag_score'] + 0.2 * qn['novelty_score']  + 0.1 * qn['popularityScore'] ;

        }
        questionsList.sort((a, b) => (b.final_score ?? 0) - (a.final_score ?? 0));
        return questionsList;

    }
}
export {Engine} ;