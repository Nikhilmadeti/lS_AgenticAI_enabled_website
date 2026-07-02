import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("."));

const ai = new GoogleGenAI({
    apiKey: process.env.API_KEY
});

app.post("/generate", async (req, res) => {

    try {

        const goal = req.body.goal;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
Create a step-by-step plan for the following goal:

"${goal}"

Return ONLY valid JSON in this format:

{
  "tasks": [
    {
      "task_name": "",
      "priority": "High | Medium | Low",
      "estimated_time": ""
    }
  ]
}

Generate between 5 and 8 tasks.
`,
            config: {
                responseMimeType: "application/json"
            }
        });

        res.json(JSON.parse(response.text));

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: "Failed to generate task plan."
        });

    }

});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});