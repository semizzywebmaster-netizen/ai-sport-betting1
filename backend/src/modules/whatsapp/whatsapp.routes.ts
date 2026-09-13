import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { whatsappService } from './whatsapp.service';
import { successResponse, errorResponse } from '../../utils/response';
import { config } from '../../config/env';

const router = Router();

// Webhook verification - GET
router.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === config.whatsapp.verifyToken) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// Webhook incoming - POST
router.post('/webhook', async (req, res, next) => {
  try {
    await whatsappService.handleIncomingWebhook(req.body);
    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(200).json({ success: true }); // Always 200 for WhatsApp
  }
});

router.use(authenticate);

router.post('/link', async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const result = await whatsappService.linkAccount((req as any).user.id, phoneNumber);
    return successResponse(res, result, 'OTP sent to WhatsApp');
  } catch (e: any) { return errorResponse(res, e.message, 400); }
});

router.post('/verify', async (req, res, next) => {
  try {
    const { code } = req.body;
    const account = await whatsappService.verifyLink((req as any).user.id, code);
    return successResponse(res, account, 'WhatsApp linked successfully');
  } catch (e: any) { return errorResponse(res, e.message, 400); }
});

router.delete('/unlink', async (req, res, next) => {
  try {
    const account = await whatsappService.unlinkAccount((req as any).user.id);
    return successResponse(res, account, 'WhatsApp unlinked');
  } catch (e) { next(e); }
});

router.get('/account', async (req, res, next) => {
  try {
    const { prisma } = await import('../../config/database');
    const account = await prisma.whatsAppAccount.findUnique({ where: { userId: (req as any).user.id } });
    return successResponse(res, account);
  } catch (e) { next(e); }
});

export default router;
