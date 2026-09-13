import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function PredictionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">AI Predictions</h1>
      <p className="text-muted-foreground mb-6">All predictions include confidence %, risk level, reasoning, supporting & warning factors. Transparency: wins, losses, void all stored. Never hide losing predictions.</p>
      <div className="flex gap-2 mb-6 flex-wrap"><Badge variant="sport">All Sports</Badge><Badge variant="outline">⚽ Football</Badge><Badge variant="outline">🏀 Basketball</Badge><Badge variant="outline">Today</Badge><Badge variant="outline">High Confidence</Badge></div>
      <div className="grid md:grid-cols-2 gap-4">
        {[1,2,3,4,5,6].map(i => (
          <Card key={i} className="card-hover">
            <CardContent className="pt-6">
              <div className="flex justify-between"><span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">⚽ Football • Premier League</span><span className="text-xs text-muted-foreground">2 hours ago</span></div>
              <div className="font-bold mt-2">Man City vs Arsenal</div>
              <div className="mt-2 p-3 bg-muted/50 rounded-xl">
                <div className="flex justify-between items-center"><span className="font-semibold">Over 2.5 Goals @ 1.85</span><Badge variant="success">72% Confidence</Badge></div>
                <div className="text-sm mt-2">Reasoning: Both teams average 2.8 goals, strong attacking form, defensive injuries noted. Analytical estimate, not guarantee.</div>
                <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                  <div><strong>Supporting:</strong> Home advantage, recent form</div>
                  <div><strong>Warning:</strong> Key midfielder doubt</div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-3"><Badge variant="warning">MEDIUM Risk</Badge><Button size="sm" variant="brand">Add to Bet Builder</Button></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
