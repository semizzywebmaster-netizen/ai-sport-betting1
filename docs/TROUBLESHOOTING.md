# Troubleshooting

## Backend won't start
- Check DATABASE_URL correct
- Check PORT env (cPanel overrides)
- Check node version >=18
- Run npx prisma generate
- Check logs in cPanel Node.js app

## Frontend build fails
- Check NEXT_PUBLIC_API_URL
- Ensure Node 18+
- Clear .next: rm -rf .next && npm run build

## Database connection failed
- PostgreSQL required - check cPanel supports it
- If not, use Supabase/Neon external
- Check DATABASE_URL format: postgresql://user:pass@host:5432/db?schema=public
- Run migrations: npx prisma migrate deploy

## Payments not working
- Check Paystack/Flutterwave secret keys
- Webhook signature verification: ensure webhook secret set
- Always verify server-side, never trust frontend
- Check idempotency handling

## AI not working
- Check AI API keys configured
- Check provider abstraction - fallback will try secondary/backup
- Credits check: user needs credits
- Logs: AIUsage table

## WhatsApp not working
- Check WHATSAPP_ACCESS_TOKEN, PHONE_NUMBER_ID, VERIFY_TOKEN
- Webhook URL must be https and verified in Meta dashboard
- OTP expiry 10 mins

## OTP not received
- Check SMTP for email
- Check SMS provider for phone
- Check logs for OTP code in dev

## CORS errors
- Set CORS_ORIGIN to frontend URL
- Include http://localhost:3000 for dev

## Build passes but runtime errors
- Check env vars in cPanel UI
- Check dist/ exists after build
- Restart Node.js app in cPanel after env change
