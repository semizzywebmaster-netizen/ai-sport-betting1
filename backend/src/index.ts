import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { config } from './config/env';
import { connectDatabase, disconnectDatabase } from './config/database';
import { logger } from './utils/logger';

const PORT = config.port;

async function startServer() {
  try {
    try {
      await connectDatabase();
    } catch (dbError) {
      logger.warn('⚠️ Database connection failed - running in limited mode (health endpoint still available). Set DATABASE_URL for full functionality.');
      logger.warn('This is expected in preview without PostgreSQL - production requires PostgreSQL per docs/DATABASE.md');
    }
    
    const server = app.listen(PORT, '0.0.0.0', () => {
      logger.info(`🚀 Punter Prediction API running on port ${PORT}`);
      logger.info(`📊 Environment: ${config.nodeEnv}`);
      logger.info(`🔗 Health: http://localhost:${PORT}/health`);
      logger.info(`🔗 API: http://localhost:${PORT}/api/v1/health`);
      logger.info(`✅ cPanel Compatible - No Redis/Docker required`);
      logger.info(`⚽ Football: ${config.features.football ? 'Enabled' : 'Disabled'}`);
      logger.info(`🏀 Basketball: ${config.features.basketball ? 'Enabled' : 'Disabled'}`);
    });

    // Graceful shutdown - cPanel compatible
    const shutdown = async () => {
      logger.info('Shutting down gracefully...');
      server.close(async () => {
        await disconnectDatabase();
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
