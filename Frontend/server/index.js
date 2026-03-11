import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ⚠️ Put your OpenAI key here (for demo only)
apiKey: process.env.OPENAI_API_KEY

const knowledgeBase = `
You are an AI assistant for Pratik Pokhrel's portfolio.

Profile:
- Java Full Stack Developer
- B.Tech CSE at KIIT Deemed University
- CGPA: 7.44

Projects:
1. SUIS - Smart University Intelligent System
2. Kavout - AI-powered NSE stock forecasting platform
3. AI Smart City Issue Solver (MLH Hackathon at KIIT)

Respond professionally and clearly.
`;

app.post("/ask", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // fast + affordable
          messages: [
            {
              role: "system",
              content: knowledgeBase,
            },
            {
              role: "user",
              content: message,
            },
          ],
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    if (data.choices) {
      const reply = data.choices[0].message.content;
      res.json({ reply });
    } else {
      console.log("OpenAI Raw Error:", data);
      res.json({ reply: "No response from OpenAI." });
    }

  } catch (err) {
    console.error("OpenAI Error:", err);
    res.json({ reply: "AI Error." });
  }
});

app.listen(5000, () => {
  console.log("OpenAI server running on http://localhost:5000");
});