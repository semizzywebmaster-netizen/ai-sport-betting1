import { Router } from 'express';
import { prisma } from '../../config/database';
import { successResponse } from '../../utils/response';
import { authenticate } from '../../middleware/auth';
import { getPaginationParams } from '../../utils/helpers';

const router = Router();

router.get('/leaderboards/xp', async (req, res, next) => {
  try {
    const leaders = await prisma.user.findMany({ orderBy: { xp: 'desc' }, take: 50, select: { id: true, username: true, avatar: true, xp: true, level: true } });
    return successResponse(res, leaders);
  } catch (e) { next(e); }
});

router.get('/leaderboards/predictions', async (req, res, next) => {
  try {
    const leaders = await prisma.analystProfile.findMany({ orderBy: { accuracy: 'desc' }, take: 50, include: { user: { select: { username: true, avatar: true } } } });
    return successResponse(res, leaders);
  } catch (e) { next(e); }
});

router.get('/badges', async (req, res, next) => {
  try {
    const badges = await prisma.badge.findMany();
    return successResponse(res, badges);
  } catch (e) { next(e); }
});

router.use(authenticate);

router.get('/my-badges', async (req, res, next) => {
  try {
    const badges = await prisma.userBadge.findMany({ where: { userId: (req as any).user.id }, include: { badge: true } });
    return successResponse(res, badges);
  } catch (e) { next(e); }
});

router.get('/challenges', async (req, res, next) => {
  try {
    const challenges = await prisma.challenge.findMany({ where: { isActive: true } });
    const userChallenges = await prisma.userChallenge.findMany({ where: { userId: (req as any).user.id }, include: { challenge: true } });
    return successResponse(res, { challenges, userChallenges });
  } catch (e) { next(e); }
});

router.post('/challenges/:id/progress', async (req, res, next) => {
  try {
    const { progress } = req.body;
    const challenge = await prisma.userChallenge.upsert({
      where: { userId_challengeId: { userId: (req as any).user.id, challengeId: req.params.id } },
      create: { userId: (req as any).user.id, challengeId: req.params.id, progress },
      update: { progress: { increment: progress } }
    });

    const challengeDef = await prisma.challenge.findUnique({ where: { id: req.params.id } });
    if (challengeDef && challenge.progress >= challengeDef.target && !challenge.isCompleted) {
      await prisma.userChallenge.update({ where: { id: challenge.id }, data: { isCompleted: true, completedAt: new Date() } });
      await prisma.user.update({ where: { id: (req as any).user.id }, data: { xp: { increment: challengeDef.rewardXP } } });
      if (challengeDef.rewardCredits > 0) {
        await prisma.creditBalance.upsert({
          where: { userId: (req as any).user.id },
          create: { userId: (req as any).user.id, credits: challengeDef.rewardCredits, totalEarned: challengeDef.rewardCredits },
          update: { credits: { increment: challengeDef.rewardCredits }, totalEarned: { increment: challengeDef.rewardCredits } }
        });
      }
    }

    return successResponse(res, challenge);
  } catch (e) { next(e); }
});

export default router;
