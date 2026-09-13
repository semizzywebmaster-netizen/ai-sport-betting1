import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function FootballPage() {
  const leagues = ['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'Champions League', 'Europa League', 'NPFL'];
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-12 w-12 rounded-xl bg-green-600 flex items-center justify-center text-white text-2xl">⚽</div>
        <div><h1 className="text-3xl font-bold">Football Predictions</h1><p className="text-muted-foreground">Premier League, La Liga, Champions League & 50+ leagues • AI confidence • Risk analysis</p></div>
      </div>
      <div className="grid md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card><CardHeader><CardTitle className="text-sm">Leagues</CardTitle></CardHeader><CardContent className="space-y-2">{leagues.map(l => <div key={l} className="flex justify-between items-center p-2 rounded-lg hover:bg-muted text-sm"><span>{l}</span><Badge variant="outline">Live</Badge></div>)}</CardContent></Card>
          <Card><CardHeader><CardTitle className="text-sm">Markets</CardTitle></CardHeader><CardContent className="text-sm space-y-1"><div>✓ 1X2</div><div>✓ Over/Under</div><div>✓ BTTS</div><div>✓ Double Chance</div><div>✓ Asian Handicap</div><div>✓ Corners, Cards</div></CardContent></Card>
        </div>
        <div className="md:col-span-3 space-y-4">
          {[1,2,3,4,5].map(i => (
            <Card key={i} className="card-hover"><CardContent className="pt-6"><div className="flex justify-between items-start"><div><div className="font-semibold">Man City vs Arsenal • Premier League</div><div className="text-sm text-muted-foreground">Today 20:00 • Etihad Stadium</div><div className="flex gap-2 mt-2"><Badge variant="success">Over 2.5 Goals</Badge><Badge variant="secondary">72% Confidence</Badge><Badge variant="warning">MEDIUM Risk</Badge></div></div><div className="text-right"><div className="font-bold text-lg">1.85</div><Button size="sm" variant="brand" className="mt-1">View Analysis</Button></div></div><p className="text-xs text-muted-foreground mt-3">Analytical estimate based on form, H2H, injuries. Not guaranteed. 18+ Responsible betting.</p></CardContent></Card>
          ))}
        </div>
      </div>
    </div>
  )
}
