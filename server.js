const express = require("express");
const path = require("path");
require("dotenv").config();
const { getReply } = require("./src/chatbot");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const sessions = new Map();

app.post("/api/chat", async (req, res) => {
  const { message, sessionId = "default" } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({ error: "Message is required." });
  }

  const history = sessions.get(sessionId) || [];
  const reply = await getReply(message.trim(), history);

  history.push({ role: "user", content: message.trim() });
  history.push({ role: "assistant", content: reply });
  sessions.set(sessionId, history.slice(-10));

  res.json({ reply });
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`ChatBuddy is running at http://localhost:${PORT}`);
});
