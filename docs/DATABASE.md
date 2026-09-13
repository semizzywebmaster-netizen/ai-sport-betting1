# Database - Prisma + PostgreSQL

## Requirement
PostgreSQL required. Documented clearly, not silently replaced. If cPanel doesn't support PostgreSQL, use external: Supabase, Neon, Render Postgres.

## Schema Overview
- User, UserProfile, Session, Device, OTP, PasswordReset
- Sport, League, Team, TeamLeague, Player, Fixture, Standing
- Odds, OddsMovement
- AIProvider, Prediction, PredictionFactor, PredictionResult, AIUsage
- BetSlip, BetSelection, BetCode, SavedItem
- Wallet, CreditBalance, WalletTransaction
- Payment, PaymentWebhook
- SubscriptionPlan, Subscription
- Referral, ReferralReward
- Notification, WhatsAppAccount
- CommunityPost, Comment, Like, Follow, AnalystProfile, Report
- XPTransaction, Badge, UserBadge, Challenge, UserChallenge
- Advertisement, RewardedAdView
- AdminSettings, FeatureFlag, AuditLog, SystemAnalytics

## Key Features
- Normalized, indexes on search fields
- Immutable ledger for wallet
- Separate cash and credits
- No fake data in production

## Migrations
```bash
npx prisma migrate dev
npx prisma migrate deploy # production
npx prisma generate
```

## Seed
```bash
npx prisma db seed # or npm run prisma:seed
```
Seeds sports, leagues, plans, AI providers, feature flags, badges, admin user.

## cPanel
- Create PostgreSQL DB in cPanel
- Use DATABASE_URL env var
- No MySQL fallback silently
