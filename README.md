# ARIA Chat App — Setup Guide

A professional AI chat frontend built with React, connected to a Node/Express backend that calls GPT-4.

---

## Project Structure

```
chat-app/
├── src/                    ← React frontend
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── TypingIndicator.jsx
│   │   ├── ChatInput.jsx
│   │   └── EmptyState.jsx
│   ├── utils/
│   │   └── api.js          ← API calls to backend
│   ├── App.jsx             ← Root component + state
│   ├── main.jsx            ← React entry point
│   └── index.css           ← All styles
├── server/
│   ├── index.js            ← Express + OpenAI backend
│   └── package.json
├── index.html
├── vite.config.js
└── package.json
```

---

## Step 1 — Get your OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Click **Create new secret key**
3. Copy it — you'll need it in Step 3

---

## Step 2 — Install frontend dependencies

```bash
cd chat-app
npm install
```

---

## Step 3 — Set up the backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```
OPENAI_API_KEY=sk-your-actual-key-here
PORT=3001
```

---

## Step 4 — Run both servers

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
# ✦ ARIA backend running at http://localhost:3001
```

**Terminal 2 — Frontend:**
```bash
cd chat-app      # back to root
npm run dev
# ➜  Local:   http://localhost:5173
```

Open http://localhost:5173 in your browser. Done!

---

## Step 5 — Test it works

1. Type a message in the chat
2. You should see the typing indicator (3 dots)
3. GPT-4 replies appear in the chat
4. Conversation history is maintained automatically

---

## Development Tips

### Quick test without a backend (mock mode)

In `src/App.jsx`, swap the import:
```js
// Change this:
import { sendMessage } from "./utils/api";

// To this (uses mock responses, no API key needed):
import { sendMessageMock as sendMessage } from "./utils/api";
```

### Customize the AI persona

Edit `SYSTEM_PROMPT` in `server/index.js` to change how ARIA behaves.

### Switch to a different model

In `server/index.js`, change:
```js
model: "gpt-4o",         // best quality
model: "gpt-4o-mini",    // faster & cheaper
model: "gpt-3.5-turbo",  // most affordable
```

---

## Deploy to Production

### Frontend (Vercel — free)
```bash
npm run build
# Upload /dist folder to Vercel, or connect your GitHub repo
```
Set environment variable on Vercel:
```
VITE_API_URL=https://your-backend.railway.app
```

### Backend (Railway — free tier)
1. Push `server/` to a GitHub repo
2. Connect to Railway.app
3. Add `OPENAI_API_KEY` as an environment variable
4. Deploy — Railway auto-detects Node.js

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Failed to get response" | Check backend is running on port 3001 |
| "Invalid API key" | Check `.env` file exists in `server/` folder |
| "Rate limit reached" | Wait 1 min — you've hit OpenAI's rate limit |
| CORS error in browser | Make sure backend is running, check CORS origins in server |
| Blank screen | Run `npm install` in root folder first |
