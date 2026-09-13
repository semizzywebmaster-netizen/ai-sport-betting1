import axios from 'axios';
import { BasePaymentProvider, PaymentInitData } from './base';
import { config } from '../../config/env';
import { logger } from '../../utils/logger';
import crypto from 'crypto';

export class PaystackProvider extends BasePaymentProvider {
  name = 'paystack';
  private secretKey: string;
  private baseUrl = 'https://api.paystack.co';

  constructor() {
    super();
    this.secretKey = config.paystack.secretKey;
  }

  isConfigured(): boolean {
    return !!this.secretKey;
  }

  async initializePayment(data: PaymentInitData): Promise<any> {
    if (!this.isConfigured()) {
      throw new Error('Paystack not configured');
    }

    try {
      const response = await axios.post(`${this.baseUrl}/transaction/initialize`, {
        amount: Math.round(data.amount * 100), // Paystack expects kobo
        email: data.email,
        currency: data.currency || 'NGN',
        reference: data.reference,
        callback_url: data.callbackUrl,
        metadata: data.metadata,
      }, {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        }
      });

      return response.data;
    } catch (error: any) {
      logger.error('Paystack init failed:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Paystack initialization failed');
    }
  }

  async verifyPayment(reference: string): Promise<any> {
    if (!this.isConfigured()) throw new Error('Paystack not configured');

    try {
      const response = await axios.get(`${this.baseUrl}/transaction/verify/${reference}`, {
        headers: { Authorization: `Bearer ${this.secretKey}` }
      });
      return response.data;
    } catch (error: any) {
      logger.error('Paystack verify failed:', error.response?.data || error.message);
      throw error;
    }
  }

  verifyWebhook(payload: any, signature: string): boolean {
    if (!config.paystack.webhookSecret && !this.secretKey) return false;
    const secret = config.paystack.webhookSecret || this.secretKey;
    const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(payload)).digest('hex');
    return hash === signature;
  }
}

export class FlutterwaveProvider extends BasePaymentProvider {
  name = 'flutterwave';
  private secretKey: string;
  private baseUrl = 'https://api.flutterwave.com/v3';

  constructor() {
    super();
    this.secretKey = config.flutterwave.secretKey;
  }

  isConfigured(): boolean {
    return !!this.secretKey;
  }

  async initializePayment(data: PaymentInitData): Promise<any> {
    if (!this.isConfigured()) throw new Error('Flutterwave not configured');

    try {
      const response = await axios.post(`${this.baseUrl}/payments`, {
        tx_ref: data.reference,
        amount: data.amount,
        currency: data.currency || 'NGN',
        redirect_url: data.callbackUrl,
        customer: { email: data.email },
        customizations: { title: 'Punter Prediction', description: 'Wallet funding' },
        meta: data.metadata,
      }, {
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          'Content-Type': 'application/json',
        }
      });

      return response.data;
    } catch (error: any) {
      logger.error('Flutterwave init failed:', error.response?.data || error.message);
      throw new Error('Flutterwave initialization failed');
    }
  }

  async verifyPayment(reference: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/transactions/${reference}/verify`, {
        headers: { Authorization: `Bearer ${this.secretKey}` }
      });
      return response.data;
    } catch (error: any) {
      logger.error('Flutterwave verify failed:', error.message);
      throw error;
    }
  }

  verifyWebhook(payload: any, signature: string): boolean {
    if (!config.flutterwave.webhookSecret) return true; // fallback
    const hash = crypto.createHmac('sha256', config.flutterwave.webhookSecret).update(JSON.stringify(payload)).digest('hex');
    return hash === signature;
  }
}
