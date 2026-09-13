import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { paymentService } from './payment.service';
import { successResponse, errorResponse } from '../../utils/response';
import { paymentLimiter } from '../../middleware/rateLimiter';

const router = Router();

// Webhooks - no auth, but signature verification
router.post('/webhook/paystack', async (req, res, next) => {
  try {
    const signature = req.headers['x-paystack-signature'] as string;
    await paymentService.handleWebhook('PAYSTACK', req.body, signature);
    return res.status(200).json({ success: true });
  } catch (e: any) {
    return res.status(400).json({ success: false, message: e.message });
  }
});

router.post('/webhook/flutterwave', async (req, res, next) => {
  try {
    const signature = req.headers['verif-hash'] as string || req.headers['x-flutterwave-signature'] as string;
    await paymentService.handleWebhook('FLUTTERWAVE', req.body, signature);
    return res.status(200).json({ success: true });
  } catch (e: any) {
    return res.status(400).json({ success: false, message: e.message });
  }
});

router.use(authenticate);

router.post('/initialize', paymentLimiter, async (req, res, next) => {
  try {
    const { amount, provider, type, email } = req.body;
    const result = await paymentService.initializePayment((req as any).user.id, { amount, provider, type, email });
    return successResponse(res, result, 'Payment initialized');
  } catch (e: any) { return errorResponse(res, e.message, 400); }
});

router.get('/verify/:reference', async (req, res, next) => {
  try {
    const result = await paymentService.verifyPayment(req.params.reference);
    return successResponse(res, result, 'Payment verified');
  } catch (e: any) { return errorResponse(res, e.message, 400); }
});

export default router;
