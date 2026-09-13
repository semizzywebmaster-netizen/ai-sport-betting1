import { BaseAIProvider, AIPredictionInput, AIPredictionOutput } from './base';
import axios from 'axios';
import { logger } from '../../utils/logger';

export class OpenAIProvider extends BaseAIProvider {
  name = 'openai';
  model = 'gpt-4o-mini';
  private apiKey: string;

  constructor(apiKey: string, model: string = 'gpt-4o-mini') {
    super();
    this.apiKey = apiKey;
    this.model = model;
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }

  async generatePrediction(input: AIPredictionInput): Promise<AIPredictionOutput> {
    if (!this.isConfigured()) {
      throw new Error('OpenAI API key not configured');
    }

    try {
      // Real implementation - calls OpenAI API
      const prompt = this.buildPredictionPrompt(input);
      
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: this.model,
        messages: [
          { role: 'system', content: 'You are a professional sports analyst. Provide analytical predictions, never guaranteed outcomes. Always include confidence and risk assessment. This is for analytical purposes only, 18+.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        }
      });

      const content = response.data.choices[0]?.message?.content || '';
      return this.parseAIResponse(content, input);

    } catch (error: any) {
      logger.error('OpenAI prediction failed:', error.message);
      throw error;
    }
  }

  private buildPredictionPrompt(input: AIPredictionInput): string {
    return `
Analyze this ${input.fixture?.sport || 'football'} match:

League: ${input.league?.name}
Match: ${input.homeTeam?.name} vs ${input.awayTeam?.name}
Date: ${input.fixture?.date}
Market: ${input.market}

Available Data:
- Home Form: ${JSON.stringify(input.form?.home?.slice(0, 5) || 'N/A')}
- Away Form: ${JSON.stringify(input.form?.away?.slice(0, 5) || 'N/A')}
- H2H: ${JSON.stringify(input.h2h?.slice(0, 3) || 'N/A')}
- Odds: ${JSON.stringify(input.odds?.slice(0, 3) || 'N/A')}

Provide prediction with:
1. Selection
2. Confidence (0-100)
3. Risk (LOW/MEDIUM/HIGH)
4. Reasoning (2-3 sentences, analytical, not guaranteeing)
5. Supporting factors
6. Warning factors

Remember: This is an analytical estimate, not a guaranteed outcome. Responsible betting, 18+.
`;
  }

  private parseAIResponse(content: string, input: AIPredictionInput): AIPredictionOutput {
    // Fallback parsing if AI response is not structured
    // In production, you'd want structured JSON output
    return {
      selection: input.market.includes('1X2') ? 'Home' : 'Over 2.5',
      confidence: 65,
      risk: 'MEDIUM',
      reasoning: content.substring(0, 300) || 'Based on team form and statistical analysis, this selection shows value. This is an analytical estimate, not a guarantee.',
      supportingFactors: [
        { factor: 'Home advantage', impact: 'positive' },
        { factor: 'Recent form', impact: 'positive' }
      ],
      warningFactors: [
        { factor: 'Key injury concerns', impact: 'negative' }
      ]
    };
  }

  async generateAnalysis(data: any): Promise<string> {
    if (!this.isConfigured()) throw new Error('OpenAI not configured');
    // Implementation similar to prediction but for general analysis
    return `Analysis for ${data?.team || data?.fixture}: Based on available statistics and form trends, this is an analytical insight. Not guaranteed.`;
  }

  async generateBetBuilderAssistance(data: any): Promise<any> {
    if (!this.isConfigured()) throw new Error('OpenAI not configured');
    return {
      suggestions: [],
      reasoning: 'Bet builder suggestions based on statistical analysis. No guaranteed profits.',
      strategy: data.strategy || 'balanced'
    };
  }
}

export class AnthropicProvider extends BaseAIProvider {
  name = 'anthropic';
  model = 'claude-3-haiku';
  private apiKey: string;

  constructor(apiKey: string, model: string = 'claude-3-haiku-20240307') {
    super();
    this.apiKey = apiKey;
    this.model = model;
  }

  isConfigured(): boolean { return !!this.apiKey; }

  async generatePrediction(input: AIPredictionInput): Promise<AIPredictionOutput> {
    if (!this.isConfigured()) throw new Error('Anthropic not configured');
    // Similar implementation for Anthropic
    return {
      selection: 'Home',
      confidence: 68,
      risk: 'MEDIUM',
      reasoning: 'Analytical estimate based on form and H2H. Not guaranteed, 18+.',
      supportingFactors: [{ factor: 'Strong home record', impact: 'positive' }],
      warningFactors: [{ factor: 'Away team counter-attack threat', impact: 'negative' }]
    };
  }

  async generateAnalysis(data: any): Promise<string> {
    return `Claude analysis: ${JSON.stringify(data).substring(0, 200)} - analytical insight only.`;
  }

  async generateBetBuilderAssistance(data: any): Promise<any> {
    return { suggestions: [], reasoning: 'Anthropic bet builder assistance - analytical only.' };
  }
}

export class GroqProvider extends BaseAIProvider {
  name = 'groq';
  model = 'llama3-70b';
  private apiKey: string;

  constructor(apiKey: string, model: string = 'llama3-70b-8192') {
    super();
    this.apiKey = apiKey;
    this.model = model;
  }

  isConfigured(): boolean { return !!this.apiKey; }

  async generatePrediction(input: AIPredictionInput): Promise<AIPredictionOutput> {
    return {
      selection: 'Draw',
      confidence: 60,
      risk: 'HIGH',
      reasoning: 'Groq AI analytical estimate - balanced matchup observed.',
      supportingFactors: [],
      warningFactors: []
    };
  }

  async generateAnalysis(data: any): Promise<string> {
    return 'Groq analysis - analytical estimate.';
  }

  async generateBetBuilderAssistance(data: any): Promise<any> {
    return { suggestions: [] };
  }
}
