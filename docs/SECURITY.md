# Security - Punter Prediction

## Authentication
- Bcrypt 12 rounds
- JWT with expiry 7d, refresh 30d
- Session tracking with device info
- Failed login protection via rate limiting and logging
- OTP with 10 min expiry, max 5 attempts per hour
- Password reset token 30 min expiry, single use

## Authorization
- Single admin role (no super admin confusion)
- Middleware authorize(...roles)
- Admin audit logs

## Input Validation
- Zod schemas for all inputs
- XSS clean middleware
- HPP protection
- Request size limits 10mb

## Headers
- Helmet: CSP, HSTS, XSS filter, frameguard
- CORS configured to specific origins
- Secure cookies where applicable

## Rate Limiting
- General: 100 req / 15 min
- Auth: 10 req / 15 min
- OTP: 5 req / hour
- Payments: 20 req / hour

## Payments
- Never trust frontend confirmation
- Server-side verification via Paystack/Flutterwave API
- Webhook signature verification HMAC SHA512 / SHA256
- Idempotency keys
- Duplicate webhook protection
- Transaction logging immutable
- Wallet ledger separate from credits

## WhatsApp
- Verify token for webhook verification
- Signature validation
- OTP expiry
- Rate limit commands
- No secrets exposed to frontend

## Secrets Management
- All secrets in env vars
- No hard-coded keys
- Frontend only NEXT_PUBLIC_API_URL
- Prisma DATABASE_URL from env

## Database
- Prisma prevents SQL injection
- No raw queries with user input
- Indexes for performance
- Constraints for integrity

## Responsible Betting
- No guaranteed win language
- 18+ checks
- Predictions marked as analytical estimates

## cPanel
- No root required
- No Docker/Redis that would need extra privileges
- Process.env.PORT

## Audit
- AuditLog for admin actions
- Security logger for auth failures
- Payment webhooks logged
