import { Router } from 'express';
import { authenticate, isAdmin } from '../../middleware/auth';
import { prisma } from '../../config/database';
import { successResponse, errorResponse } from '../../utils/response';
import { getPaginationParams } from '../../utils/helpers';

const router = Router();
router.use(authenticate, isAdmin);

router.get('/overview', async (req, res, next) => {
  try {
    const [users, predictions, fixtures, payments, posts, activeSubs] = await Promise.all([
      prisma.user.count(),
      prisma.prediction.count(),
      prisma.fixture.count(),
      prisma.payment.count({ where: { status: 'SUCCESS' } }),
      prisma.communityPost.count(),
      prisma.subscription.count({ where: { status: 'ACTIVE' } }),
    ]);
    const revenue = await prisma.payment.aggregate({ where: { status: 'SUCCESS' }, _sum: { amount: true } });
    return successResponse(res, { users, predictions, fixtures, payments, posts, activeSubs, revenue: revenue._sum.amount || 0 });
  } catch (e) { next(e); }
});

router.get('/users', async (req, res, next) => {
  try {
    const { page, limit } = getPaginationParams(req.query);
    const skip = (page - 1) * limit;
    const where: any = {};
    if (req.query.search) {
      where.OR = [
        { username: { contains: req.query.search as string, mode: 'insensitive' } },
        { email: { contains: req.query.search as string, mode: 'insensitive' } },
      ];
    }
    const [users, total] = await Promise.all([
      prisma.user.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' }, include: { wallet: true } }),
      prisma.user.count({ where })
    ]);
    return successResponse(res, users.map(u => { const { passwordHash, ...safe } = u; return safe; }), 'Users', { page, limit, total });
  } catch (e) { next(e); }
});

router.patch('/users/:id/suspend', async (req, res, next) => {
  try {
    const { reason } = req.body;
    const user = await prisma.user.update({ where: { id: req.params.id }, data: { isSuspended: true, suspensionReason: reason } });
    await prisma.auditLog.create({ data: { userId: (req as any).user.id, action: 'SUSPEND_USER', entity: 'User', entityId: user.id, newData: { reason } } });
    return successResponse(res, user, 'User suspended');
  } catch (e) { next(e); }
});

router.patch('/users/:id/restore', async (req, res, next) => {
  try {
    const user = await prisma.user.update({ where: { id: req.params.id }, data: { isSuspended: false, suspensionReason: null } });
    return successResponse(res, user, 'User restored');
  } catch (e) { next(e); }
});

router.get('/sports/leagues', async (req, res, next) => {
  try {
    const leagues = await prisma.league.findMany({ include: { sport: true }, orderBy: { priority: 'desc' } });
    return successResponse(res, leagues);
  } catch (e) { next(e); }
});

router.patch('/sports/leagues/:id', async (req, res, next) => {
  try {
    const { isActive, isFeatured, isPredictionEnabled, priority } = req.body;
    const league = await prisma.league.update({ where: { id: req.params.id }, data: { isActive, isFeatured, isPredictionEnabled, priority } });
    return successResponse(res, league, 'League updated');
  } catch (e) { next(e); }
});

router.get('/ai/providers', async (req, res, next) => {
  try {
    const providers = await prisma.aIProvider.findMany({ orderBy: { priority: 'asc' } });
    return successResponse(res, providers);
  } catch (e) { next(e); }
});

router.patch('/ai/providers/:id', async (req, res, next) => {
  try {
    const provider = await prisma.aIProvider.update({ where: { id: req.params.id }, data: req.body });
    return successResponse(res, provider, 'Provider updated');
  } catch (e) { next(e); }
});

router.get('/finance/transactions', async (req, res, next) => {
  try {
    const { page, limit } = getPaginationParams(req.query);
    const skip = (page - 1) * limit;
    const [transactions, total] = await Promise.all([
      prisma.payment.findMany({ orderBy: { createdAt: 'desc' }, skip, take: limit, include: { user: { select: { username: true } } } }),
      prisma.payment.count()
    ]);
    return successResponse(res, transactions, 'Transactions', { page, limit, total });
  } catch (e) { next(e); }
});

router.get('/feature-flags', async (req, res, next) => {
  try {
    const flags = await prisma.featureFlag.findMany();
    return successResponse(res, flags);
  } catch (e) { next(e); }
});

router.patch('/feature-flags/:key', async (req, res, next) => {
  try {
    const flag = await prisma.featureFlag.upsert({
      where: { key: req.params.key },
      create: { key: req.params.key, name: req.params.key, isEnabled: req.body.isEnabled, config: req.body.config },
      update: { isEnabled: req.body.isEnabled, config: req.body.config }
    });
    return successResponse(res, flag, 'Feature flag updated');
  } catch (e) { next(e); }
});

router.get('/audit-logs', async (req, res, next) => {
  try {
    const { page, limit } = getPaginationParams(req.query);
    const skip = (page - 1) * limit;
    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.auditLog.count()
    ]);
    return successResponse(res, logs, 'Audit logs', { page, limit, total });
  } catch (e) { next(e); }
});

export default router;
