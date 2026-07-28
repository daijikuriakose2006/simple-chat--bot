const { matchRule } = require("./rules");

const SYSTEM_PROMPT =
  "You are ChatBuddy, a friendly assistant. Keep every reply short — 1-2 sentences max.";

async function getReply(userMessage, history = []) {
  const local = matchRule(userMessage);
  if (local) return local;

  const apiKey = process.env.OPENAI_API_KEY || process.env.API_KEY;
  const baseURL =
    process.env.OPENAI_BASE_URL || process.env.AI_BASE_URL || "https://api.openai.com/v1";
  const endpoint = `${baseURL.replace(/\/$/, "")}/chat/completions`;

  if (!apiKey || apiKey === "your_key_here") {
    return "Hmm, I'm not sure. Try 'help' or ask something else!";
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...history,
          { role: "user", content: userMessage },
        ],
        max_tokens: 80,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("OpenAI API error:", err);
      return "Sorry, try again in a moment.";
    }

    const data = await res.json();
    return (
      data.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I couldn't reply. Try again?"
    );
  } catch (err) {
    console.error("Chat API request failed:", err.message);
    return "Something went wrong. Try again?";
  }
}

module.exports = { getReply };
