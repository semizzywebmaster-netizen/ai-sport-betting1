import express from 'express';
import { securityMiddleware, sanitizeInput } from './middleware/security';
import { generalLimiter } from './middleware/rateLimiter';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { config } from './config/env';

import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/users/user.routes';
import sportsRoutes from './modules/sports/sports.routes';
import predictionRoutes from './modules/predictions/prediction.routes';
import oddsRoutes from './modules/odds/odds.routes';
import betBuilderRoutes from './modules/bet-builder/betBuilder.routes';
import walletRoutes from './modules/wallet/wallet.routes';
import paymentRoutes from './modules/payments/payment.routes';
import subscriptionRoutes from './modules/subscriptions/subscription.routes';
import referralRoutes from './modules/referrals/referral.routes';
import notificationRoutes from './modules/notifications/notification.routes';
import whatsappRoutes from './modules/whatsapp/whatsapp.routes';
import aiRoutes from './modules/ai/ai.routes';
import communityRoutes from './modules/community/community.routes';
import adminRoutes from './modules/admin/admin.routes';
import analyticsRoutes from './modules/analytics/analytics.routes';
import searchRoutes from './modules/search/search.routes';
import adsRoutes from './modules/ads/ads.routes';
import gamificationRoutes from './modules/gamification/gamification.routes';

const app = express();

app.use(securityMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(sanitizeInput);
app.use(generalLimiter);

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Punter Prediction API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    env: config.nodeEnv,
    features: config.features,
  });
});

app.get('/api/v1/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0',
      cpanelCompatible: true,
      noRedisRequired: true,
      noDockerRequired: true,
    }
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/sports', sportsRoutes);
app.use('/api/v1/predictions', predictionRoutes);
app.use('/api/v1/odds', oddsRoutes);
app.use('/api/v1/bet-builder', betBuilderRoutes);
app.use('/api/v1/wallet', walletRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes);
app.use('/api/v1/referrals', referralRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/whatsapp', whatsappRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/community', communityRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/ads', adsRoutes);
app.use('/api/v1/gamification', gamificationRoutes);

app.get('/api/v1/leagues', (req, res) => {
  res.json({ success: true, data: [], message: 'Use /sports/leagues' });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
