# 💬 ChatWithIt

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/researchsociety1999-hub/Chat-With-It)

A **dual-provider AI chat playground** powered by [OpenRouter](https://openrouter.ai) and [Hugging Face](https://huggingface.co). No backend. No build step. Pure HTML + JS.

## ✨ Features

- 🔷 **OpenRouter** — access 100+ models (GPT-4o, Claude 3.5, Gemini, Llama, Mistral, and more)
- 🤗 **Hugging Face** — connect via HF Inference API token
- ⚖️ **Model Compare Mode** — side-by-side A/B testing of any two models
- 🎭 **6 AI Personas** — Default, Engineer, Writer, Teacher, Debate, JSON
- 🎨 **6 Themes** — Midnight, Nordic, Emerald, Crimson, Paper, Light
- 📊 **Session Stats** — token usage, context ring, per-turn breakdown
- 📚 **Prompt Library** — 10 developer-focused prompt templates
- 💾 **Save & Export** — save chats locally, export as MD / JSON / TXT
- 🔍 **Message Search** — Ctrl+F to search across all messages
- 🎤 **Voice Input** — browser-native speech recognition
- 📎 **File Attachments** — attach .txt, .md, .json, .csv, .py, .js, .html files
- ⌨️ **Keyboard Shortcuts** — full keyboard navigation
- 📱 **Mobile Responsive** — works on phones and tablets

## 🚀 Quick Start

### Option 1: Use the live deployment
Just open the Vercel URL — no install needed.

### Option 2: Run locally
```bash
git clone https://github.com/researchsociety1999-hub/Chat-With-It.git
cd Chat-With-It
npx serve .   # or: python -m http.server 3000
# open http://localhost:3000
```

## 🔑 Getting API Keys

| Provider | Where to get it | Free tier |
|----------|----------------|----------|
| OpenRouter | [openrouter.ai/keys](https://openrouter.ai/keys) | $1 free credit + many free models |
| Hugging Face | [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) | Free tier available |

## 🗂 Project Structure

```
Chat-With-It/
├── index.html       # Main UI (HTML + CSS)
├── js/
│   ├── app.js       # Core logic & event handling
│   ├── api.js       # OpenRouter + HF API calls
│   ├── ui.js        # DOM rendering & chat bubbles
│   ├── state.js     # App state management
│   └── utils.js     # Helper functions
├── vercel.json      # Vercel deployment config + security headers
└── package.json
```

## 🛡️ Security

- API keys stored in `localStorage` — **never sent to any server except the respective provider**
- Full CSP headers enforced via `vercel.json`
- No analytics, no tracking, no cookies

## 📄 License

MIT — built by [Rishi](https://github.com/researchsociety1999-hub)
