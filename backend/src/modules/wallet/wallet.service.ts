import { prisma } from '../../config/database';
import { generateRandomToken } from '../../utils/helpers';

export class WalletService {
  async getWallet(userId: string) {
    let wallet = await prisma.wallet.findUnique({ where: { userId } });
    if (!wallet) {
      wallet = await prisma.wallet.create({ data: { userId, cashBalance: 0 } });
    }
    return wallet;
  }

  async getCreditBalance(userId: string) {
    let credits = await prisma.creditBalance.findUnique({ where: { userId } });
    if (!credits) {
      credits = await prisma.creditBalance.create({ data: { userId, credits: 0 } });
    }
    return credits;
  }

  async getTransactions(userId: string, page = 1, limit = 20) {
    const wallet = await this.getWallet(userId);
    const skip = (page - 1) * limit;
    const [transactions, total] = await Promise.all([
      prisma.walletTransaction.findMany({ where: { walletId: wallet.id }, orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.walletTransaction.count({ where: { walletId: wallet.id } })
    ]);
    return { transactions, total, page, limit };
  }

  async creditWallet(userId: string, amount: number, type: any, description?: string, metadata?: any) {
    const wallet = await this.getWallet(userId);
    const reference = `TX-${generateRandomToken(8).toUpperCase()}`;

    const transaction = await prisma.walletTransaction.create({
      data: {
        walletId: wallet.id,
        userId,
        type,
        amount,
        balanceBefore: wallet.cashBalance,
        balanceAfter: wallet.cashBalance + amount,
        reference,
        description,
        metadata,
        status: 'COMPLETED'
      }
    });

    const updated = await prisma.wallet.update({
      where: { id: wallet.id },
      data: { cashBalance: { increment: amount }, totalDeposited: type === 'DEPOSIT' ? { increment: amount } : undefined }
    });

    return { transaction, wallet: updated };
  }

  async debitWallet(userId: string, amount: number, type: any, description?: string) {
    const wallet = await this.getWallet(userId);
    if (wallet.cashBalance < amount) throw new Error('Insufficient balance');

    const reference = `TX-${generateRandomToken(8).toUpperCase()}`;

    const transaction = await prisma.walletTransaction.create({
      data: {
        walletId: wallet.id,
        userId,
        type,
        amount: -amount,
        balanceBefore: wallet.cashBalance,
        balanceAfter: wallet.cashBalance - amount,
        reference,
        description,
        status: 'COMPLETED'
      }
    });

    const updated = await prisma.wallet.update({
      where: { id: wallet.id },
      data: { cashBalance: { decrement: amount } }
    });

    return { transaction, wallet: updated };
  }

  async addCredits(userId: string, amount: number, reason: string) {
    const balance = await this.getCreditBalance(userId);
    const updated = await prisma.creditBalance.update({
      where: { userId },
      data: { credits: { increment: amount }, totalEarned: { increment: amount } }
    });

    // Log XP
    await prisma.xPTransaction.create({
      data: { userId, amount: 0, type: 'bonus', reason: `Credits added: ${reason}` }
    });

    return updated;
  }

  async spendCredits(userId: string, amount: number, reason: string) {
    const balance = await this.getCreditBalance(userId);
    if (balance.credits < amount) throw new Error('Insufficient credits');

    const updated = await prisma.creditBalance.update({
      where: { userId },
      data: { credits: { decrement: amount }, totalSpent: { increment: amount } }
    });

    return updated;
  }
}

export const walletService = new WalletService();
