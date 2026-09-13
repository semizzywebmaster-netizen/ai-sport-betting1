# PUNTER PREDICTION - AI Sports Intelligence

Professional full-stack sports prediction platform with equal first-class treatment for Football and Basketball. Built for Nigerian punters, cPanel-compatible.

## Features
- ⚽ Football: Premier League, La Liga, Serie A, Bundesliga, Ligue 1, Champions League + 30 leagues
- 🏀 Basketball: NBA, EuroLeague, WNBA, NCAA + 10 leagues - equal depth, not afterthought
- 🤖 AI Predictions: Multi-provider (OpenAI, Anthropic, Groq) with fallback, confidence %, risk levels
- 🧩 Bet Builder: Conservative/Balanced/Aggressive, target odds 2-100, merge/convert/optimize, secure bet codes
- 💰 Wallet: Separate cash (NGN) & credits, immutable ledger, Paystack & Flutterwave
- 💬 WhatsApp: Business Cloud API bot, account linking OTP, commands, payment links
- 👥 Community: Posts, likes, comments, follows, analyst profiles, leaderboards, verified badges
- 🎮 Gamification: XP, levels, badges, streaks, challenges
- 📊 Admin: Users, sports, AI, finance, feature flags, audit logs
- 🔒 Security: JWT, bcrypt, rate limiting, Helmet, webhook signature verification, no fake data

## Tech Stack
- Frontend: Next.js 14 App Router, TypeScript, Tailwind, PWA, mobile-first
- Backend: Node.js Express TypeScript, Prisma, PostgreSQL, JWT
- No Docker/Redis/RabbitMQ required - cPanel compatible

## Project Structure
```
/frontend - Next.js frontend
/backend  - Express API
/docs     - Documentation
/scripts  - Cron scripts
```

## Quick Start

Backend:
```bash
cd backend
npm install
cp .env.example .env
# Set DATABASE_URL etc
npx prisma generate
npx prisma migrate dev
npm run build
npm start
```

Frontend:
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## Deployment
See docs/CPANEL-DEPLOYMENT.md

## Responsible Betting
- 18+ only
- Predictions are analytical estimates, not guarantees
- Never "guaranteed win" or "100% sure"
- Language: AI confidence, statistical insight, not guaranteed

## Currency
- NGN / ₦ default
- Timezone Africa/Lagos
- Nigerian phone +234 support

## Documentation
- ARCHITECTURE.md
- API.md
- DATABASE.md (Prisma schema)
- CPANEL-DEPLOYMENT.md
- PAYMENTS.md
- WHATSAPP.md
- CRON-JOBS.md
- SECURITY.md
- ENVIRONMENT.md
