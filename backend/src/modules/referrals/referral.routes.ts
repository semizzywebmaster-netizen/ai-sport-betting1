import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { referralService } from './referral.service';
import { successResponse } from '../../utils/response';
import { getPaginationParams } from '../../utils/helpers';

const router = Router();
router.use(authenticate);

router.get('/stats', async (req, res, next) => {
  try {
    const stats = await referralService.getReferralStats((req as any).user.id);
    return successResponse(res, stats);
  } catch (e) { next(e); }
});

router.get('/', async (req, res, next) => {
  try {
    const { page, limit } = getPaginationParams(req.query);
    const result = await referralService.getReferrals((req as any).user.id, page, limit);
    return successResponse(res, result.referrals, 'Referrals', { page, limit, total: result.total });
  } catch (e) { next(e); }
});

export default router;
