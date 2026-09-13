import { prisma } from '../../config/database';
import { logger } from '../../utils/logger';

export class ReferralService {
  async getReferralStats(userId: string) {
    const [total, converted, pending, rewards] = await Promise.all([
      prisma.referral.count({ where: { referrerId: userId } }),
      prisma.referral.count({ where: { referrerId: userId, status: 'CONVERTED' } }),
      prisma.referral.count({ where: { referrerId: userId, status: 'PENDING' } }),
      prisma.referralReward.findMany({ where: { userId } })
    ]);

    const user = await prisma.user.findUnique({ where: { id: userId }, select: { referralCode: true } });

    return { total, converted, pending, rewards, referralCode: user?.referralCode, referralLink: `https://punterprediction.com/register?ref=${user?.referralCode}` };
  }

  async getReferrals(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [referrals, total] = await Promise.all([
      prisma.referral.findMany({ where: { referrerId: userId }, include: { referee: { select: { username: true, createdAt: true } } }, orderBy: { createdAt: 'desc' }, skip, take: limit }),
      prisma.referral.count({ where: { referrerId: userId } })
    ]);
    return { referrals, total, page, limit };
  }

  async detectFraud(referrerId: string, refereeId: string, ip?: string, deviceId?: string) {
    // Check self-referral
    if (referrerId === refereeId) return { isFraud: true, reason: 'Self referral' };

    // Check duplicate IP with many referrals
    if (ip) {
      const recentIpCount = await prisma.referral.count({
        where: { referrerId, ipAddress: ip, createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }
      });
      if (recentIpCount > 5) return { isFraud: true, reason: 'Too many referrals from same IP' };
    }

    // Check duplicate device
    if (deviceId) {
      const deviceCount = await prisma.referral.count({ where: { referrerId, deviceId } });
      if (deviceCount > 3) return { isFraud: true, reason: 'Abnormal device pattern' };
    }

    // Check if referee already referred
    const existing = await prisma.referral.findFirst({ where: { refereeId } });
    if (existing) return { isFraud: true, reason: 'User already referred' };

    return { isFraud: false };
  }
}

export const referralService = new ReferralService();
