import { prisma } from '../config/database';
import { logger } from '../utils/logger';

/**
 * cPanel Compatible Cron - Cleanup expired OTPs, sessions, etc
 */

async function cleanup() {
  logger.info('Starting cleanup job...');
  try {
    await prisma.$connect();

    const expiredOTPs = await prisma.oTP.deleteMany({ where: { expiresAt: { lt: new Date() }, isUsed: false } });
    logger.info(`Cleaned ${expiredOTPs.count} expired OTPs`);

    const expiredResets = await prisma.passwordReset.deleteMany({ where: { expiresAt: { lt: new Date() }, isUsed: false } });
    logger.info(`Cleaned ${expiredResets.count} expired password resets`);

    const expiredSessions = await prisma.session.updateMany({ where: { expiresAt: { lt: new Date() }, isActive: true }, data: { isActive: false } });
    logger.info(`Deactivated ${expiredSessions.count} expired sessions`);

    const oldLogs = await prisma.auditLog.deleteMany({ where: { createdAt: { lt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } } });
    logger.info(`Cleaned ${oldLogs.count} old audit logs`);

    logger.info('Cleanup completed');
  } catch (error) {
    logger.error('Cleanup failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  cleanup().then(() => process.exit(0));
}

export { cleanup };
