# AI Integration

## Provider Abstraction
- BaseAIProvider abstract class
- Implementations: OpenAIProvider, AnthropicProvider, GroqProvider
- AIManager handles fallback: primary -> secondary -> backup
- Config via env: AI_PRIMARY_PROVIDER, AI_PRIMARY_API_KEY, etc
- Also DB configurable: AIProvider table with priority, isActive, isPrimary

## Features
- Predictions: generatePrediction with confidence, risk, reasoning, supporting/warning factors
- Analysis: team & match intelligence, clearly distinguishing real data vs AI interpretation, never fabricate unavailable stats
- Bet Builder Assistant: conservative/balanced/aggressive, target odds
- Assistant: general sports questions

## Security
- No secrets in frontend
- Usage tracking: AIUsage table logs tokens, cost, duration, success
- Credit costs: prediction view 1, AI analysis 2, bet builder 3, assistant 1
- Fallback when primary fails
- Graceful error if no provider configured

## Responsible
- Never claim guaranteed wins
- Language: analytical estimate, not guarantee, 18+
- Reasoning always includes disclaimer

## Admin Controls
- Enable/disable providers
- Priority ordering
- Cost tracking
- Performance comparison via accuracy stats
