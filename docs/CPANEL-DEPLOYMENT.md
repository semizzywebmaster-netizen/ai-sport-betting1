# cPanel Deployment Guide - Punter Prediction

## Requirements
- cPanel with Node.js support (Node >=18)
- PostgreSQL database (required - do not silently replace with MySQL)
- Domain/subdomain for API and frontend

## Backend Deployment (cPanel Node.js)

1. Create Node.js Application in cPanel:
   - Node version: 18+
   - Application mode: Production
   - Application root: backend or punter-backend
   - Application URL: api.punterprediction.com
   - Startup file: dist/index.js

2. Environment Variables (in cPanel UI):
```
PORT=5000 (cPanel will override - use process.env.PORT)
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=your-32-char-secret
JWT_REFRESH_SECRET=your-refresh-secret
PAYSTACK_SECRET_KEY=sk_live_...
FLUTTERWAVE_SECRET_KEY=FLWSECK_...
SPORTS_API_KEY=your_key
OPENAI_API_KEY=sk-...
WHATSAPP_ACCESS_TOKEN=...
WHATSAPP_VERIFY_TOKEN=...
etc - see .env.example
```

3. Deployment Steps:
```bash
# Upload backend folder via File Manager or Git
cd ~/backend
npm install
npx prisma generate
npx prisma migrate deploy
npm run build
# Then restart app in cPanel Node.js UI
```

4. Cron Jobs (cPanel -> Cron Jobs):
```bash
# Sports sync every 30 mins
*/30 * * * * /usr/local/bin/node /home/username/backend/dist/jobs/sportsSync.js >> /home/username/logs/sports.log 2>&1

# Odds sync every 15 mins
*/15 * * * * /usr/local/bin/node /home/username/backend/dist/jobs/oddsSync.js >> /home/username/logs/odds.log 2>&1

# Cleanup daily
0 2 * * * /usr/local/bin/node /home/username/backend/dist/jobs/cleanup.js >> /home/username/logs/cleanup.log 2>&1
```

5. SSL: Enable Let's Encrypt in cPanel

## Frontend Deployment

Option A: Vercel/Netlify (Recommended)
- Connect GitHub repo
- Root directory: frontend
- Build: npm run build
- Env: NEXT_PUBLIC_API_URL=https://api.punterprediction.com/api/v1

Option B: cPanel Static
- Build locally: cd frontend && npm run build
- Upload out/ or .next/static to public_html
- Or use Node.js app for frontend too

Option C: Cloudflare Pages
- Similar to Vercel

## Database
- Create PostgreSQL in cPanel -> PostgreSQL Databases
- Note connection string
- If host doesn't support PostgreSQL, document requirement and use external (Supabase, Neon, Render Postgres)

## Security Checklist
- No secrets in frontend NEXT_PUBLIC_ except public URL
- JWT secrets min 32 chars
- Paystack/Flutterwave webhook secrets set
- CORS_ORIGIN set to frontend URL
- Rate limiting enabled
- Helmet headers

## Build Commands
Backend:
```
npm install
npm run build
npm start
```

Frontend:
```
npm install
npm run build
npm start (or static export)
```

## No Dependencies On:
- Docker
- Redis
- RabbitMQ
- Supervisor
- systemd
- root privileges
- PM2-only (use cPanel's process manager)

## Logs
- Check cPanel Node.js logs
- Application logs via winston console
- Cron logs in ~/logs/

## Troubleshooting
See TROUBLESHOOTING.md
