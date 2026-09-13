export interface AIPredictionInput {
  fixture: any;
  homeTeam: any;
  awayTeam: any;
  league: any;
  h2h?: any[];
  form?: any;
  odds?: any[];
  injuries?: any[];
  statistics?: any;
  market: string;
}

export interface AIPredictionOutput {
  selection: string;
  confidence: number; // 0-100
  risk: 'LOW' | 'MEDIUM' | 'HIGH';
  reasoning: string;
  supportingFactors: Array<{ factor: string; impact: string }>;
  warningFactors: Array<{ factor: string; impact: string }>;
}

export abstract class BaseAIProvider {
  abstract name: string;
  abstract model: string;
  abstract isConfigured(): boolean;
  abstract generatePrediction(input: AIPredictionInput): Promise<AIPredictionOutput>;
  abstract generateAnalysis(data: any): Promise<string>;
  abstract generateBetBuilderAssistance(data: any): Promise<any>;
}
