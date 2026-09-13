# Environment Variables

## Frontend (.env.local)
```
NEXT_PUBLIC_APP_NAME=PUNTER PREDICTION
NEXT_PUBLIC_APP_URL=https://punterprediction.com
NEXT_PUBLIC_API_URL=https://api.punterprediction.com/api/v1
NEXT_PUBLIC_ENABLE_PWA=true
```

Only public values! Never secrets.

## Backend (.env)
```
PORT=5000
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db

JWT_SECRET=min-32-chars-secret
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=refresh-secret
JWT_REFRESH_EXPIRES_IN=30d
SESSION_SECRET=session-secret
BCRYPT_ROUNDS=12

SPORTS_API_KEY=
SPORTS_API_BASE_URL=https://v3.football.api-sports.io
SPORTS_API_PROVIDER=api-sports

AI_PRIMARY_PROVIDER=openai
AI_PRIMARY_API_KEY=
AI_SECONDARY_PROVIDER=anthropic
AI_SECONDARY_API_KEY=
AI_BACKUP_PROVIDER=groq
AI_BACKUP_API_KEY=

PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
PAYSTACK_WEBHOOK_SECRET=

FLUTTERWAVE_SECRET_KEY=
FLUTTERWAVE_PUBLIC_KEY=
FLUTTERWAVE_WEBHOOK_SECRET=
FLUTTERWAVE_ENCRYPTION_KEY=

WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_BUSINESS_ACCOUNT_ID=
WHATSAPP_VERIFY_TOKEN=
WHATSAPP_APP_SECRET=

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=noreply@punterprediction.com

SMS_PROVIDER=termii
SMS_API_KEY=
SMS_SENDER_ID=PunterPred

CORS_ORIGIN=https://punterprediction.com,http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

APP_URL=https://punterprediction.com
FRONTEND_URL=https://punterprediction.com

ADMIN_EMAIL=admin@punterprediction.com
ADMIN_PASSWORD=ChangeMe123!
```

## Required for Production
- DATABASE_URL (PostgreSQL)
- JWT_SECRET
- At least one sports API key OR handle gracefully with no fake data
- At least one AI key OR disable AI features gracefully
- Paystack OR Flutterwave for payments
- SMTP for email OTP
- WhatsApp tokens for WhatsApp features

## Optional but Recommended
- All payment providers
- All AI providers for fallback
- WhatsApp
- SMS provider

## Security
- Never commit .env
- Use cPanel env UI or Render env vars
- No secrets in frontend
- Rotate secrets regularly
