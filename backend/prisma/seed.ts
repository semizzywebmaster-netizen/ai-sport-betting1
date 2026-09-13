import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Sports
  const football = await prisma.sport.upsert({
    where: { slug: 'football' },
    update: {},
    create: { name: 'Football', slug: 'football', isActive: true, isFeatured: true, icon: '⚽' }
  });

  const basketball = await prisma.sport.upsert({
    where: { slug: 'basketball' },
    update: {},
    create: { name: 'Basketball', slug: 'basketball', isActive: true, isFeatured: true, icon: '🏀' }
  });

  console.log('✅ Sports seeded');

  // Leagues - Football
  const footballLeagues = [
    { name: 'Premier League', slug: 'football-premier-league', country: 'England', priority: 100, isFeatured: true },
    { name: 'La Liga', slug: 'football-la-liga', country: 'Spain', priority: 95, isFeatured: true },
    { name: 'Serie A', slug: 'football-serie-a', country: 'Italy', priority: 90, isFeatured: true },
    { name: 'Bundesliga', slug: 'football-bundesliga', country: 'Germany', priority: 85, isFeatured: true },
    { name: 'Ligue 1', slug: 'football-ligue-1', country: 'France', priority: 80, isFeatured: true },
    { name: 'Champions League', slug: 'football-champions-league', country: 'Europe', priority: 100, isFeatured: true },
    { name: 'Europa League', slug: 'football-europa-league', country: 'Europe', priority: 75, isFeatured: false },
    { name: 'NPFL', slug: 'football-npfl', country: 'Nigeria', priority: 70, isFeatured: true },
  ];

  for (const league of footballLeagues) {
    await prisma.league.upsert({
      where: { slug: league.slug },
      update: {},
      create: { ...league, sportId: football.id, isActive: true, isPredictionEnabled: true }
    });
  }

  // Leagues - Basketball
  const basketballLeagues = [
    { name: 'NBA', slug: 'basketball-nba', country: 'USA', priority: 100, isFeatured: true },
    { name: 'EuroLeague', slug: 'basketball-euroleague', country: 'Europe', priority: 90, isFeatured: true },
    { name: 'WNBA', slug: 'basketball-wnba', country: 'USA', priority: 70, isFeatured: false },
    { name: 'NCAA Men', slug: 'basketball-ncaa-men', country: 'USA', priority: 80, isFeatured: true },
  ];

  for (const league of basketballLeagues) {
    await prisma.league.upsert({
      where: { slug: league.slug },
      update: {},
      create: { ...league, sportId: basketball.id, isActive: true, isPredictionEnabled: true }
    });
  }

  console.log('✅ Leagues seeded');

  // Subscription Plans
  const plans = [
    { name: 'Free', slug: 'free', description: 'Free tier with limited predictions', price: 0, interval: 'monthly', creditsIncluded: 5, features: { predictions: 5, ai: false, betBuilder: false } },
    { name: 'Pro', slug: 'pro', description: 'Unlimited predictions and AI analysis', price: 2500, interval: 'monthly', creditsIncluded: 100, isFeatured: true, features: { predictions: -1, ai: true, betBuilder: true, whatsapp: true } },
    { name: 'Elite', slug: 'elite', description: 'Everything plus analyst access', price: 7500, interval: 'monthly', creditsIncluded: 300, features: { predictions: -1, ai: true, betBuilder: true, analyst: true } },
  ];

  for (const plan of plans) {
    await prisma.subscriptionPlan.upsert({
      where: { slug: plan.slug },
      update: {},
      create: plan as any
    });
  }

  console.log('✅ Subscription plans seeded');

  // AI Providers
  const aiProviders = [
    { name: 'OpenAI GPT-4o Mini', slug: 'openai', provider: 'openai', model: 'gpt-4o-mini', isActive: true, isPrimary: true, priority: 1 },
    { name: 'Anthropic Claude', slug: 'anthropic', provider: 'anthropic', model: 'claude-3-haiku-20240307', isActive: true, priority: 2 },
    { name: 'Groq Llama', slug: 'groq', provider: 'groq', model: 'llama3-70b-8192', isActive: true, priority: 3 },
  ];

  for (const provider of aiProviders) {
    await prisma.aIProvider.upsert({
      where: { slug: provider.slug },
      update: {},
      create: provider
    });
  }

  console.log('✅ AI providers seeded');

  // Feature Flags
  const flags = [
    { key: 'predictions', name: 'Predictions', isEnabled: true },
    { key: 'football', name: 'Football', isEnabled: true },
    { key: 'basketball', name: 'Basketball', isEnabled: true },
    { key: 'ai', name: 'AI Features', isEnabled: true },
    { key: 'bet_builder', name: 'Bet Builder', isEnabled: true },
    { key: 'subscriptions', name: 'Subscriptions', isEnabled: true },
    { key: 'referrals', name: 'Referrals', isEnabled: true },
    { key: 'whatsapp', name: 'WhatsApp', isEnabled: true },
    { key: 'community', name: 'Community', isEnabled: true },
    { key: 'ads', name: 'Advertising', isEnabled: true },
    { key: 'gamification', name: 'Gamification', isEnabled: true },
  ];

  for (const flag of flags) {
    await prisma.featureFlag.upsert({
      where: { key: flag.key },
      update: {},
      create: flag
    });
  }

  console.log('✅ Feature flags seeded');

  // Badges
  const badges = [
    { name: 'First Prediction', slug: 'first-prediction', description: 'Viewed your first prediction', icon: '🎯' },
    { name: 'Bet Builder', slug: 'bet-builder', description: 'Created first bet slip', icon: '🧩' },
    { name: 'Community Starter', slug: 'community-starter', description: 'First community post', icon: '💬' },
    { name: 'Streak 7', slug: 'streak-7', description: '7 day login streak', icon: '🔥' },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: {},
      create: badge
    });
  }

  console.log('✅ Badges seeded');

  // Admin User
  const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin123!', 12);
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@punterprediction.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@punterprediction.com',
      username: 'admin',
      passwordHash: adminPassword,
      role: 'ADMIN',
      isEmailVerified: true,
      isActive: true,
      wallet: { create: { cashBalance: 0 } },
      creditBalance: { create: { credits: 1000 } },
      profile: { create: { firstName: 'Admin', lastName: 'User' } }
    }
  });

  console.log('✅ Admin user seeded:', admin.email);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
