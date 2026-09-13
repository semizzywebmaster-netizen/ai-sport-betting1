import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function BasketballPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-12 w-12 rounded-xl bg-orange-600 flex items-center justify-center text-white text-2xl">🏀</div>
        <div><h1 className="text-3xl font-bold">Basketball Predictions</h1><p className="text-muted-foreground">NBA, EuroLeague, WNBA, NCAA • Equal first-class treatment • No afterthought</p></div>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-orange-200"><CardHeader><CardTitle>NBA Tonight</CardTitle></CardHeader><CardContent className="space-y-3">{[1,2,3].map(i => <div key={i} className="p-3 border rounded-xl"><div className="font-medium">Lakers vs Warriors</div><div className="flex gap-2 mt-2"><Badge>Lakers -3.5</Badge><Badge variant="outline">68% Conf</Badge></div><div className="text-xs text-muted-foreground mt-1">Analytical estimate, not guaranteed. 18+</div></div>)}</CardContent></Card>
        <Card><CardHeader><CardTitle>EuroLeague</CardTitle></CardHeader><CardContent className="space-y-3">{[1,2].map(i => <div key={i} className="p-3 border rounded-xl"><div className="font-medium">Real Madrid vs Barcelona</div><div className="flex gap-2 mt-2"><Badge variant="secondary">Over 165.5</Badge><Badge variant="outline">65% Conf</Badge></div></div>)}</CardContent></Card>
        <Card><CardHeader><CardTitle>Markets</CardTitle></CardHeader><CardContent className="text-sm space-y-2"><div>✓ Moneyline</div><div>✓ Point Spread</div><div>✓ Over/Under</div><div>✓ Team Totals</div><div>✓ Quarter Markets</div><div>✓ Half Markets</div><div>✓ Player Props (where reliable)</div><Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">View All Predictions</Button></CardContent></Card>
      </div>
    </div>
  )
}
