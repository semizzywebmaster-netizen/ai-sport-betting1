import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { notificationService } from './notification.service';
import { successResponse } from '../../utils/response';
import { getPaginationParams } from '../../utils/helpers';

const router = Router();
router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const { page, limit } = getPaginationParams(req.query);
    const unreadOnly = req.query.unread === 'true';
    const result = await notificationService.getUserNotifications((req as any).user.id, page, limit, unreadOnly);
    return successResponse(res, result.notifications, 'Notifications', { page, limit, total: result.total, unreadCount: result.unreadCount });
  } catch (e) { next(e); }
});

router.patch('/:id/read', async (req, res, next) => {
  try {
    await notificationService.markAsRead(req.params.id, (req as any).user.id);
    return successResponse(res, null, 'Marked as read');
  } catch (e) { next(e); }
});

router.patch('/read-all', async (req, res, next) => {
  try {
    await notificationService.markAllAsRead((req as any).user.id);
    return successResponse(res, null, 'All marked as read');
  } catch (e) { next(e); }
});

export default router;
