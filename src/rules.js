const rules = [
  {
    pattern: /\b(hi|hello|hey|howdy|greetings|hai)\b/i,
    response: "Hey! 👋 How can I help?",
  },
  {
    pattern: /\b(bye|goodbye|see you|later|farewell)\b/i,
    response: "Bye! Talk soon.",
  },
  {
    pattern: /\b(how are you|how('s| is) it going|what('s| is) up)\b/i,
    response: "I'm good! You?",
  },
  {
    pattern: /\b(help|what can you do|what do you do)\b/i,
    response: "I chat and answer questions. Just ask!",
  },
  {
    pattern: /\b(thank you|thanks|thx|appreciate it)\b/i,
    response: "You're welcome! 😊",
  },
  {
    pattern: /\b(your name|who are you|what('s| is) your name)\b/i,
    response: "I'm ChatBuddy. Nice to meet you!",
  },
  {
    pattern: /\b(joke|funny|make me laugh)\b/i,
    response: "Why do programmers prefer dark mode? Light attracts bugs! 🐛",
  },
  {
    pattern: /\b(time|what time)\b/i,
    response: () => `It's ${new Date().toLocaleTimeString()}.`,
  },
  {
    pattern: /\b(date|today('s| is)? date|what day)\b/i,
    response: () =>
      `Today is ${new Date().toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      })}.`,
  },
];

function matchRule(message) {
  for (const rule of rules) {
    if (rule.pattern.test(message)) {
      return typeof rule.response === "function"
        ? rule.response()
        : rule.response;
    }
  }
  return null;
}

module.exports = { matchRule };
