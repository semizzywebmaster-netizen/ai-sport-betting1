# WhatsApp Integration

## Business Cloud API
- Provider: WhatsApp Business Cloud API via Meta Graph API
- Config: WHATSAPP_ACCESS_TOKEN, PHONE_NUMBER_ID, VERIFY_TOKEN, APP_SECRET

## Account Linking
1. User enters phone in app /whatsapp/link
2. Backend generates OTP, creates WhatsAppAccount (isLinked false)
3. Sends OTP via WhatsApp if configured, else via SMS/email fallback
4. User verifies OTP via /whatsapp/verify
5. Account becomes isVerified true, isLinked true, linkedAt set

## Bot Commands
- predictions: latest predictions
- football: football today
- basketball: basketball today
- today's matches: fixtures
- my account: wallet, credits
- wallet: balance
- subscriptions: active sub
- bet codes: user bet codes
- AI assistant: forward to AI manager
- help: menu

## Webhook
- GET /whatsapp/webhook: verification with hub.mode, hub.verify_token, hub.challenge
- POST /whatsapp/webhook: incoming messages
- Always return 200 to WhatsApp
- Verify signature using APP_SECRET

## Security
- No secrets in frontend
- OTP expiry 10 min
- Rate limit WhatsApp commands (generalLimiter)
- Validate phone formatting Nigerian +234

## Payment Links
- User types "pay" or "deposit"
- Bot generates Paystack/Flutterwave link via paymentService
- Sends link: "Complete payment: https://..."
- Verification server-side after payment

## Notifications
- WhatsAppNotificationProvider sends via Graph API
- Fallback to SMS/email if WhatsApp not configured
- Preferences in WhatsAppAccount.preferences JSON

## cPanel
- Webhook URL: https://api.punterprediction.com/api/v1/whatsapp/webhook
- Set in Meta dashboard
- No extra daemons needed
