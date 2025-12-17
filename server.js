import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";

dotenv.config();

const app = express();

// Allow frontend to connect
app.use(cors({ origin: "*" }));
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_KEY) {
  console.error("Missing OPENAI_API_KEY in environment");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: OPENAI_KEY
});

const SYSTEM_PROMPT = `
You are FRAM assistant. Answer questions concisely and safely.
Avoid medical, financial, or legal advice. Be polite, helpful, and neutral.
`;

async function getChatReply(message) {
  try {
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: message
        }
      ],
      max_output_tokens: 500
    });

    return response.output_text.trim();
  } catch (err) {
    console.error("OpenAI API error:", err);
    return "Sorry, I'm having trouble connecting to the AI right now. Please try again.";
  }
}

// API endpoint
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const reply = await getChatReply(message);
    res.json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
