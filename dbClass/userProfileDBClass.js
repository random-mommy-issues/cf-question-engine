import db from "../dbClass/dbClass.js";

class userProfileDB {
    constructor(dbInstance = db) {
        this.db = dbInstance;
        this.collection = this.db.client
            .db("cf")
            .collection("userProfiles");
    }

    async upsertUserProfile(userProfile) {
        if (!userProfile || !userProfile.handle) {
            throw new Error("Invalid user profile");
        }

        const now = new Date();

        const doc = {
            handle: userProfile.handle,
            rating: userProfile.rating ?? null,

            tag_data: userProfile.tag_data,
            avg_rating: userProfile.avg_rating,
            solvedCount: userProfile.solvedCount,
            recent_activity: userProfile.recent_activity ?? null,

            updatedAt: now
        };

        const result = await this.collection.updateOne(
            { handle: userProfile.handle },   // logical match only
            {
                $set: doc,
                $setOnInsert: {
                    createdAt: now
                }
            },
            { upsert: true }
        );

        return {
            upserted: result.upsertedCount === 1,
            matched: result.matchedCount,
            modified: result.modifiedCount
        };
    }

    async getUserProfile(handle) {
        if (!handle) {
            throw new Error("Handle is required");
        }
        const userProfile = await this.collection.findOne({ handle: handle });
        return userProfile;
        
    }
}

export default new userProfileDB(db);
