import { BaseAIProvider } from './base';
import { OpenAIProvider, AnthropicProvider, GroqProvider } from './openaiProvider';
import { config } from '../../config/env';
import { prisma } from '../../config/database';
import { logger } from '../../utils/logger';

export class AIManager {
  private providers: BaseAIProvider[] = [];

  constructor() {
    this.initializeProviders();
  }

  private initializeProviders() {
    if (config.ai.primaryKey) {
      switch (config.ai.primaryProvider) {
        case 'openai':
          this.providers.push(new OpenAIProvider(config.ai.primaryKey));
          break;
        case 'anthropic':
          this.providers.push(new AnthropicProvider(config.ai.primaryKey));
          break;
        case 'groq':
          this.providers.push(new GroqProvider(config.ai.primaryKey));
          break;
      }
    }

    if (config.ai.secondaryKey) {
      switch (config.ai.secondaryProvider) {
        case 'openai':
          this.providers.push(new OpenAIProvider(config.ai.secondaryKey));
          break;
        case 'anthropic':
          this.providers.push(new AnthropicProvider(config.ai.secondaryKey));
          break;
        case 'groq':
          this.providers.push(new GroqProvider(config.ai.secondaryKey));
          break;
      }
    }

    if (config.ai.backupKey) {
      switch (config.ai.backupProvider) {
        case 'openai':
          this.providers.push(new OpenAIProvider(config.ai.backupKey));
          break;
        case 'anthropic':
          this.providers.push(new AnthropicProvider(config.ai.backupKey));
          break;
        case 'groq':
          this.providers.push(new GroqProvider(config.ai.backupKey));
          break;
      }
    }

    if (this.providers.length === 0) {
      logger.warn('No AI providers configured - AI features will be disabled');
    }
  }

  async getActiveProvidersFromDB() {
    try {
      const dbProviders = await prisma.aIProvider.findMany({
        where: { isActive: true },
        orderBy: { priority: 'asc' }
      });
      return dbProviders;
    } catch (error) {
      logger.error('Failed to fetch AI providers from DB:', error);
      return [];
    }
  }

  async generatePredictionWithFallback(input: any) {
    const errors: any[] = [];

    for (const provider of this.providers) {
      if (!provider.isConfigured()) continue;

      try {
        const start = Date.now();
        const result = await provider.generatePrediction(input);
        const duration = Date.now() - start;

        try {
          const dbProvider = await prisma.aIProvider.findFirst({ where: { slug: provider.name } });
          if (dbProvider) {
            await prisma.aIUsage.create({
              data: {
                aiProviderId: dbProvider.id,
                type: 'prediction',
                tokensUsed: 500,
                durationMs: duration,
                success: true,
                requestData: input as any,
                responseData: result as any,
              }
            });
          }
        } catch (e) {
          // ignore logging errors
        }

        return { provider: provider.name, result };
      } catch (error: any) {
        errors.push({ provider: provider.name, error: error.message });
        logger.warn(`AI provider ${provider.name} failed: ${error.message}`);
        continue;
      }
    }

    throw new Error(`All AI providers failed: ${JSON.stringify(errors)}`);
  }

  async generateAnalysisWithFallback(data: any) {
    for (const provider of this.providers) {
      if (!provider.isConfigured()) continue;
      try {
        return await provider.generateAnalysis(data);
      } catch (e) {
        continue;
      }
    }
    throw new Error('No AI provider available for analysis');
  }

  async generateBetBuilderWithFallback(data: any) {
    for (const provider of this.providers) {
      if (!provider.isConfigured()) continue;
      try {
        return await provider.generateBetBuilderAssistance(data);
      } catch (e) {
        continue;
      }
    }
    throw new Error('No AI provider available for bet builder');
  }
}

export const aiManager = new AIManager();
