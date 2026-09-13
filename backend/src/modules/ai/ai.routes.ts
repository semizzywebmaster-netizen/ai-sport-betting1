import { Router } from 'express';
import { authenticate } from '../../middleware/auth';
import { successResponse, errorResponse } from '../../utils/response';
import { aiManager } from '../../providers/ai/aiManager';
import { prisma } from '../../config/database';
import { walletService } from '../wallet/wallet.service';

const router = Router();
router.use(authenticate);

router.post('/assistant', async (req, res, next) => {
  try {
    const userId = (req as any).user.id;
    const { question, context } = req.body;

    // Check credits
    const credits = await walletService.getCreditBalance(userId);
    if (credits.credits < 1) return errorResponse(res, 'Insufficient credits. Please purchase credits.', 402);

    const analysis = await aiManager.generateAnalysisWithFallback({ question, context, userId });

    await walletService.spendCredits(userId, 1, 'AI assistant query');

    await prisma.aIUsage.create({
      data: {
        aiProviderId: (await prisma.aIProvider.findFirst())?.id || 'unknown',
        userId,
        type: 'assistant',
        tokensUsed: 200,
        success: true,
        requestData: { question },
        responseData: { analysis }
      }
    });

    return successResponse(res, { answer: analysis, disclaimer: 'This is an AI analytical estimate based on available data, not guaranteed. 18+ Responsible betting.' });
  } catch (e: any) { return errorResponse(res, e.message, 500); }
});

router.post('/team-analysis', async (req, res, next) => {
  try {
    const { teamId } = req.body;
    const team = await prisma.team.findUnique({ where: { id: teamId }, include: { homeFixtures: { take: 5, orderBy: { date: 'desc' } } } });
    if (!team) return errorResponse(res, 'Team not found', 404);

    const analysis = await aiManager.generateAnalysisWithFallback({ team, type: 'team_intelligence' });

    return successResponse(res, { team, analysis, note: 'Clearly distinguishing: data = real statistics, calculation = derived metrics, AI interpretation = analytical insight. No fabricated unavailable stats.' });
  } catch (e: any) { return errorResponse(res, e.message, 500); }
});

router.post('/bet-builder-assist', async (req, res, next) => {
  try {
    const { strategy, targetOdds, sport, fixtures } = req.body;
    const result = await aiManager.generateBetBuilderWithFallback({ strategy, targetOdds, sport, fixtures });

    return successResponse(res, { ...result, disclaimer: 'AI bet builder suggestions are analytical, not guaranteed profits. 18+ Bet responsibly.' });
  } catch (e: any) { return errorResponse(res, e.message, 500); }
});

router.get('/providers', async (req, res, next) => {
  try {
    const providers = await prisma.aIProvider.findMany({ orderBy: { priority: 'asc' } });
    return successResponse(res, providers);
  } catch (e) { next(e); }
});

export default router;
