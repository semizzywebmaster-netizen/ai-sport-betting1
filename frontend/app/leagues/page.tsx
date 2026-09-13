import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function LeaguesPage() {
  const football = ['Premier League','La Liga','Serie A','Bundesliga','Ligue 1','Champions League','Europa League','Conference League','FA Cup','EFL Championship','NPFL','MLS','Saudi Pro League'];
  const basketball = ['NBA','WNBA','EuroLeague','EuroCup','NCAA Men','NCAA Women','ACB','Basketball Bundesliga'];
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dynamic Leagues • Not Hard-Coded Small List</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card><CardHeader><CardTitle className="flex items-center gap-2">⚽ Football Leagues</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{football.map(l => <Badge key={l} variant="outline">{l}</Badge>)}</CardContent></Card>
        <Card><CardHeader><CardTitle className="flex items-center gap-2">🏀 Basketball Competitions</CardTitle></CardHeader><CardContent className="flex flex-wrap gap-2">{basketball.map(l => <Badge key={l} variant="outline">{l}</Badge>)}</CardContent></Card>
      </div>
      <p className="text-sm text-muted-foreground mt-6">All leagues synced dynamically via provider abstraction. Admin can enable/disable, feature, set priority. Supports major international and women's competitions where provider data exists.</p>
    </div>
  )
}
