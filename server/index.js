import express from "express";
import cors from "cors";
import Groq from "groq-sdk";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }));
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
  }
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are ARIA, a helpful and friendly AI assistant. Answer clearly and use markdown when helpful." },
        ...messages.slice(-20),
      ],
      max_tokens: 1024,
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error("Groq error:", err.message);
    res.status(500).json({ error: "Failed to get response. Please try again." });
  }
});

app.get("/api/health", (_, res) => res.json({ status: "ok" }));
app.listen(PORT, () => console.log(`✦ ARIA backend running at http://localhost:${PORT}`));