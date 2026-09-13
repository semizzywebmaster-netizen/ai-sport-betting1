import { Router } from 'express';
import { prisma } from '../../config/database';
import { successResponse, errorResponse } from '../../utils/response';
import { getPaginationParams } from '../../utils/helpers';

const router = Router();

router.get('/fixture/:fixtureId', async (req, res, next) => {
  try {
    const odds = await prisma.odds.findMany({
      where: { fixtureId: req.params.fixtureId, isAvailable: true },
      orderBy: { timestamp: 'desc' }
    });
    return successResponse(res, odds);
  } catch (e) { next(e); }
});

router.get('/movement/:oddsId', async (req, res, next) => {
  try {
    const movements = await prisma.oddsMovement.findMany({
      where: { oddsId: req.params.oddsId },
      orderBy: { timestamp: 'desc' },
      take: 50
    });
    return successResponse(res, movements);
  } catch (e) { next(e); }
});

export default router;
