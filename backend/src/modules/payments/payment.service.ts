import { prisma } from '../../config/database';
import { PaystackProvider, FlutterwaveProvider } from '../../providers/payments/paystackProvider';
import { generateRandomToken } from '../../utils/helpers';
import { walletService } from '../wallet/wallet.service';
import { logger } from '../../utils/logger';

export class PaymentService {
  private paystack = new PaystackProvider();
  private flutterwave = new FlutterwaveProvider();

  async initializePayment(userId: string, data: { amount: number; provider: 'PAYSTACK' | 'FLUTTERWAVE'; type: string; email: string }) {
    const reference = `PP-${Date.now()}-${generateRandomToken(6).toUpperCase()}`;
    const idempotencyKey = generateRandomToken(16);

    const payment = await prisma.payment.create({
      data: {
        userId,
        provider: data.provider,
        amount: data.amount,
        currency: 'NGN',
        type: data.type,
        providerReference: reference,
        idempotencyKey,
        status: 'PENDING',
        metadata: { email: data.email, type: data.type }
      }
    });

    let providerResponse;
    const callbackUrl = `${process.env.FRONTEND_URL}/wallet/callback?reference=${reference}`;

    try {
      if (data.provider === 'PAYSTACK') {
        providerResponse = await this.paystack.initializePayment({
          amount: data.amount,
          email: data.email,
          reference,
          callbackUrl,
          metadata: { paymentId: payment.id, userId, type: data.type }
        });
      } else {
        providerResponse = await this.flutterwave.initializePayment({
          amount: data.amount,
          email: data.email,
          reference,
          callbackUrl,
          metadata: { paymentId: payment.id, userId }
        });
      }
    } catch (error: any) {
      await prisma.payment.update({ where: { id: payment.id }, data: { status: 'FAILED', metadata: { error: error.message } } });
      throw error;
    }

    return { payment, providerResponse };
  }

  async verifyPayment(reference: string) {
    const payment = await prisma.payment.findUnique({ where: { providerReference: reference } });
    if (!payment) throw new Error('Payment not found');

    // Idempotency check
    if (payment.status === 'SUCCESS' && payment.verified) {
      return { payment, alreadyVerified: true };
    }

    let verification;
    try {
      if (payment.provider === 'PAYSTACK') {
        verification = await this.paystack.verifyPayment(reference);
        const isSuccess = verification.data?.status === 'success';
        
        if (isSuccess) {
          await this.handleSuccessfulPayment(payment);
        }

        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: isSuccess ? 'SUCCESS' : 'FAILED',
            verified: true,
            verifiedAt: new Date(),
            metadata: { ...payment.metadata as any, verification: verification.data }
          }
        });

      } else {
        verification = await this.flutterwave.verifyPayment(reference);
        const isSuccess = verification.data?.status === 'successful';

        if (isSuccess) {
          await this.handleSuccessfulPayment(payment);
        }

        await prisma.payment.update({
          where: { id: payment.id },
          data: {
            status: isSuccess ? 'SUCCESS' : 'FAILED',
            verified: true,
            verifiedAt: new Date()
          }
        });
      }
    } catch (error: any) {
      logger.error('Payment verification failed:', error.message);
      throw error;
    }

    const updatedPayment = await prisma.payment.findUnique({ where: { id: payment.id } });
    return { payment: updatedPayment, verification };
  }

  private async handleSuccessfulPayment(payment: any) {
    // Credit wallet - separate cash and credits logic
    if (payment.type === 'deposit' || payment.type === 'wallet_funding') {
      await walletService.creditWallet(payment.userId, payment.amount, 'DEPOSIT', `Wallet funding via ${payment.provider}`, { paymentId: payment.id });
    } else if (payment.type === 'credits') {
      const credits = Math.floor(payment.amount / 100); // 100 NGN = 1 credit example
      await walletService.addCredits(payment.userId, credits, `Purchase via ${payment.provider}`);
      await walletService.creditWallet(payment.userId, 0, 'CREDIT_PURCHASE', `Credits purchase`, { credits, paymentId: payment.id });
    } else if (payment.type === 'subscription') {
      // Handle subscription - in subscription service
      await walletService.creditWallet(payment.userId, payment.amount, 'SUBSCRIPTION_CHARGE', `Subscription payment`, { paymentId: payment.id });
    }
  }

  async handleWebhook(provider: 'PAYSTACK' | 'FLUTTERWAVE', payload: any, signature: string) {
    // Verify signature
    let isValid = false;
    if (provider === 'PAYSTACK') {
      isValid = this.paystack.verifyWebhook(payload, signature);
    } else {
      isValid = this.flutterwave.verifyWebhook(payload, signature);
    }

    if (!isValid) {
      logger.warn(`Invalid webhook signature for ${provider}`);
      throw new Error('Invalid webhook signature');
    }

    // Log webhook
    const webhook = await prisma.paymentWebhook.create({
      data: {
        provider,
        event: payload.event || payload.type || 'unknown',
        payload,
        signature,
        isVerified: isValid,
      }
    });

    // Process based on provider
    try {
      let reference = '';
      if (provider === 'PAYSTACK') {
        reference = payload.data?.reference;
      } else {
        reference = payload.data?.tx_ref;
      }

      if (reference) {
        await this.verifyPayment(reference);
        await prisma.paymentWebhook.update({
          where: { id: webhook.id },
          data: { isProcessed: true, processedAt: new Date() }
        });
      }
    } catch (error: any) {
      logger.error('Webhook processing failed:', error.message);
    }

    return webhook;
  }
}

export const paymentService = new PaymentService();
