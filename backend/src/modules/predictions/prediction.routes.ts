import { Router } from 'express';
import { predictionService } from './prediction.service';
import { successResponse, errorResponse } from '../../utils/response';
import { authenticate } from '../../middleware/auth';
import { getPaginationParams } from '../../utils/helpers';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const { page, limit } = getPaginationParams(req.query);
    const result = await predictionService.getPredictions({
      sport: req.query.sport as string,
      leagueId: req.query.leagueId as string,
      fixtureId: req.query.fixtureId as string,
      market: req.query.market as string,
      status: req.query.status as string,
      page, limit
    });
    return successResponse(res, result.predictions, 'Predictions fetched', { page, limit, total: result.total });
  } catch (e) { next(e); }
});

router.get('/accuracy', async (req, res, next) => {
  try {
    const stats = await predictionService.getAccuracyStats({
      sport: req.query.sport as string,
      leagueId: req.query.leagueId as string,
      days: req.query.days ? parseInt(req.query.days as string) : undefined
    });
    return successResponse(res, stats);
  } catch (e) { next(e); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const prediction = await predictionService.getPredictionById(req.params.id);
    if (!prediction) return errorResponse(res, 'Prediction not found', 404);
    return successResponse(res, prediction);
  } catch (e) { next(e); }
});

router.use(authenticate);

router.post('/', async (req, res, next) => {
  try {
    const prediction = await predictionService.createPrediction({ ...req.body, userId: (req as any).user.id });
    return successResponse(res, prediction, 'Prediction created', undefined, 201);
  } catch (e) { next(e); }
});

export default router;
