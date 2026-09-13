# Punter Prediction - Architecture

## Overview
Professional full-stack sports prediction platform with equal first-class treatment for football and basketball. cPanel-compatible, no Docker/Redis/RabbitMQ required.

## Monorepo Structure
```
/frontend - Next.js 14 App Router, TypeScript, Tailwind
/backend  - Express + TypeScript + Prisma + PostgreSQL
/docs     - Documentation
/scripts  - Cron & maintenance scripts
```

## Frontend Architecture
- Next.js 14 App Router
- TypeScript strict
- Tailwind CSS with design system
- Mobile-first responsive
- PWA support (manifest, offline shell)
- Components: ui (button, card, badge, input), layout (header, footer, bottom-nav), sports, predictions, bet-builder
- State: Zustand + React Hook Form
- API: Axios with JWT interceptor
- SEO: metadata, OpenGraph, sitemap, robots

## Backend Architecture
- Node.js + Express + TypeScript
- REST API /api/v1
- Prisma ORM + PostgreSQL
- JWT authentication with refresh tokens
- Session & device management
- Rate limiting, Helmet, CORS, XSS protection
- Modules: auth, users, sports, predictions, odds, bet-builder, wallet, payments, subscriptions, referrals, notifications, whatsapp, ai, community, admin, analytics
- Providers abstraction: sports (api-sports), AI (openai/anthropic/groq with fallback), payments (paystack/flutterwave), notifications (email/sms/whatsapp)
- Jobs: sportsSync, oddsSync, cleanup - cPanel cron compatible (node dist/jobs/*.js)
- No Redis, no RabbitMQ, no Docker - uses PostgreSQL and file-based cron

## Database
- PostgreSQL required (documented, not silently replaced)
- Prisma migrations
- Normalized models: User, Sport, League, Team, Player, Fixture, Odds, Prediction, BetSlip, Wallet, Payment, Subscription, Referral, Notification, Community, etc.
- Indexes on frequently queried fields

## Security
- Password hashing bcrypt 12 rounds
- JWT secure, expiry, refresh
- OTP with expiry and attempt limits
- Rate limiting per route
- Webhook signature verification (Paystack HMAC SHA512, Flutterwave)
- Payment server-side verification only - never trust frontend
- Input sanitization, validation with Zod
- CORS configured, Helmet headers
- Audit logs

## cPanel Compatibility
- Uses process.env.PORT
- npm install, npm run build, npm start
- No Docker, no Redis, no RabbitMQ, no Supervisor, no systemd, no PM2-only
- Cron jobs via cPanel cron calling node dist/jobs/*.js
- Environment variables for secrets, never hard-coded

## Responsible Betting
- Never claim guaranteed wins
- Language: AI confidence, analytical estimate, statistical insight, not guaranteed
- 18+ messaging everywhere
- Responsible betting page

## Currency & Localization
- Default NGN / ₦
- Timezone Africa/Lagos
- Nigerian phone formatting +234 support
- Paystack & Flutterwave NGN
