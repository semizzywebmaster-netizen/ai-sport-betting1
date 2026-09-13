# API Documentation - Punter Prediction

Base URL: /api/v1

## Response Format
```json
{
  "success": true,
  "data": {},
  "message": "Success",
  "meta": { "page": 1, "limit": 20, "total": 100 }
}
```

## Auth
- POST /auth/register
- POST /auth/login
- POST /auth/verify-otp
- POST /auth/forgot-password
- POST /auth/reset-password
- POST /auth/logout (auth)
- GET /auth/me (auth)
- GET /auth/sessions (auth)

## Sports
- GET /sports - list sports
- GET /sports/leagues? sport=football&featured=true
- GET /sports/teams?leagueId=&search=
- GET /sports/fixtures?sport=football&date=&status=
- GET /sports/fixtures/:id

## Predictions
- GET /predictions?sport=&leagueId=&status=&page=
- GET /predictions/:id
- GET /predictions/accuracy?sport=&days=
- POST /predictions (auth) - create

## Odds
- GET /odds/fixture/:fixtureId
- GET /odds/movement/:oddsId

## Bet Builder
- GET /bet-builder/lookup/:code (public)
- POST /bet-builder (auth) - create slip
- GET /bet-builder (auth) - user slips
- POST /bet-builder/:id/code (auth) - generate code
- POST /bet-builder/optimize (auth)
- POST /bet-builder/merge (auth)

## Wallet
- GET /wallet (auth) - wallet + credits
- GET /wallet/transactions (auth)
- GET /wallet/credits (auth)

## Payments
- POST /payments/initialize (auth)
- GET /payments/verify/:reference (auth)
- POST /payments/webhook/paystack (public, signature verified)
- POST /payments/webhook/flutterwave (public)

## Subscriptions
- GET /subscriptions/plans
- GET /subscriptions/plans/:slug
- GET /subscriptions (auth)
- GET /subscriptions/active (auth)
- POST /subscriptions/subscribe (auth)

## Referrals
- GET /referrals/stats (auth)
- GET /referrals (auth)

## Notifications
- GET /notifications (auth)
- PATCH /notifications/:id/read (auth)
- PATCH /notifications/read-all (auth)

## WhatsApp
- GET /whatsapp/webhook (verification)
- POST /whatsapp/webhook (incoming)
- POST /whatsapp/link (auth)
- POST /whatsapp/verify (auth)
- DELETE /whatsapp/unlink (auth)
- GET /whatsapp/account (auth)

## AI
- POST /ai/assistant (auth) - credits required
- POST /ai/team-analysis (auth)
- POST /ai/bet-builder-assist (auth)
- GET /ai/providers (auth)

## Community
- GET /community/feed
- GET /community/posts/:id
- POST /community/posts (auth)
- POST /community/posts/:id/like (auth)
- POST /community/posts/:id/comments (auth)
- POST /community/follow/:userId (auth)
- GET /community/analysts
- GET /community/analysts/leaderboard

## Admin (ADMIN role)
- GET /admin/overview
- GET /admin/users?search=
- PATCH /admin/users/:id/suspend
- PATCH /admin/users/:id/restore
- GET /admin/sports/leagues
- PATCH /admin/sports/leagues/:id
- GET /admin/ai/providers
- PATCH /admin/ai/providers/:id
- GET /admin/finance/transactions
- GET /admin/feature-flags
- PATCH /admin/feature-flags/:key
- GET /admin/audit-logs

## Analytics
- GET /analytics/public
- GET /analytics (admin)

## Health
- GET /health
- GET /api/v1/health
