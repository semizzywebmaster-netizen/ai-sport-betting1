import { Request } from 'express';

export interface AuthUser {
  id: string;
  email?: string | null;
  phone?: string | null;
  username: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface SportsProvider {
  name: string;
  getFixtures(params: any): Promise<any[]>;
  getTeams(params: any): Promise<any[]>;
  getLeagues(params: any): Promise<any[]>;
  getOdds(fixtureId: string): Promise<any[]>;
  getStandings(leagueId: string): Promise<any[]>;
}

export interface AIProviderInterface {
  name: string;
  generatePrediction(data: any): Promise<any>;
  generateAnalysis(data: any): Promise<any>;
  generateBetBuilderAssistance(data: any): Promise<any>;
}

export interface PaymentProviderInterface {
  name: string;
  initializePayment(data: any): Promise<any>;
  verifyPayment(reference: string): Promise<any>;
  handleWebhook(payload: any, signature: string): Promise<any>;
}

export interface NotificationProviderInterface {
  name: string;
  send(data: any): Promise<boolean>;
}

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type PredictionStatus = 'PENDING' | 'WON' | 'LOST' | 'VOID' | 'CANCELLED';
