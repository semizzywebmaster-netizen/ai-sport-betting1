import { Router } from 'express';
import { prisma } from '../../config/database';
import { successResponse } from '../../utils/response';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const q = (req.query.q as string) || '';
    const type = req.query.type as string;

    if (!q || q.length < 2) {
      return successResponse(res, { results: [], query: q }, 'Query too short');
    }

    const results: any = {
      teams: [],
      leagues: [],
      fixtures: [],
      players: [],
      predictions: [],
      users: [],
    };

    if (!type || type === 'teams') {
      results.teams = await prisma.team.findMany({
        where: { name: { contains: q, mode: 'insensitive' } },
        take: 10,
      });
    }

    if (!type || type === 'leagues') {
      results.leagues = await prisma.league.findMany({
        where: { name: { contains: q, mode: 'insensitive' } },
        include: { sport: true },
        take: 10,
      });
    }

    if (!type || type === 'fixtures') {
      results.fixtures = await prisma.fixture.findMany({
        where: {
          OR: [
            { homeTeam: { name: { contains: q, mode: 'insensitive' } } },
            { awayTeam: { name: { contains: q, mode: 'insensitive' } } },
          ]
        },
        include: { homeTeam: true, awayTeam: true, league: true },
        take: 10,
      });
    }

    if (!type || type === 'players') {
      results.players = await prisma.player.findMany({
        where: { name: { contains: q, mode: 'insensitive' } },
        take: 10,
      });
    }

    if (!type || type === 'predictions') {
      results.predictions = await prisma.prediction.findMany({
        where: {
          OR: [
            { selection: { contains: q, mode: 'insensitive' } },
            { market: { contains: q, mode: 'insensitive' } },
          ]
        },
        include: { fixture: { include: { homeTeam: true, awayTeam: true } } },
        take: 10,
      });
    }

    if (!type || type === 'users') {
      results.users = await prisma.user.findMany({
        where: { username: { contains: q, mode: 'insensitive' } },
        select: { id: true, username: true, avatar: true },
        take: 10,
      });
    }

    return successResponse(res, { query: q, results, total: Object.values(results).flat().length });
  } catch (e) { next(e); }
});

export default router;
