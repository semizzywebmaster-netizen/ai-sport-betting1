import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Global Search</h1>
      <div className="flex gap-2 mb-6"><Input placeholder="Search matches, teams, players, leagues, analysts, predictions, bet codes..." className="flex-1" /><Button variant="brand">Search</Button></div>
      <div className="space-y-3">
        <Card><CardContent className="pt-4"><div className="font-medium">Search supports: matches, teams, players, leagues, analysts, predictions, bet codes</div><div className="text-sm text-muted-foreground mt-1">Type-ahead, recent searches, filters by sport (football/basketball equal treatment)</div></CardContent></Card>
      </div>
    </div>
  )
}
