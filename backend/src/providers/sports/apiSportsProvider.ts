import axios from 'axios';
import { BaseSportsProvider, SportsProviderConfig } from './base';
import { logger } from '../../utils/logger';

export class ApiSportsProvider extends BaseSportsProvider {
  name = 'api-sports';
  private client: any;
  private config: SportsProviderConfig;

  constructor(config: SportsProviderConfig) {
    super();
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout || 10000,
      headers: {
        'x-apisports-key': config.apiKey,
        'x-rapidapi-key': config.apiKey,
      }
    });
  }

  async getLeagues(params: any = {}): Promise<any[]> {
    try {
      if (!this.config.apiKey) {
        logger.warn('Sports API key not configured, returning empty leagues');
        return [];
      }
      // Real implementation would call provider API
      // For cPanel compatibility, we gracefully handle missing keys
      const response = await this.client.get('/leagues', { params });
      return response.data?.response || [];
    } catch (error: any) {
      logger.error('Failed to fetch leagues:', error.message);
      return [];
    }
  }

  async getTeams(leagueId?: string, params: any = {}): Promise<any[]> {
    try {
      if (!this.config.apiKey) return [];
      const response = await this.client.get('/teams', { 
        params: { league: leagueId, ...params } 
      });
      return response.data?.response || [];
    } catch (error: any) {
      logger.error('Failed to fetch teams:', error.message);
      return [];
    }
  }

  async getFixtures(params: any): Promise<any[]> {
    try {
      if (!this.config.apiKey) return [];
      const response = await this.client.get('/fixtures', { params });
      return response.data?.response || [];
    } catch (error: any) {
      logger.error('Failed to fetch fixtures:', error.message);
      return [];
    }
  }

  async getOdds(fixtureId: string): Promise<any[]> {
    try {
      if (!this.config.apiKey) return [];
      const response = await this.client.get('/odds', { params: { fixture: fixtureId } });
      return response.data?.response || [];
    } catch (error: any) {
      logger.error('Failed to fetch odds:', error.message);
      return [];
    }
  }

  async getStandings(leagueId: string, season?: string): Promise<any[]> {
    try {
      if (!this.config.apiKey) return [];
      const response = await this.client.get('/standings', { 
        params: { league: leagueId, season } 
      });
      return response.data?.response || [];
    } catch (error: any) {
      logger.error('Failed to fetch standings:', error.message);
      return [];
    }
  }

  async getPlayers(teamId: string): Promise<any[]> {
    try {
      if (!this.config.apiKey) return [];
      const response = await this.client.get('/players', { params: { team: teamId } });
      return response.data?.response || [];
    } catch (error: any) {
      logger.error('Failed to fetch players:', error.message);
      return [];
    }
  }
}

export class BasketballApiProvider extends ApiSportsProvider {
  name = 'basketball-api-sports';
  // Basketball-specific overrides can go here
}
