import { prisma } from '../config/database';
import { SportsProviderFactory } from '../providers/sports/providerFactory';
import { logger } from '../utils/logger';

/**
 * cPanel Compatible Cron Job - Sports Sync
 * Run via: node dist/jobs/sportsSync.js
 * cPanel cron: /usr/local/bin/node /home/username/app/dist/jobs/sportsSync.js
 */

async function syncSports() {
  logger.info('Starting sports sync job...');
  try {
    await prisma.$connect();

    const sports = await prisma.sport.findMany({ where: { isActive: true } });
    
    for (const sport of sports) {
      try {
        const provider = sport.slug === 'basketball' ? SportsProviderFactory.getBasketballProvider() : SportsProviderFactory.getFootballProvider();
        const leagues = await provider.getLeagues();
        logger.info(`Synced ${leagues.length} leagues for ${sport.name}`);

        // Also sync today's fixtures for featured leagues
        const featuredLeagues = await prisma.league.findMany({ where: { sportId: sport.id, isFeatured: true, isActive: true }, take: 5 });
        for (const league of featuredLeagues) {
          try {
            const fixtures = await provider.getFixtures({ league: league.externalId, date: new Date().toISOString().split('T')[0] });
            logger.info(`Synced ${fixtures.length} fixtures for ${league.name}`);
          } catch (e) {
            logger.warn(`Failed to sync fixtures for ${league.name}: ${e}`);
          }
        }
      } catch (e: any) {
        logger.error(`Failed to sync ${sport.name}: ${e.message}`);
      }
    }

    logger.info('Sports sync completed');
  } catch (error) {
    logger.error('Sports sync job failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run if called directly
if (require.main === module) {
  syncSports().then(() => process.exit(0));
}

export { syncSports };
