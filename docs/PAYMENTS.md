# Payments - Paystack & Flutterwave

## Architecture
- Separate cash wallet (NGN) and AI credits
- Immutable WalletTransaction ledger
- Payment model with verification
- Webhook handling with signature verification

## Paystack Flow
1. Frontend calls POST /payments/initialize { amount, provider: PAYSTACK, type, email }
2. Backend creates Payment record with reference PP-...
3. Backend calls Paystack /transaction/initialize with amount*100 (kobo)
4. Returns authorization_url to frontend
5. User pays on Paystack
6. Paystack redirects to callback + sends webhook
7. Backend verifies via GET /transaction/verify/:reference (server-side)
8. If success, credits wallet via walletService.creditWallet
9. Webhook handler also verifies and is idempotent

## Flutterwave Flow
Similar, uses /v3/payments and /v3/transactions/:id/verify

## Security
- Never trust frontend success
- Always verify server-side via provider API
- Verify webhook signature: HMAC SHA512 for Paystack, SHA256 for Flutterwave
- Idempotency key prevents duplicate processing
- If payment already SUCCESS and verified, return alreadyVerified true
- Log all webhooks in PaymentWebhook table

## Wallet
- Cash: NGN for subscriptions, withdrawals
- Credits: for AI predictions, analysis, bet builder
- Never mix
- Credit costs configurable

## Subscription Payments
- After payment verified, subscriptionService.subscribe called
- Credits added if plan includes credits
- Auto-renew handled via cron checkExpiredSubscriptions

## WhatsApp Payments
- User initiates via WhatsApp bot "pay" command
- Backend generates payment link
- Sends link via WhatsApp
- Verification still server-side
- No payment details in WhatsApp message

## Testing
- Use Paystack test keys sk_test_...
- Flutterwave test keys FLWSECK_TEST-...
- Test webhook with signature
