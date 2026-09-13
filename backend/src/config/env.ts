import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || '',
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-change-in-production-min-32-chars',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-change',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  },
  sessionSecret: process.env.SESSION_SECRET || 'session-secret',
  bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12', 10),
  corsOrigin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  sportsApi: {
    key: process.env.SPORTS_API_KEY || '',
    baseUrl: process.env.SPORTS_API_BASE_URL || 'https://v3.football.api-sports.io',
    provider: process.env.SPORTS_API_PROVIDER || 'api-sports',
  },
  ai: {
    primaryProvider: process.env.AI_PRIMARY_PROVIDER || 'openai',
    primaryKey: process.env.AI_PRIMARY_API_KEY || process.env.OPENAI_API_KEY || '',
    secondaryProvider: process.env.AI_SECONDARY_PROVIDER || 'anthropic',
    secondaryKey: process.env.AI_SECONDARY_API_KEY || process.env.ANTHROPIC_API_KEY || '',
    backupProvider: process.env.AI_BACKUP_PROVIDER || 'groq',
    backupKey: process.env.AI_BACKUP_API_KEY || process.env.GROQ_API_KEY || '',
  },
  paystack: {
    secretKey: process.env.PAYSTACK_SECRET_KEY || '',
    publicKey: process.env.PAYSTACK_PUBLIC_KEY || '',
    webhookSecret: process.env.PAYSTACK_WEBHOOK_SECRET || '',
  },
  flutterwave: {
    secretKey: process.env.FLUTTERWAVE_SECRET_KEY || '',
    publicKey: process.env.FLUTTERWAVE_PUBLIC_KEY || '',
    webhookSecret: process.env.FLUTTERWAVE_WEBHOOK_SECRET || '',
    encryptionKey: process.env.FLUTTERWAVE_ENCRYPTION_KEY || '',
  },
  whatsapp: {
    accessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
    phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
    businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || '',
    verifyToken: process.env.WHATSAPP_VERIFY_TOKEN || 'punter_verify_token',
    appSecret: process.env.WHATSAPP_APP_SECRET || '',
  },
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'noreply@punterprediction.com',
  },
  sms: {
    provider: process.env.SMS_PROVIDER || 'termii',
    apiKey: process.env.SMS_API_KEY || '',
    senderId: process.env.SMS_SENDER_ID || 'PunterPred',
  },
  features: {
    football: process.env.ENABLE_FOOTBALL !== 'false',
    basketball: process.env.ENABLE_BASKETBALL !== 'false',
    aiPredictions: process.env.ENABLE_AI_PREDICTIONS !== 'false',
    betBuilder: process.env.ENABLE_BET_BUILDER !== 'false',
    subscriptions: process.env.ENABLE_SUBSCRIPTIONS !== 'false',
    referrals: process.env.ENABLE_REFERRALS !== 'false',
    whatsapp: process.env.ENABLE_WHATSAPP !== 'false',
    community: process.env.ENABLE_COMMUNITY !== 'false',
    ads: process.env.ENABLE_ADS !== 'false',
  },
  admin: {
    email: process.env.ADMIN_EMAIL || 'admin@punterprediction.com',
    password: process.env.ADMIN_PASSWORD || 'Admin123!',
  },
  appUrl: process.env.APP_URL || 'https://punterprediction.com',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  }
};

export const isProduction = config.nodeEnv === 'production';
export const isDevelopment = config.nodeEnv === 'development';
