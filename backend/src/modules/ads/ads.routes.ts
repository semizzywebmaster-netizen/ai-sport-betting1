import { Router } from 'express';
import { prisma } from '../../config/database';
import { successResponse, errorResponse } from '../../utils/response';
import { authenticate } from '../../middleware/auth';
import { getPaginationParams } from '../../utils/helpers';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const placement = req.query.placement as string;
    const where: any = { isActive: true };
    if (placement) where.placement = placement;
    const ads = await prisma.advertisement.findMany({ where, orderBy: [{ priority: 'desc' }, { createdAt: 'desc' }], take: 10 });
    return successResponse(res, ads);
  } catch (e) { next(e); }
});

router.post('/:id/click', async (req, res, next) => {
  try {
    await prisma.advertisement.update({ where: { id: req.params.id }, data: { clicks: { increment: 1 } } });
    return successResponse(res, null, 'Click tracked');
  } catch (e) { next(e); }
});

router.use(authenticate);

router.post('/:id/view', async (req, res, next) => {
  try {
    const userId = (req as any).user.id;
    const adId = req.params.id;
    
    // Check daily limits for rewarded ads
    const today = new Date();
    today.setHours(0,0,0,0);
    const todayViews = await prisma.rewardedAdView.count({ where: { userId, viewedAt: { gte: today } } });
    if (todayViews >= 10) return errorResponse(res, 'Daily limit reached (10 rewarded ads/day)', 429);

    // Check cooldown (5 mins between same ad)
    const recent = await prisma.rewardedAdView.findFirst({ where: { userId, advertisementId: adId, viewedAt: { gte: new Date(Date.now() - 5*60*1000) } } });
    if (recent) return errorResponse(res, 'Cooldown active, try again in 5 minutes', 429);

    const ad = await prisma.advertisement.findUnique({ where: { id: adId } });
    if (!ad) return errorResponse(res, 'Ad not found', 404);

    const rewardAmount = ad.type === 'rewarded' ? 1 : 0;

    const view = await prisma.rewardedAdView.create({
      data: {
        userId,
        advertisementId: adId,
        rewardType: 'credits',
        rewardAmount,
        isClaimed: false,
      }
    });

    await prisma.advertisement.update({ where: { id: adId }, data: { impressions: { increment: 1 } } });

    return successResponse(res, view, 'Ad view tracked');
  } catch (e) { next(e); }
});

router.post('/:id/claim', async (req, res, next) => {
  try {
    const userId = (req as any).user.id;
    const view = await prisma.rewardedAdView.findFirst({ where: { userId, advertisementId: req.params.id, isClaimed: false }, orderBy: { viewedAt: 'desc' } });
    if (!view) return errorResponse(res, 'No unclaimed reward', 404);

    // Anti-abuse: check reward ledger
    await prisma.rewardedAdView.update({ where: { id: view.id }, data: { isClaimed: true, claimedAt: new Date() } });

    if (view.rewardAmount > 0) {
      await prisma.creditBalance.upsert({
        where: { userId },
        create: { userId, credits: Math.floor(view.rewardAmount), totalEarned: Math.floor(view.rewardAmount) },
        update: { credits: { increment: Math.floor(view.rewardAmount) }, totalEarned: { increment: Math.floor(view.rewardAmount) } }
      });

      await prisma.walletTransaction.create({
        data: {
          walletId: (await prisma.wallet.findUnique({ where: { userId } }))!.id,
          userId,
          type: 'AD_REWARD',
          amount: 0,
          balanceBefore: 0,
          balanceAfter: 0,
          reference: `AD-${Date.now()}-${Math.random().toString(36).substring(2,8)}`,
          description: `Rewarded ad: ${view.rewardAmount} credits`,
          metadata: { adViewId: view.id }
        }
      });
    }

    return successResponse(res, view, 'Reward claimed');
  } catch (e) { next(e); }
});

export default router;
