import { prisma } from '../../config/database';
import { aiManager } from '../../providers/ai/aiManager';
import { logger } from '../../utils/logger';

export class PredictionService {
  async getPredictions(params: { sport?: string; leagueId?: string; fixtureId?: string; market?: string; status?: string; isPremium?: boolean; page?: number; limit?: number }) {
    const where: any = {};
    if (params.sport) where.sport = params.sport;
    if (params.leagueId) where.leagueId = params.leagueId;
    if (params.fixtureId) where.fixtureId = params.fixtureId;
    if (params.market) where.market = params.market;
    if (params.status) where.status = params.status as any;
    if (params.isPremium !== undefined) where.isPremium = params.isPremium;

    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const [predictions, total] = await Promise.all([
      prisma.prediction.findMany({
        where,
        include: {
          fixture: { include: { homeTeam: true, awayTeam: true, league: true } },
          league: true,
          aiProvider: true,
          factors: true
        },
        orderBy: { createdAt: 'desc' },
        skip, take: limit
      }),
      prisma.prediction.count({ where })
    ]);

    return { predictions, total, page, limit };
  }

  async getPredictionById(id: string) {
    return prisma.prediction.findUnique({
      where: { id },
      include: {
        fixture: { include: { homeTeam: true, awayTeam: true, league: { include: { sport: true } }, odds: true } },
        league: true,
        aiProvider: true,
        factors: true,
        betSelections: true
      }
    });
  }

  async createPrediction(data: any) {
    // Validate odds exist - never invent odds
    if (data.fixtureId) {
      const fixture = await prisma.fixture.findUnique({ where: { id: data.fixtureId } });
      if (!fixture) throw new Error('Fixture not found');
    }

    // If AI provider configured, generate AI analysis
    let aiResult = null;
    if (data.useAI) {
      try {
        const fixture = data.fixtureId ? await prisma.fixture.findUnique({
          where: { id: data.fixtureId },
          include: { homeTeam: true, awayTeam: true, league: true }
        }) : null;

        const aiInput = {
          fixture,
          homeTeam: fixture?.homeTeam,
          awayTeam: fixture?.awayTeam,
          league: fixture?.league,
          market: data.market,
          odds: data.odds,
          form: data.formData,
          h2h: data.h2hData
        };

        const result = await aiManager.generatePredictionWithFallback(aiInput);
        aiResult = result.result;
      } catch (error: any) {
        logger.warn('AI prediction failed, using manual data:', error.message);
      }
    }

    const prediction = await prisma.prediction.create({
      data: {
        fixtureId: data.fixtureId,
        leagueId: data.leagueId,
        sport: data.sport || 'football',
        market: data.market,
        marketKey: data.marketKey || data.market.toLowerCase().replace(/\s+/g, '_'),
        selection: aiResult?.selection || data.selection,
        selectionKey: data.selectionKey || (aiResult?.selection || data.selection).toLowerCase(),
        odds: data.odds,
        confidence: aiResult?.confidence || data.confidence || 65,
        risk: aiResult?.risk || data.risk || 'MEDIUM',
        reasoning: aiResult?.reasoning || data.reasoning || 'Analytical estimate based on available statistics. Not guaranteed.',
        supportingFactors: aiResult?.supportingFactors || data.supportingFactors || [],
        warningFactors: aiResult?.warningFactors || data.warningFactors || [],
        statistics: data.statistics,
        formData: data.formData,
        h2hData: data.h2hData,
        isPremium: data.isPremium || false,
        creditsCost: data.isPremium ? 2 : 0,
        aiProviderId: data.aiProviderId,
      }
    });

    // Create factors
    if (data.factors?.length) {
      for (const factor of data.factors) {
        await prisma.predictionFactor.create({
          data: {
            predictionId: prediction.id,
            type: factor.type,
            description: factor.description,
            impact: factor.impact,
            weight: factor.weight || 1,
            data: factor.data
          }
        });
      }
    }

    return prediction;
  }

  async settlePrediction(predictionId: string, status: 'WON' | 'LOST' | 'VOID', actualScore?: string) {
    const prediction = await prisma.prediction.update({
      where: { id: predictionId },
      data: { status: status as any }
    });

    await prisma.predictionResult.upsert({
      where: { predictionId },
      create: { predictionId, status: status as any, actualScore },
      update: { status: status as any, actualScore }
    });

    return prediction;
  }

  async getAccuracyStats(params: { sport?: string; leagueId?: string; days?: number; aiProviderId?: string }) {
    const where: any = {};
    if (params.sport) where.sport = params.sport;
    if (params.leagueId) where.leagueId = params.leagueId;
    if (params.aiProviderId) where.aiProviderId = params.aiProviderId;
    if (params.days) {
      where.createdAt = { gte: new Date(Date.now() - params.days * 24 * 60 * 60 * 1000) };
    }

    const [total, won, lost, pending] = await Promise.all([
      prisma.prediction.count({ where }),
      prisma.prediction.count({ where: { ...where, status: 'WON' } }),
      prisma.prediction.count({ where: { ...where, status: 'LOST' } }),
      prisma.prediction.count({ where: { ...where, status: 'PENDING' } }),
    ]);

    const accuracy = total > 0 ? (won / (won + lost || 1)) * 100 : 0;

    return { total, won, lost, pending, accuracy: Math.round(accuracy * 100) / 100 };
  }
}

export const predictionService = new PredictionService();
