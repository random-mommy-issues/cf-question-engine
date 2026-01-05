class UserProfile {
    constructor(userData) {
        this.handle = userData.handle;
        this.rating = userData.rating;
        this.maxRating = userData.maxRating;
        this.tag_data = {};
        this.avg_rating = 0;
        this.recent_activity = [];
        this.solvedCount = 0;
    }

    calculate(submissions) {
    let solvedRatingsSum = 0;
    let latestTime = 0;

    const solvedProblems = new Set();
    const attemptedProblems = new Set();

    for (const sub of submissions) {
        const verdict = sub.verdict;
        const problem = sub.problem;
        if (!problem || !problem.tags) continue;

        const pid = `${problem.contestId}${problem.index}`;

        latestTime = Math.max(latestTime, sub.creationTimeSeconds);

        if (verdict === "OK" && typeof problem.rating === "number") {
            if (!solvedProblems.has(pid)) {
                solvedProblems.add(pid);
                solvedRatingsSum += problem.rating;
                this.solvedCount++;
            }
        }

        if (attemptedProblems.has(pid)) continue;
        attemptedProblems.add(pid);

        for (const tag of problem.tags) {
            if (!this.tag_data[tag]) {
                this.tag_data[tag] = { attempts: 0, solved: 0, successRate: 0 };
            }

            this.tag_data[tag].attempts++;
            if (verdict === "OK") this.tag_data[tag].solved++;
        }
    }

    for (const tag in this.tag_data) {
        const t = this.tag_data[tag];
        t.successRate = t.solved / t.attempts;
    }

    this.avg_rating = this.solvedCount
        ? Math.round(solvedRatingsSum / this.solvedCount)
        : null;

    this.recent_activity = latestTime || [];
}

}
export {UserProfile} ; 