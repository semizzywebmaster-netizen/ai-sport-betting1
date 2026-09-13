import { Router } from 'express';
import { authenticate, isAdmin } from '../../middleware/auth';
import { prisma } from '../../config/database';
import { successResponse } from '../../utils/response';

const router = Router();

router.get('/public', async (req, res, next) => {
  try {
    const [totalPredictions, totalUsers, totalFixtures] = await Promise.all([
      prisma.prediction.count(),
      prisma.user.count(),
      prisma.fixture.count()
    ]);
    return successResponse(res, { totalPredictions, totalUsers, totalFixtures, note: 'No fake data - real counts only' });
  } catch (e) { next(e); }
});

router.use(authenticate, isAdmin);

router.get('/', async (req, res, next) => {
  try {
    const period = req.query.period as string || '30d';
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const [users, predictions, revenue, aiUsage] = await Promise.all([
      prisma.user.count({ where: { createdAt: { gte: since } } }),
      prisma.prediction.count({ where: { createdAt: { gte: since } } }),
      prisma.payment.aggregate({ where: { status: 'SUCCESS', createdAt: { gte: since } }, _sum: { amount: true } }),
      prisma.aIUsage.count({ where: { createdAt: { gte: since } } })
    ]);

    return successResponse(res, { period, users, predictions, revenue: revenue._sum.amount || 0, aiUsage });
  } catch (e) { next(e); }
});

export default router;
