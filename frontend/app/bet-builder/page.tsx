import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function BetBuilderPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Smart Bet Builder 🧩</h1>
      <p className="text-muted-foreground mb-6">Conservative, Balanced, Aggressive strategies • Target odds 2,5,10,20,50,100,Custom • Generate, Merge, Convert, Lookup, Optimize • Secure bet codes</p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <Card><CardHeader><CardTitle className="flex justify-between"><span>Your Bet Slip (3 selections)</span><Badge variant="sport">Balanced • Target 10.0</Badge></CardTitle></CardHeader><CardContent className="space-y-3">
            <div className="p-3 border rounded-xl flex justify-between"><span>Man City vs Arsenal • Over 2.5 @ 1.85</span><Button variant="ghost" size="sm">✕</Button></div>
            <div className="p-3 border rounded-xl flex justify-between"><span>Lakers -3.5 Spread @ 1.90</span><Button variant="ghost" size="sm">✕</Button></div>
            <div className="p-3 border rounded-xl flex justify-between"><span>Barcelona Win @ 2.10</span><Button variant="ghost" size="sm">✕</Button></div>
            <div className="p-4 bg-primary/5 rounded-xl flex justify-between items-center"><div><div className="text-sm text-muted-foreground">Total Odds</div><div className="text-2xl font-bold">7.38</div></div><div className="text-right"><div className="text-sm">Potential Win (Stake ₦1000)</div><div className="text-xl font-bold text-primary">₦7,380</div></div></div>
            <div className="flex gap-2"><Button variant="brand" className="flex-1">Generate Bet Code</Button><Button variant="outline" className="flex-1">Optimize</Button></div>
            <p className="text-xs text-muted-foreground">Duplicate/conflict detection active. No guaranteed profits. 18+ Responsible betting.</p>
          </CardContent></Card>
        </div>
        <div className="space-y-4">
          <Card><CardHeader><CardTitle className="text-sm">Strategies</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><Button variant="outline" size="sm" className="w-full justify-start">🛡️ Conservative (Low risk)</Button><Button variant="brand" size="sm" className="w-full justify-start">⚖️ Balanced (Medium)</Button><Button variant="outline" size="sm" className="w-full justify-start">🔥 Aggressive (High risk)</Button></CardContent></Card>
          <Card><CardHeader><CardTitle className="text-sm">Target Odds</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2"><Badge variant="outline">2</Badge><Badge variant="outline">5</Badge><Badge variant="outline" className="bg-primary text-white">10</Badge><Badge variant="outline">20</Badge><Badge variant="outline">50</Badge><Badge variant="outline">100</Badge><Badge variant="outline">Custom</Badge></CardContent></Card>
          <Card><CardHeader><CardTitle className="text-sm">Bet Codes</CardTitle></CardHeader><CardContent className="space-y-2"><div className="p-2 bg-muted rounded text-sm font-mono">PP-A1B2C3D4</div><Button size="sm" variant="outline" className="w-full">Lookup Code</Button><Button size="sm" variant="outline" className="w-full">Merge Codes</Button></CardContent></Card>
        </div>
      </div>
    </div>
  )
}
