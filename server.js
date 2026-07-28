const express = require("express");
const path = require("path");
require("dotenv").config();
const { getReply } = require("./src/chatbot");

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const sessions = new Map();

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`ChatBuddy is running at http://localhost:${port}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`Port ${port} is busy. Trying ${port + 1}...`);
      startServer(port + 1);
      return;
    }

    throw err;
  });
}

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

startServer(PORT);
