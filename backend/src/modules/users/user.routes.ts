import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { prisma } from '../../config/database';
import { successResponse, errorResponse } from '../../utils/response';

const router = Router();

router.use(authenticate);

router.get('/profile', async (req: any, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { profile: true, wallet: true, creditBalance: true, analystProfile: true }
    });
    if (!user) return errorResponse(res, 'User not found', 404);
    const { passwordHash, ...safe } = user;
    return successResponse(res, safe);
  } catch (e) { next(e); }
});

router.put('/profile', async (req: any, res, next) => {
  try {
    const { firstName, lastName, bio, avatar, favoriteTeams, favoriteLeagues } = req.body;
    await prisma.user.update({
      where: { id: req.user.id },
      data: { bio, avatar }
    });
    const profile = await prisma.userProfile.upsert({
      where: { userId: req.user.id },
      create: { userId: req.user.id, firstName, lastName, favoriteTeams, favoriteLeagues },
      update: { firstName, lastName, favoriteTeams, favoriteLeagues }
    });
    return successResponse(res, profile, 'Profile updated');
  } catch (e) { next(e); }
});

router.get('/stats', async (req: any, res, next) => {
  try {
    const userId = req.user.id;
    const [predictions, betSlips, followers, following] = await Promise.all([
      prisma.prediction.count({ where: { userId } }),
      prisma.betSlip.count({ where: { userId } }),
      prisma.follow.count({ where: { followingId: userId } }),
      prisma.follow.count({ where: { followerId: userId } }),
    ]);
    return successResponse(res, { predictions, betSlips, followers, following });
  } catch (e) { next(e); }
});

export default router;
