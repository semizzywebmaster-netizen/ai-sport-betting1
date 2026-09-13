import { prisma } from '../../config/database';
import { SportsProviderFactory } from '../../providers/sports/providerFactory';
import { logger } from '../../utils/logger';

export class SportsService {
  async getSports() {
    return prisma.sport.findMany({ where: { isActive: true }, orderBy: { name: 'asc' } });
  }

  async getLeagues(params: { sport?: string; isFeatured?: boolean; search?: string; page?: number; limit?: number }) {
    const where: any = { isActive: true };
    if (params.sport) {
      const sport = await prisma.sport.findFirst({ where: { slug: params.sport } });
      if (sport) where.sportId = sport.id;
    }
    if (params.isFeatured) where.isFeatured = true;
    if (params.search) where.name = { contains: params.search, mode: 'insensitive' };

    const page = params.page || 1;
    const limit = params.limit || 50;
    const skip = (page - 1) * limit;

    const [leagues, total] = await Promise.all([
      prisma.league.findMany({ where, include: { sport: true }, orderBy: [{ priority: 'desc' }, { name: 'asc' }], skip, take: limit }),
      prisma.league.count({ where })
    ]);

    return { leagues, total, page, limit };
  }

  async getTeams(params: { leagueId?: string; search?: string; page?: number; limit?: number }) {
    const where: any = {};
    if (params.search) where.name = { contains: params.search, mode: 'insensitive' };
    if (params.leagueId) {
      where.leagues = { some: { leagueId: params.leagueId } };
    }
    const page = params.page || 1;
    const limit = params.limit || 50;
    const skip = (page - 1) * limit;

    const [teams, total] = await Promise.all([
      prisma.team.findMany({ where, skip, take: limit, orderBy: { name: 'asc' } }),
      prisma.team.count({ where })
    ]);
    return { teams, total, page, limit };
  }

  async getFixtures(params: { leagueId?: string; teamId?: string; date?: string; status?: string; sport?: string; page?: number; limit?: number }) {
    const where: any = {};
    if (params.leagueId) where.leagueId = params.leagueId;
    if (params.teamId) where.OR = [{ homeTeamId: params.teamId }, { awayTeamId: params.teamId }];
    if (params.status) where.status = params.status as any;
    if (params.date) {
      const date = new Date(params.date);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      where.date = { gte: date, lt: nextDay };
    }
    if (params.sport) {
      const sport = await prisma.sport.findFirst({ where: { slug: params.sport } });
      if (sport) {
        const leagues = await prisma.league.findMany({ where: { sportId: sport.id }, select: { id: true } });
        where.leagueId = { in: leagues.map(l => l.id) };
      }
    }

    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const [fixtures, total] = await Promise.all([
      prisma.fixture.findMany({
        where,
        include: { homeTeam: true, awayTeam: true, league: { include: { sport: true } } },
        orderBy: { date: 'asc' },
        skip,
        take: limit
      }),
      prisma.fixture.count({ where })
    ]);

    return { fixtures, total, page, limit };
  }

  async getFixtureById(id: string) {
    return prisma.fixture.findUnique({
      where: { id },
      include: {
        homeTeam: true,
        awayTeam: true,
        league: { include: { sport: true } },
        odds: { orderBy: { timestamp: 'desc' } },
        predictions: { include: { aiProvider: true }, orderBy: { createdAt: 'desc' } }
      }
    });
  }

  async syncLeaguesFromProvider(sport: 'football' | 'basketball') {
    try {
      const provider = sport === 'football' ? SportsProviderFactory.getFootballProvider() : SportsProviderFactory.getBasketballProvider();
      const leaguesData = await provider.getLeagues();

      const sportRecord = await prisma.sport.findFirst({ where: { slug: sport } });
      if (!sportRecord) {
        logger.warn(`Sport ${sport} not found in DB`);
        return [];
      }

      // Upsert leagues - simplified
      for (const leagueData of leaguesData.slice(0, 20)) {
        await prisma.league.upsert({
          where: { slug: `${sport}-${leagueData.league?.id || leagueData.id}` },
          create: {
            sportId: sportRecord.id,
            externalId: String(leagueData.league?.id || leagueData.id),
            name: leagueData.league?.name || leagueData.name,
            slug: `${sport}-${leagueData.league?.id || leagueData.id}`,
            country: leagueData.country?.name || leagueData.country,
            logo: leagueData.league?.logo,
            type: leagueData.league?.type || 'league',
            provider: provider.name,
            providerData: leagueData as any,
          },
          update: {
            name: leagueData.league?.name || leagueData.name,
            logo: leagueData.league?.logo,
            providerData: leagueData as any,
          }
        });
      }

      return leaguesData;
    } catch (error: any) {
      logger.error(`Sync leagues failed for ${sport}:`, error.message);
      throw error;
    }
  }

  async getSupportedFootballLeagues() {
    return [
      'Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1',
      'Champions League', 'Europa League', 'Conference League',
      'FA Cup', 'EFL Championship', 'EFL Cup', 'Copa del Rey', 'Copa Italia',
      'DFB-Pokal', 'Coupe de France', 'MLS', 'Saudi Pro League', 'Brasileirão',
      'Liga Portugal', 'Eredivisie', 'Belgian Pro League', 'Turkish Süper Lig',
      'Scottish Premiership', 'Greek Super League', 'Argentine Primera División',
      'Liga MX', 'CAF Champions League', 'CAF Confederation Cup'
    ];
  }

  async getSupportedBasketballLeagues() {
    return [
      'NBA', 'WNBA', 'NCAA Men', 'NCAA Women', 'EuroLeague', 'EuroCup',
      'FIBA', 'ACB', 'Basketball Bundesliga', 'LNB Pro A',
      'Lega Basket Serie A', 'Greek Basket League', 'Turkish BSL', 'ABA League'
    ];
  }
}

export const sportsService = new SportsService();
