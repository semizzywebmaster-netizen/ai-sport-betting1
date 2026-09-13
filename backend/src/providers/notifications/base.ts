export abstract class BaseNotificationProvider {
  abstract name: string;
  abstract channel: string;
  abstract send(to: string, subject: string, message: string, data?: any): Promise<boolean>;
  abstract isConfigured(): boolean;
}
