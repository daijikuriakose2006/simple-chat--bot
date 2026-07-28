# ChatBuddy – Simple Conversational Chatbot

ChatBuddy is a friendly web chatbot built with **Node.js**, **Express**, and vanilla JavaScript. It uses a **hybrid approach**: instant rule-based replies for common phrases, with an optional **OpenAI API** fallback for open-ended conversation.

## Demo

Run locally and open [http://localhost:3000](http://localhost:3000), or record a short screen capture of a sample conversation for your assignment submission.

**Sample conversation:**

```
You: Hi!
ChatBuddy: Hey! I'm ChatBuddy 👋 How can I help you today?

You: What can you do?
ChatBuddy: I'm ChatBuddy! I can have friendly conversations, answer simple questions...

You: Tell me a joke
ChatBuddy: Why do programmers prefer dark mode? Because light attracts bugs! 🐛

You: Thanks, bye!
ChatBuddy: Goodbye! It was nice chatting with you. Come back anytime!
```

## What makes ChatBuddy unique

- **Hybrid intelligence** — greetings, jokes, time/date, and help work instantly without an API key
- **Session memory** — remembers the last 10 messages per session for coherent AI replies
- **Graceful fallback** — works fully offline with rules; add an API key when you want smarter answers
- **Clean chat UI** — modern dark-themed interface with typing indicator and status badge

## Approach

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Rule engine | Regex pattern matching | Fast, free replies for common inputs |
| AI fallback | OpenAI GPT-4o-mini | Open-ended conversation when rules don't match |
| Web server | Express.js | Serves UI and `/api/chat` endpoint |
| Frontend | HTML, CSS, vanilla JS | Chat interface with message bubbles |

## Setup & run locally

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/chat-bot.git
   cd chat-bot
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment (optional)**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your OpenAI API key:

   ```
   OPENAI_API_KEY=sk-your-key-here
   PORT=3000
   ```

   > Without an API key, ChatBuddy still works using rule-based replies only.

4. **Start the server**

   ```bash
   npm start
   ```

5. **Open the chatbot**

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Development mode (auto-restart on changes)

```bash
npm run dev
```

## Project structure

```
chat-bot/
├── server.js           # Express server & API routes
├── src/
│   ├── rules.js        # Rule-based response patterns
│   └── chatbot.js      # Chat orchestration (rules → API)
├── public/
│   ├── index.html      # Chat UI
│   ├── style.css       # Styling
│   └── app.js          # Frontend logic
├── .env.example        # Environment variable template
├── package.json
└── README.md
```

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/chat` | Send a message, receive a reply |
| `GET` | `/api/health` | Check server status and AI availability |

**Example request:**

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!", "sessionId": "demo"}'
```

## Challenges & how I solved them

| Challenge | Solution |
|-----------|----------|
| API costs and dependency on external services | Built a rule layer so the bot works without any API key |
| Losing conversation context | Store per-session message history server-side (last 10 turns) |
| Frontend/backend communication | Serve static files and API from the same Express app — no CORS issues |
| Unknown user inputs without API | Friendly fallback message guiding users toward supported phrases |
| API failures | Try/catch with user-friendly error messages instead of crashing |

## Deployment (optional)

Deploy to [Render](https://render.com), [Railway](https://railway.app), or similar:

1. Push code to a public GitHub repository
2. Connect the repo to your hosting platform
3. Set `OPENAI_API_KEY` and `PORT` as environment variables
4. Add the deployed URL to this README as your demo link

## License

MIT
