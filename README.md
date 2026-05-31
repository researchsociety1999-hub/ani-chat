# ChatWithIt 💬

A sleek, single-file AI chat platform powered by [OpenRouter](https://openrouter.ai). Built for developers.

## Features

- 🔑 **Auth & key verification** against OpenRouter `/auth/key`
- 🤖 **Auto-discovers all free models** (zero prompt + completion cost)
- 💬 **Full chat history** with typing indicators and timestamped bubbles
- ✨ **Markdown rendering** for AI responses (bold, code, tables, lists)
- 📎 **File attachment** support (PDF, DOCX, TXT)
- 📚 **Prompt library** with one-click developer prompts
- 📊 **Token & usage monitor** in the sidebar
- 📥 **Export to Markdown** with one click
- 🌙 **Dark / Light theme** toggle
- ⌨️ **Keyboard shortcuts**: `Enter` to send, `Ctrl+L` clear, `Ctrl+S` export
- 📱 **Responsive** layout

## Usage

1. Open `index.html` in a browser (or deploy to Vercel/Netlify)
2. Paste your [OpenRouter API key](https://openrouter.ai/keys)
3. Click **Authenticate**
4. Pick a free model and start chatting

## Stack

- Pure HTML / CSS / Vanilla JS — zero dependencies, zero build step
- [marked.js](https://marked.js.org/) for Markdown rendering (CDN)
