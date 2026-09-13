import { prisma } from '../../config/database';

export class SubscriptionService {
  async getPlans() {
    return prisma.subscriptionPlan.findMany({ where: { isActive: true }, orderBy: { priority: 'asc' } });
  }

  async getPlanBySlug(slug: string) {
    return prisma.subscriptionPlan.findUnique({ where: { slug } });
  }

  async subscribe(userId: string, planId: string, paymentId?: string) {
    const plan = await prisma.subscriptionPlan.findUnique({ where: { id: planId } });
    if (!plan) throw new Error('Plan not found');
    if (!plan.isActive) throw new Error('Plan not active');

    const now = new Date();
    let endDate = new Date(now);
    if (plan.interval === 'weekly') endDate.setDate(now.getDate() + 7 * plan.intervalCount);
    else if (plan.interval === 'monthly') endDate.setMonth(now.getMonth() + plan.intervalCount);
    else if (plan.interval === 'yearly') endDate.setFullYear(now.getFullYear() + plan.intervalCount);
    else endDate.setMonth(now.getMonth() + 1);

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        planId,
        status: 'ACTIVE',
        startDate: now,
        endDate,
        paymentId,
      },
      include: { plan: true }
    });

    // Add credits if included
    if (plan.creditsIncluded > 0) {
      await prisma.creditBalance.upsert({
        where: { userId },
        create: { userId, credits: plan.creditsIncluded, totalEarned: plan.creditsIncluded },
        update: { credits: { increment: plan.creditsIncluded }, totalEarned: { increment: plan.creditsIncluded } }
      });
    }

    return subscription;
  }

  async getUserSubscriptions(userId: string) {
    return prisma.subscription.findMany({
      where: { userId },
      include: { plan: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getActiveSubscription(userId: string) {
    return prisma.subscription.findFirst({
      where: { userId, status: 'ACTIVE', endDate: { gt: new Date() } },
      include: { plan: true },
      orderBy: { endDate: 'desc' }
    });
  }

  async cancelSubscription(subscriptionId: string, userId: string) {
    const sub = await prisma.subscription.findFirst({ where: { id: subscriptionId, userId } });
    if (!sub) throw new Error('Subscription not found');

    return prisma.subscription.update({
      where: { id: subscriptionId },
      data: { status: 'CANCELLED', autoRenew: false }
    });
  }

  async checkExpiredSubscriptions() {
    const expired = await prisma.subscription.findMany({
      where: { status: 'ACTIVE', endDate: { lt: new Date() } }
    });

    for (const sub of expired) {
      await prisma.subscription.update({ where: { id: sub.id }, data: { status: 'EXPIRED' } });
    }

    return expired.length;
  }
}

export const subscriptionService = new SubscriptionService();
