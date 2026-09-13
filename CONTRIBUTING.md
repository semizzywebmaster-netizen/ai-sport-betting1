# Contributing to Punter Prediction

## Responsible Betting
- Never claim guaranteed wins, 100% sure, risk-free profit
- Use: AI confidence, analytical estimate, statistical insight, not guaranteed
- 18+ messaging required

## No Fake Data
- Never invent odds - only provider data
- Never hide losing predictions
- Clearly separate real provider data, calculated analytics, AI-generated analysis, unavailable data

## cPanel Compatibility
- No Docker, Redis, RabbitMQ, Supervisor, systemd, root, PM2-only
- Use process.env.PORT
- Cron via cPanel cron calling node dist/jobs/*.js
- env vars for secrets

## Football & Basketball Equal
- Both sports first-class treatment, not afterthought
- Equal data depth, markets, AI, bet builder

## Security
- Server-side payment verification only
- Webhook signature verification
- No secrets in frontend (only NEXT_PUBLIC_API_URL)
- Bcrypt 12 rounds, JWT secure, rate limiting

## Builds Must Pass
- npm run build (frontend + backend)
- npm run typecheck
- No any, no @ts-ignore unless documented
