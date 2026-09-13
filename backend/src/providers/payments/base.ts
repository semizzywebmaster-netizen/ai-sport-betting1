export abstract class BasePaymentProvider {
  abstract name: string;
  abstract initializePayment(data: any): Promise<any>;
  abstract verifyPayment(reference: string): Promise<any>;
  abstract verifyWebhook(payload: any, signature: string): boolean;
}

export interface PaymentInitData {
  amount: number;
  email: string;
  currency?: string;
  reference: string;
  callbackUrl?: string;
  metadata?: any;
}
