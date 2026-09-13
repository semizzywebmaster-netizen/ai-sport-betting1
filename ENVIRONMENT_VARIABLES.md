# Environment Variables - Complete List

## Frontend (NEXT_PUBLIC_ only)
```
NEXT_PUBLIC_APP_NAME=PUNTER PREDICTION
NEXT_PUBLIC_APP_URL=https://punterprediction.com
NEXT_PUBLIC_API_URL=https://api.punterprediction.com/api/v1
NEXT_PUBLIC_ENABLE_PWA=true
```

## Backend - Required
```
PORT=5000
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=32+ chars random
JWT_REFRESH_SECRET=32+ chars random
SESSION_SECRET=random
BCRYPT_ROUNDS=12
CORS_ORIGIN=https://punterprediction.com,http://localhost:3000
```

## Backend - Sports (at least one for live data, graceful fallback if missing)
```
SPORTS_API_KEY=
SPORTS_API_BASE_URL=https://v3.football.api-sports.io
SPORTS_API_PROVIDER=api-sports
FOOTBALL_API_KEY=
BASKETBALL_API_KEY=
ODDS_API_KEY=
```

## Backend - AI (at least one, fallback chain)
```
AI_PRIMARY_PROVIDER=openai
AI_PRIMARY_API_KEY=sk-...
AI_SECONDARY_PROVIDER=anthropic
AI_SECONDARY_API_KEY=
AI_BACKUP_PROVIDER=groq
AI_BACKUP_API_KEY=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GROQ_API_KEY=
```

## Backend - Payments (at least one)
```
PAYSTACK_SECRET_KEY=sk_live_...
PAYSTACK_PUBLIC_KEY=pk_live_...
PAYSTACK_WEBHOOK_SECRET=
FLUTTERWAVE_SECRET_KEY=FLWSECK_...
FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_...
FLUTTERWAVE_WEBHOOK_SECRET=
FLUTTERWAVE_ENCRYPTION_KEY=
```

## Backend - WhatsApp
```
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_BUSINESS_ACCOUNT_ID=
WHATSAPP_VERIFY_TOKEN=punter_verify_token
WHATSAPP_APP_SECRET=
```

## Backend - Email/SMS
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=noreply@punterprediction.com
SMS_PROVIDER=termii
SMS_API_KEY=
SMS_SENDER_ID=PunterPred
```

## Backend - Admin
```
ADMIN_EMAIL=admin@punterprediction.com
ADMIN_PASSWORD=ChangeMe123!
```

## Backend - Features
```
ENABLE_FOOTBALL=true
ENABLE_BASKETBALL=true
ENABLE_AI_PREDICTIONS=true
ENABLE_BET_BUILDER=true
ENABLE_SUBSCRIPTIONS=true
ENABLE_REFERRALS=true
ENABLE_WHATSAPP=true
ENABLE_COMMUNITY=true
ENABLE_ADS=true
```

## Security Notes
- Never commit .env
- Never expose backend secrets via NEXT_PUBLIC_
- Use cPanel env UI
- Rotate regularly
- All secrets validated at startup with warnings if missing
