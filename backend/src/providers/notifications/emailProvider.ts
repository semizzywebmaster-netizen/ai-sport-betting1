import nodemailer from 'nodemailer';
import { BaseNotificationProvider } from './base';
import { config } from '../../config/env';
import { logger } from '../../utils/logger';

export class EmailProvider extends BaseNotificationProvider {
  name = 'email';
  channel = 'EMAIL';
  private transporter: any;

  constructor() {
    super();
    if (this.isConfigured()) {
      this.transporter = nodemailer.createTransport({
        host: config.smtp.host,
        port: config.smtp.port,
        secure: config.smtp.port === 465,
        auth: {
          user: config.smtp.user,
          pass: config.smtp.pass,
        }
      });
    }
  }

  isConfigured(): boolean {
    return !!(config.smtp.user && config.smtp.pass);
  }

  async send(to: string, subject: string, message: string, data?: any): Promise<boolean> {
    if (!this.isConfigured()) {
      logger.warn('Email not configured, skipping send');
      return false;
    }

    try {
      await this.transporter.sendMail({
        from: config.smtp.from,
        to,
        subject,
        html: message,
        text: message.replace(/<[^>]*>/g, ''),
      });
      return true;
    } catch (error: any) {
      logger.error('Email send failed:', error.message);
      return false;
    }
  }
}

export class SMSProvider extends BaseNotificationProvider {
  name = 'sms';
  channel = 'SMS';

  isConfigured(): boolean {
    return !!config.sms.apiKey;
  }

  async send(to: string, subject: string, message: string): Promise<boolean> {
    if (!this.isConfigured()) return false;
    // Implement Termii or other SMS provider
    logger.info(`SMS to ${to}: ${message.substring(0, 50)}`);
    return true;
  }
}

export class WhatsAppNotificationProvider extends BaseNotificationProvider {
  name = 'whatsapp';
  channel = 'WHATSAPP';

  isConfigured(): boolean {
    return !!(config.whatsapp.accessToken && config.whatsapp.phoneNumberId);
  }

  async send(to: string, subject: string, message: string): Promise<boolean> {
    if (!this.isConfigured()) return false;
    // WhatsApp Cloud API implementation
    try {
      const axios = require('axios');
      await axios.post(`https://graph.facebook.com/v18.0/${config.whatsapp.phoneNumberId}/messages`, {
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
      return true;
    } catch (error: any) {
      logger.error('WhatsApp send failed:', error.message);
      return false;
    }
  }
}
