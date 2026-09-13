import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { prisma } from '../../config/database';
import { successResponse, errorResponse } from '../../utils/response';
import { getPaginationParams } from '../../utils/helpers';

const router = Router();

router.get('/feed', async (req, res, next) => {
  try {
    const { page, limit } = getPaginationParams(req.query);
    const skip = (page - 1) * limit;
    const where: any = { isPublic: true, isHidden: false };
    if (req.query.type) where.type = req.query.type;

    const [posts, total] = await Promise.all([
      prisma.communityPost.findMany({ where, include: { user: { select: { username: true, avatar: true } }, _count: { select: { comments: true, likes: true } } }, orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.communityPost.count({ where })
    ]);

    return successResponse(res, posts, 'Feed', { page, limit, total });
  } catch (e) { next(e); }
});

router.get('/posts/:id', async (req, res, next) => {
  try {
    const post = await prisma.communityPost.findUnique({ where: { id: req.params.id }, include: { user: { select: { username: true, avatar: true } }, comments: { include: { user: { select: { username: true } } }, orderBy: { createdAt: 'desc' } } } });
    if (!post) return errorResponse(res, 'Post not found', 404);
    return successResponse(res, post);
  } catch (e) { next(e); }
});

router.use(authenticate);

router.post('/posts', async (req, res, next) => {
  try {
    const { content, type, metadata } = req.body;
    const post = await prisma.communityPost.create({ data: { userId: (req as any).user.id, content, type: type || 'general', metadata } });
    return successResponse(res, post, 'Post created', undefined, 201);
  } catch (e) { next(e); }
});

router.post('/posts/:id/like', async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = (req as any).user.id;
    const existing = await prisma.like.findUnique({ where: { userId_postId: { userId, postId } } });
    if (existing) {
      await prisma.like.delete({ where: { id: existing.id } });
      await prisma.communityPost.update({ where: { id: postId }, data: { likesCount: { decrement: 1 } } });
      return successResponse(res, null, 'Unliked');
    } else {
      await prisma.like.create({ data: { userId, postId } });
      await prisma.communityPost.update({ where: { id: postId }, data: { likesCount: { increment: 1 } } });
      return successResponse(res, null, 'Liked');
    }
  } catch (e) { next(e); }
});

router.post('/posts/:id/comments', async (req, res, next) => {
  try {
    const comment = await prisma.comment.create({ data: { postId: req.params.id, userId: (req as any).user.id, content: req.body.content } });
    await prisma.communityPost.update({ where: { id: req.params.id }, data: { commentsCount: { increment: 1 } } });
    return successResponse(res, comment, 'Comment added', undefined, 201);
  } catch (e) { next(e); }
});

router.post('/follow/:userId', async (req, res, next) => {
  try {
    const followerId = (req as any).user.id;
    const followingId = req.params.userId;
    if (followerId === followingId) return errorResponse(res, 'Cannot follow yourself', 400);
    const existing = await prisma.follow.findUnique({ where: { followerId_followingId: { followerId, followingId } } });
    if (existing) {
      await prisma.follow.delete({ where: { id: existing.id } });
      return successResponse(res, null, 'Unfollowed');
    } else {
      await prisma.follow.create({ data: { followerId, followingId } });
      return successResponse(res, null, 'Followed');
    }
  } catch (e) { next(e); }
});

router.get('/analysts', async (req, res, next) => {
  try {
    const analysts = await prisma.analystProfile.findMany({ where: { isVerified: true }, include: { user: { select: { username: true, avatar: true } } }, orderBy: { accuracy: 'desc' }, take: 50 });
    return successResponse(res, analysts);
  } catch (e) { next(e); }
});

router.get('/analysts/leaderboard', async (req, res, next) => {
  try {
    const leaderboard = await prisma.analystProfile.findMany({ orderBy: [{ accuracy: 'desc' }, { totalPredictions: 'desc' }], include: { user: { select: { username: true, avatar: true } } }, take: 100 });
    return successResponse(res, leaderboard);
  } catch (e) { next(e); }
});

export default router;
