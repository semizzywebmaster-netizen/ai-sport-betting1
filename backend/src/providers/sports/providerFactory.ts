import { BaseSportsProvider } from './base';
import { ApiSportsProvider, BasketballApiProvider } from './apiSportsProvider';
import { config } from '../../config/env';

export class SportsProviderFactory {
  private static providers: Map<string, BaseSportsProvider> = new Map();

  static getProvider(sport: 'football' | 'basketball' = 'football'): BaseSportsProvider {
    const key = `${sport}-${config.sportsApi.provider}`;
    
    if (this.providers.has(key)) {
      return this.providers.get(key)!;
    }

    let provider: BaseSportsProvider;

    switch (config.sportsApi.provider) {
      case 'basketball':
      case 'api-sports-basketball':
        provider = new BasketballApiProvider({
          apiKey: config.sportsApi.key,
          baseUrl: config.sportsApi.baseUrl,
        });
        break;
      default:
        provider = new ApiSportsProvider({
          apiKey: config.sportsApi.key,
          baseUrl: config.sportsApi.baseUrl,
        });
    }

    this.providers.set(key, provider);
    return provider;
  }

  static getFootballProvider(): BaseSportsProvider {
    return this.getProvider('football');
  }

  static getBasketballProvider(): BaseSportsProvider {
    return this.getProvider('basketball');
  }
}
