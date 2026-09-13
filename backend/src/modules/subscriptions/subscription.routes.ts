import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { subscriptionService } from './subscription.service';
import { successResponse, errorResponse } from '../../utils/response';

const router = Router();

router.get('/plans', async (req, res, next) => {
  try {
    const plans = await subscriptionService.getPlans();
    return successResponse(res, plans);
  } catch (e) { next(e); }
});

router.get('/plans/:slug', async (req, res, next) => {
  try {
    const plan = await subscriptionService.getPlanBySlug(req.params.slug);
    if (!plan) return errorResponse(res, 'Plan not found', 404);
    return successResponse(res, plan);
  } catch (e) { next(e); }
});

router.use(authenticate);

router.get('/', async (req, res, next) => {
  try {
    const subs = await subscriptionService.getUserSubscriptions((req as any).user.id);
    return successResponse(res, subs);
  } catch (e) { next(e); }
});

router.get('/active', async (req, res, next) => {
  try {
    const sub = await subscriptionService.getActiveSubscription((req as any).user.id);
    return successResponse(res, sub);
  } catch (e) { next(e); }
});

router.post('/subscribe', async (req, res, next) => {
  try {
    const { planId, paymentId } = req.body;
    const sub = await subscriptionService.subscribe((req as any).user.id, planId, paymentId);
    return successResponse(res, sub, 'Subscribed successfully', undefined, 201);
  } catch (e: any) { return errorResponse(res, e.message, 400); }
});

router.post('/:id/cancel', async (req, res, next) => {
  try {
    const sub = await subscriptionService.cancelSubscription(req.params.id, (req as any).user.id);
    return successResponse(res, sub, 'Subscription cancelled');
  } catch (e: any) { return errorResponse(res, e.message, 400); }
});

export default router;
