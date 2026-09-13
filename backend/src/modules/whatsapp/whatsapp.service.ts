import { prisma } from '../../config/database';
import { generateOTP } from '../../utils/helpers';
import { config } from '../../config/env';
import axios from 'axios';
import { logger } from '../../utils/logger';

export class WhatsAppService {
  async linkAccount(userId: string, phoneNumber: string) {
    const formatted = phoneNumber.replace(/\D/g, '');
    
    const existing = await prisma.whatsAppAccount.findUnique({ where: { phoneNumber: formatted } });
    if (existing && existing.userId !== userId) throw new Error('Phone number already linked to another account');

    const otpCode = generateOTP();

    await prisma.oTP.create({
      data: {
        userId,
        identifier: formatted,
        code: otpCode,
        type: 'WHATSAPP_LINK',
        channel: 'WHATSAPP',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
      }
    });

    const account = await prisma.whatsAppAccount.upsert({
      where: { userId },
      create: { userId, phoneNumber: formatted, isVerified: false, isLinked: false },
      update: { phoneNumber: formatted }
    });

    // In production, send OTP via WhatsApp
    if (config.whatsapp.accessToken) {
      try {
        await this.sendWhatsAppMessage(formatted, `Your Punter Prediction verification code is: ${otpCode}. Valid for 10 minutes. 18+`);
      } catch (e) {
        logger.warn('Failed to send WhatsApp OTP:', e);
      }
    }

    return { account, otpCode }; // otpCode for dev only
  }

  async verifyLink(userId: string, code: string) {
    const otp = await prisma.oTP.findFirst({
      where: { userId, code, type: 'WHATSAPP_LINK', isUsed: false, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' }
    });

    if (!otp) throw new Error('Invalid or expired OTP');

    await prisma.oTP.update({ where: { id: otp.id }, data: { isUsed: true } });

    const account = await prisma.whatsAppAccount.update({
      where: { userId },
      data: { isVerified: true, isLinked: true, linkedAt: new Date() }
    });

    return account;
  }

  async unlinkAccount(userId: string) {
    return prisma.whatsAppAccount.update({
      where: { userId },
      data: { isLinked: false, isVerified: false }
    });
  }

  async sendWhatsAppMessage(to: string, message: string) {
    if (!config.whatsapp.accessToken || !config.whatsapp.phoneNumberId) {
      throw new Error('WhatsApp not configured');
    }

    const response = await axios.post(`https://graph.facebook.com/v18.0/${config.whatsapp.phoneNumberId}/messages`, {
      messaging_product: 'whatsapp',
      to: to.replace('+', ''),
      type: 'text',
      text: { body: message }
    }, {
      headers: {
        Authorization: `Bearer ${config.whatsapp.accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  }

  async handleIncomingWebhook(payload: any) {
    // WhatsApp Business Cloud API webhook handling
    try {
      const entry = payload.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const messages = value?.messages;

      if (!messages?.length) return null;

      const message = messages[0];
      const from = message.from;
      const text = message.text?.body || '';

      // Find user by WhatsApp account
      const account = await prisma.whatsAppAccount.findFirst({ where: { phoneNumber: from } });
      
      if (!account) {
        // New user - prompt to link
        await this.sendWhatsAppMessage(from, 'Welcome to Punter Prediction! 🎯\n\nPlease link your account:\n1. Go to punterprediction.com/whatsapp\n2. Enter your phone\n3. Verify OTP\n\nCommands:\n- predictions\n- football\n- basketball\n- my account\n- wallet\n- help\n\n18+ Responsible betting. Predictions are analytical estimates, not guarantees.');
        return { from, text, account: null };
      }

      // Update last interaction
      await prisma.whatsAppAccount.update({ where: { id: account.id }, data: { lastInteraction: new Date() } });

      // Process commands
      const lowerText = text.toLowerCase().trim();
      let reply = '';

      if (lowerText.includes('prediction')) {
        reply = '🎯 Latest Predictions:\n\n⚽ Man City vs Arsenal - Over 2.5 (72% confidence, MEDIUM risk)\n🏀 Lakers vs Warriors - Lakers -3.5 (68% confidence, LOW risk)\n\nView more at punterprediction.com/predictions\n\nAnalytical estimates, not guarantees. 18+';
      } else if (lowerText.includes('football')) {
        reply = '⚽ Football Today:\n\n• Premier League: 5 matches\n• La Liga: 3 matches\n• Champions League: 2 matches\n\nGet AI predictions at punterprediction.com/football';
      } else if (lowerText.includes('basketball')) {
        reply = '🏀 Basketball Today:\n\n• NBA: 6 games\n• EuroLeague: 4 games\n\nGet predictions at punterprediction.com/basketball\n\nEqual first-class treatment for both sports!';
      } else if (lowerText.includes('wallet') || lowerText.includes('balance')) {
        const wallet = await prisma.wallet.findUnique({ where: { userId: account.userId } });
        const credits = await prisma.creditBalance.findUnique({ where: { userId: account.userId } });
        reply = `💰 Wallet:\nCash: ₦${wallet?.cashBalance || 0}\nCredits: ${credits?.credits || 0}\n\nFund wallet at punterprediction.com/wallet`;
      } else if (lowerText.includes('help')) {
        reply = '🆘 Punter Prediction Help:\n\nCommands:\n• predictions - Latest predictions\n• football - Football matches\n• basketball - Basketball games\n• my account - Account info\n• wallet - Wallet balance\n• bet codes - Your bet codes\n• help - This menu\n\nWebsite: punterprediction.com\nSupport: support@punterprediction.com\n\n18+ Responsible betting.';
      } else {
        reply = `Received: "${text}"\n\nI'm Punter Prediction AI assistant! Try:\n• predictions\n• football\n• basketball\n• wallet\n• help\n\nPredictions are analytical estimates, not guaranteed. 18+`;
      }

      await this.sendWhatsAppMessage(from, reply);

      return { from, text, reply, account };
    } catch (error: any) {
      logger.error('WhatsApp webhook handling failed:', error.message);
      throw error;
    }
  }
}

export const whatsappService = new WhatsAppService();
