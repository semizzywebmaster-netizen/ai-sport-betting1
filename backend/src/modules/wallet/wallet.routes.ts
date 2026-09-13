import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { walletService } from './wallet.service';
import { successResponse } from '../../utils/response';
import { getPaginationParams } from '../../utils/helpers';

const router = Router();
router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const [wallet, credits] = await Promise.all([
      walletService.getWallet((req as any).user.id),
      walletService.getCreditBalance((req as any).user.id)
    ]);
    return successResponse(res, { wallet, credits });
  } catch (e) { next(e); }
});

router.get('/transactions', async (req, res, next) => {
  try {
    const { page, limit } = getPaginationParams(req.query);
    const result = await walletService.getTransactions((req as any).user.id, page, limit);
    return successResponse(res, result.transactions, 'Transactions', { page, limit, total: result.total });
  } catch (e) { next(e); }
});

router.get('/credits', async (req, res, next) => {
  try {
    const credits = await walletService.getCreditBalance((req as any).user.id);
    return successResponse(res, credits);
  } catch (e) { next(e); }
});

export default router;
