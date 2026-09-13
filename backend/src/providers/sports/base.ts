export abstract class BaseSportsProvider {
  abstract name: string;
  abstract getLeagues(params?: any): Promise<any[]>;
  abstract getTeams(leagueId?: string, params?: any): Promise<any[]>;
  abstract getFixtures(params: any): Promise<any[]>;
  abstract getOdds(fixtureId: string): Promise<any[]>;
  abstract getStandings(leagueId: string, season?: string): Promise<any[]>;
  abstract getPlayers(teamId: string): Promise<any[]>;
}

export interface SportsProviderConfig {
  apiKey: string;
  baseUrl: string;
  timeout?: number;
}
