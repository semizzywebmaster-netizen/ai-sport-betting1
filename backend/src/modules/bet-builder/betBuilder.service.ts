import { prisma } from '../../config/database';
import { generateBetCode, calculateOdds } from '../../utils/helpers';

export class BetBuilderService {
  async createBetSlip(userId: string, data: { name?: string; selections: any[]; strategy?: string; targetOdds?: number; stake?: number }) {
    if (!data.selections?.length) throw new Error('At least one selection required');

    // Validate no duplicate fixtures with conflicting markets
    const fixtureMarkets = new Map();
    for (const sel of data.selections) {
      const key = `${sel.fixtureId}-${sel.market}`;
      if (fixtureMarkets.has(key)) throw new Error(`Duplicate selection for fixture ${sel.fixtureId} market ${sel.market}`);
      fixtureMarkets.set(key, true);
    }

    const odds = data.selections.map((s: any) => s.odds);
    const totalOdds = calculateOdds(odds);

    const betSlip = await prisma.betSlip.create({
      data: {
        userId,
        name: data.name,
        totalOdds,
        strategy: data.strategy || 'balanced',
        targetOdds: data.targetOdds,
        stake: data.stake,
        potentialWin: data.stake ? data.stake * totalOdds : undefined,
        selections: {
          create: data.selections.map((sel: any) => ({
            fixtureId: sel.fixtureId,
            predictionId: sel.predictionId,
            market: sel.market,
            selection: sel.selection,
            odds: sel.odds,
          }))
        }
      },
      include: { selections: true }
    });

    return betSlip;
  }

  async generateBetCode(betSlipId: string, userId: string) {
    const betSlip = await prisma.betSlip.findFirst({ where: { id: betSlipId, userId } });
    if (!betSlip) throw new Error('Bet slip not found');

    const code = generateBetCode();

    const betCode = await prisma.betCode.create({
      data: {
        code,
        betSlipId,
        userId,
        type: 'standard',
        isPublic: true,
      }
    });

    await prisma.betSlip.update({
      where: { id: betSlipId },
      data: { shareCode: code }
    });

    return betCode;
  }

  async getBetSlip(id: string) {
    return prisma.betSlip.findUnique({
      where: { id },
      include: { selections: { include: { prediction: true } }, user: { select: { username: true } } }
    });
  }

  async getUserBetSlips(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [slips, total] = await Promise.all([
      prisma.betSlip.findMany({ where: { userId }, include: { selections: true }, orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.betSlip.count({ where: { userId } })
    ]);
    return { slips, total, page, limit };
  }

  async lookupBetCode(code: string) {
    const betCode = await prisma.betCode.findUnique({
      where: { code },
      include: { betSlip: { include: { selections: { include: { prediction: true } } } } }
    });

    if (betCode) {
      await prisma.betCode.update({ where: { id: betCode.id }, data: { views: { increment: 1 } } });
    }

    return betCode;
  }

  async optimizeBetSlip(selections: any[], targetOdds: number, strategy: string) {
    // Simple optimization: sort by confidence and pick combinations closest to target
    const sorted = [...selections].sort((a, b) => (b.confidence || 0) - (a.confidence || 0));
    
    let currentOdds = 1;
    const optimized: any[] = [];

    for (const sel of sorted) {
      if (strategy === 'conservative' && sel.risk === 'HIGH') continue;
      if (strategy === 'aggressive' && currentOdds >= targetOdds) break;
      
      optimized.push(sel);
      currentOdds *= sel.odds;

      if (currentOdds >= targetOdds && strategy !== 'aggressive') break;
    }

    return {
      selections: optimized,
      totalOdds: calculateOdds(optimized.map(s => s.odds)),
      strategy,
      targetOdds,
      reasoning: `Optimized for ${strategy} strategy targeting ${targetOdds} odds. Selected ${optimized.length} picks based on confidence and risk. This is analytical, not guaranteed.`
    };
  }

  async mergeBetCodes(codes: string[], userId: string) {
    const betCodes = await prisma.betCode.findMany({
      where: { code: { in: codes } },
      include: { betSlip: { include: { selections: true } } }
    });

    if (betCodes.length !== codes.length) throw new Error('One or more bet codes not found');

    const allSelections: any[] = [];
    betCodes.forEach(bc => {
      if (bc.betSlip?.selections) allSelections.push(...bc.betSlip.selections);
    });

    // Remove duplicates
    const unique = Array.from(new Map(allSelections.map(s => [`${s.fixtureId}-${s.market}`, s])).values());

    return this.createBetSlip(userId, { selections: unique, strategy: 'balanced', name: `Merged ${codes.join('+')}` });
  }
}

export const betBuilderService = new BetBuilderService();
