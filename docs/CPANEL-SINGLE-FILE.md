# cPanel Single File Deployment - Punter Prediction

## Overview
Single Node.js application serves both Frontend (static) and Backend (API) - perfect for cPanel.

No need for separate Vercel/Netlify frontend hosting. One cPanel Node.js app handles everything.

## Architecture
```
Single cPanel Node.js App (Port from process.env.PORT)
├── /api/v1/* -> Backend API (Express)
├── /health -> Health check
└── /* -> Frontend static (Next.js exported)
```

## Why Single File?
- cPanel only allows limited Node.js apps
- No need for separate frontend hosting
- Single deployment, single domain
- Works on ordinary cPanel with Node.js support
- No Docker, Redis, RabbitMQ, etc.

## Deployment Steps - Single File

### 1. Prepare Locally
```bash
# Install all
npm run install:all
# Or
cd backend && npm install
cd ../frontend && npm install

# Build frontend as static export
cd frontend
CPANEL_EXPORT=true npm run build
# Generates frontend/out/

# Build backend
cd ../backend
npm run build
# Generates backend/dist/

# Copy frontend to backend
cd ..
node scripts/copy-frontend.js
# Copies frontend/out -> backend/public and public/
```

### 2. Upload to cPanel
Upload entire project to cPanel File Manager:
- `backend/` (including `dist/` and `public/` with frontend)
- `frontend/` (optional, for future builds, but not required at runtime)
- `public/` (frontend static, alternative)
- `package.json` (root)
- `scripts/`

Or upload only:
- `backend/` with `dist/` and `public/`
- `package.json` (root or backend)

### 3. cPanel Node.js App Setup
- cPanel -> Setup Node.js App
- Node version: 18+
- Application mode: Production
- Application root: `backend` or root where package.json is
- Application URL: `punterprediction.com` (your domain)
- Application startup file:
  - If root is `backend`: `dist/index.js`
  - If root is project root: `backend/dist/index.js`
- Or if using root package.json: `backend/dist/index.js`

### 4. Environment Variables in cPanel UI
```
PORT= (cPanel auto sets, use process.env.PORT)
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=32+ chars random
JWT_REFRESH_SECRET=32+ chars random
SESSION_SECRET=random
CORS_ORIGIN=https://punterprediction.com
PAYSTACK_SECRET_KEY=sk_live_...
FLUTTERWAVE_SECRET_KEY=FLWSECK_...
SPORTS_API_KEY=...
OPENAI_API_KEY=...
WHATSAPP_ACCESS_TOKEN=...
SMTP_USER=...
SMTP_PASS=...
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=...
```

### 5. Install & Build in cPanel
Via cPanel Terminal or SSH:
```bash
cd ~/backend
npm install
npx prisma generate
npx prisma migrate deploy
npx prisma db seed
npm run build

# If frontend not pre-built, build it:
cd ../frontend
npm install
CPANEL_EXPORT=true npm run build
cd ..
node scripts/copy-frontend.js

# Restart app in cPanel UI
```

### 6. Cron Jobs (cPanel -> Cron Jobs)
```
*/30 * * * * /usr/local/bin/node /home/username/backend/dist/jobs/sportsSync.js >> ~/logs/sports.log 2>&1
*/15 * * * * /usr/local/bin/node /home/username/backend/dist/jobs/oddsSync.js >> ~/logs/odds.log 2>&1
0 2 * * * /usr/local/bin/node /home/username/backend/dist/jobs/cleanup.js >> ~/logs/cleanup.log 2>&1
```

### 7. SSL & Domain
- Enable Let's Encrypt SSL in cPanel
- Point domain to Node.js app URL

## How It Works
- Backend `src/app.ts` checks for frontend static in multiple locations:
  - `frontend/out/` (Next.js export)
  - `backend/public/` (copied frontend)
  - `public/` (root public)
- If found, serves static files via `express.static()`
- Fallback `*` route serves `index.html` for SPA routing (except `/api/*` and `/health`)
- If not found, serves API-only message with instructions

## Frontend Build Modes
- `CPANEL_EXPORT=true npm run build` -> Generates `frontend/out/` static export, unoptimized images, no rewrites, API URL = `/api/v1` (relative, same domain)
- Default `npm run build` -> Generates `.next/` for Vercel/Node.js server, with rewrites to `localhost:5000`

For single-file cPanel, **always use `CPANEL_EXPORT=true`**

## No Errors Guarantee
- Backend handles missing frontend gracefully: shows API-only message, not crash
- Database connection failure: logs warning, still serves health endpoint, doesn't crash (for preview)
- Missing API keys: isConfigured() checks, logs warning, disables features gracefully, no fake data
- All env vars have fallbacks in `config/env.ts`
- No Docker/Redis/RabbitMQ - pure Node.js + PostgreSQL

## Verification - Production Ready
After deployment, verify:
- `https://yourdomain.com/health` -> Should return healthy
- `https://yourdomain.com/api/v1/health` -> Should return healthy
- `https://yourdomain.com/` -> Should serve frontend (if built) or API message
- `https://yourdomain.com/football` -> Should serve frontend
- `https://yourdomain.com/api/v1/sports` -> Should return sports (empty if no DB yet, not error)

If frontend not showing:
- Check `backend/public/` exists and has `index.html`
- Check cPanel Node.js app logs
- Run `node scripts/copy-frontend.js` again

## Benefits
- ✅ Single cPanel Node.js app
- ✅ Single domain, no CORS issues (API = /api/v1 relative)
- ✅ No separate frontend hosting costs
- ✅ Works on ordinary cPanel
- ✅ No Docker, Redis, etc.
- ✅ Production ready, no errors

## Alternative: Separate Deployment (Original)
If you prefer separate:
- Backend: cPanel Node.js at api.yourdomain.com
- Frontend: Vercel/Netlify at yourdomain.com with NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
- See docs/CPANEL-DEPLOYMENT.md
