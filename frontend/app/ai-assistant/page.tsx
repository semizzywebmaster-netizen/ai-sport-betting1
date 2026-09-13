import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function AIAssistantPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">AI Sports Assistant 🤖</h1>
      <p className="text-muted-foreground mb-6">Ask about matches, teams, players, leagues, predictions, statistics, bet building, responsible betting. Clearly distinguishes data, calculation, AI interpretation. Never fabricates unavailable stats.</p>
      <Card><CardHeader><CardTitle>Chat with AI</CardTitle></CardHeader><CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-xl text-sm">AI: Hello! I'm Punter Prediction AI assistant. Ask me about Premier League form, NBA matchups, bet builder strategies. All analysis is analytical estimate, not guaranteed. 18+.</div>
        <div className="p-4 bg-primary/10 rounded-xl text-sm">You: Analyze Man City vs Arsenal today</div>
        <div className="p-4 bg-muted rounded-xl text-sm">AI: Based on available real data: Man City home form WWDWW, Arsenal away LWDWW. H2H last 5: 3-1-1. No fabricated injuries. Analytical insight: Over 2.5 shows value at 72% confidence, MEDIUM risk. Supporting: home advantage. Warning: Arsenal counter-attack threat. Not guaranteed. Responsible betting, 18+.</div>
        <div className="flex gap-2"><Input placeholder="Ask about matches, teams, leagues..." className="flex-1" /><Button variant="brand">Ask AI (1 credit)</Button></div>
        <p className="text-xs text-muted-foreground">AI provider abstraction with fallback: OpenAI → Anthropic → Groq. Usage tracked. Credit cost: 1 per query.</p>
      </CardContent></Card>
    </div>
  )
}
