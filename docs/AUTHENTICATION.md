# Authentication

## Registration
- Email, phone, username required (email or phone at least one)
- Password min 8 chars, uppercase, lowercase, number
- Duplicate check: username, email, phone
- Referral code support
- Welcome 5 credits
- OTP generated for verification (EMAIL_VERIFICATION or PHONE_VERIFICATION)

## Verification
- OTP 6 digits, 10 min expiry
- Resend protection via rate limiting 5/hour
- Channel: EMAIL, SMS, WHATSAPP
- Email OTP, Phone OTP, WhatsApp OTP configurable

## Login
- Supports email, phone, username as identifier
- Bcrypt compare
- Failed login protection via rate limiting and logging
- JWT token 7d, refresh 30d
- Session created with IP, userAgent
- Device tracking

## Password Recovery
- Forgot password: identifier -> token + OTP
- Reset: token + new password
- Token expiry 30 mins, single use
- Invalidate all sessions after reset

## Session & Device Management
- GET /auth/sessions: active sessions
- POST /auth/logout: revoke current
- POST /auth/logout-all: revoke all
- Device model with deviceId, name, type, OS, browser, lastActive, isTrusted

## Security
- JWT secret min 32 chars
- Bcrypt 12 rounds
- Rate limiting auth 10/15min
- Secure headers via Helmet
