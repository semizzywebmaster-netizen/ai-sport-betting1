import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { betBuilderService } from './betBuilder.service';
import { successResponse, errorResponse } from '../../utils/response';
import { getPaginationParams } from '../../utils/helpers';

const router = Router();

router.get('/lookup/:code', async (req, res, next) => {
  try {
    const result = await betBuilderService.lookupBetCode(req.params.code);
    if (!result) return errorResponse(res, 'Bet code not found', 404);
    return successResponse(res, result);
  } catch (e) { next(e); }
});

router.use(authenticate);

router.post('/', async (req, res, next) => {
  try {
    const slip = await betBuilderService.createBetSlip((req as any).user.id, req.body);
    return successResponse(res, slip, 'Bet slip created', undefined, 201);
  } catch (e: any) { return errorResponse(res, e.message, 400); }
});

router.get('/', async (req, res, next) => {
  try {
    const { page, limit } = getPaginationParams(req.query);
    const result = await betBuilderService.getUserBetSlips((req as any).user.id, page, limit);
    return successResponse(res, result.slips, 'Bet slips', { page, limit, total: result.total });
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const slip = await betBuilderService.getBetSlip(req.params.id);
    if (!slip) return errorResponse(res, 'Not found', 404);
    return successResponse(res, slip);
  } catch (e) { next(e); }
});

router.post('/:id/code', async (req, res, next) => {
  try {
    const code = await betBuilderService.generateBetCode(req.params.id, (req as any).user.id);
    return successResponse(res, code, 'Bet code generated');
  } catch (e: any) { return errorResponse(res, e.message, 400); }
});

router.post('/optimize', async (req, res, next) => {
  try {
    const { selections, targetOdds, strategy } = req.body;
    const result = await betBuilderService.optimizeBetSlip(selections, targetOdds || 10, strategy || 'balanced');
    return successResponse(res, result);
  } catch (e) { next(e); }
});

router.post('/merge', async (req, res, next) => {
  try {
    const { codes } = req.body;
    const result = await betBuilderService.mergeBetCodes(codes, (req as any).user.id);
    return successResponse(res, result, 'Bet slips merged');
  } catch (e: any) { return errorResponse(res, e.message, 400); }
});

export default router;
