# WebSocket Chat — Frontend

React + Tailwind + Vite client for [the WebSocket chat backend](https://chatapp-backend-nn1x.onrender.com).

**Live demo:** [https://chatapp-frontend-9heg.onrender.com](your-frontend-url)

## Running locally
```bash
npm install
npm run dev
```
Requires the backend running locally too — see `.env.development` for the WS URL it expects (defaults to `ws://localhost:3006`).

## Environment variables
| Variable | Purpose | Local default |
|---|---|---|
| `VITE_WS_URL` | WebSocket URL of the backend to connect to | `ws://localhost:3006` |

## Features
- Real-time multi-client chat with a live online-users list
- Typing indicator
- Auto-reconnect with exponential backoff on dropped connections
- Connection status indicator

## Tech stack
React, Tailwind CSS, Vite

## What I'd improve next
- Persisted message history across reconnects
- Toast-style error display instead of `alert()`