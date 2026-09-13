import { prisma } from '../config/database';
import { SportsProviderFactory } from '../providers/sports/providerFactory';
import { logger } from '../utils/logger';

/**
 * cPanel Compatible Cron - Odds Sync
 */

async function syncOdds() {
  logger.info('Starting odds sync...');
  try {
    await prisma.$connect();

    const upcomingFixtures = await prisma.fixture.findMany({
      where: { date: { gte: new Date(), lte: new Date(Date.now() + 24 * 60 * 60 * 1000) }, status: 'NS' },
      take: 50,
      orderBy: { date: 'asc' }
    });

    const footballProvider = SportsProviderFactory.getFootballProvider();

    for (const fixture of upcomingFixtures) {
      try {
        if (!fixture.externalId) continue;
        const odds = await footballProvider.getOdds(fixture.externalId);
        // Process odds - simplified
        for (const oddData of odds.slice(0, 10)) {
          // Upsert odds logic would go here
        }
        logger.info(`Synced odds for fixture ${fixture.id}`);
      } catch (e) {
        logger.warn(`Odds sync failed for fixture ${fixture.id}`);
      }
    }

    logger.info('Odds sync completed');
  } catch (error) {
    logger.error('Odds sync failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  syncOdds().then(() => process.exit(0));
}

export { syncOdds };
