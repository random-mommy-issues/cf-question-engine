import db from "./dbClass.js";

class qnDB{
    constructor(dbInstance){
        this.db = dbInstance;
        this.collection = this.db.client.db("cf").collection("questions");
    }

    async getQuestions(upperLimit , lowerLimit){
        const questions = await this.collection.find({
            $expr: {
                $and: [
                    { $lt: ["$rating", upperLimit] },
                    { $gt: ["$rating", lowerLimit] }
                ]
            }
        }).toArray();

        return questions;
    }

}

export default new qnDB(db);
