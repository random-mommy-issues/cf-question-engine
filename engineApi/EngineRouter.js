import { EngineController } from "./EngineControllerClass.js";
import express from "express";
const router = express.Router();

router.get("/recommend", async (req, res) => {
    const userData = req.body;
    const engineController = new EngineController(userData);
    try {
        const recommendedQuestions = await engineController.EngineControllerMethod();
        res.status(200).json({ questions: recommendedQuestions });
    } catch (error) {
        console.error("Error in recommendation:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
export default router;