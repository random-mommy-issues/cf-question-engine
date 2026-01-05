import { UserProfile } from "../userProfile/userProfileClass.js";
import { Engine } from "../EngineClass/EngineClass.js";
import qnDB from "../dbClass/qnDBClass.js";
class EngineController {
    constructor(userData){
        this.userProfile = new UserProfile(userData.user);
        this.submissions = userData.submissions;
        this.engine = new Engine(this.userProfile , this.submissions) ;
    };
    async EngineControllerMethod(){
        this.userProfile.calculate(this.submissions);
        const recommendedQuestions = await this.engine.recommendEngine(qnDB , this.submissions ) ;
        return recommendedQuestions ;
    };
}

export {EngineController} ;