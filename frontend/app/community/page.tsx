import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function CommunityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Community Feed</h1>
      <p className="text-muted-foreground mb-6">Posts, prediction posts, bet slip posts, discussions • Likes, comments, follows, shares • Analyst profiles & leaderboard</p>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {[1,2,3].map(i => (
            <Card key={i}><CardContent className="pt-6"><div className="flex gap-3"><div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-600 to-orange-500 flex items-center justify-center text-white font-bold">A{i}</div><div className="flex-1"><div className="flex items-center gap-2"><span className="font-semibold">Analyst_{i}</span><Badge className="bg-green-100 text-green-800">Verified</Badge><span className="text-xs text-muted-foreground">2h ago</span></div><p className="mt-2 text-sm">My prediction for tonight: Man City Over 2.5 with 72% confidence. Based on xG data and form. Not guaranteed! Full analysis inside.</p><div className="mt-3 p-3 bg-muted/50 rounded-xl text-sm"><div>Bet Slip - 3 selections - 7.38 odds - PP-A1B2C3D4</div></div><div className="flex gap-4 mt-3 text-sm text-muted-foreground"><span>24 likes</span><span>5 comments</span><span>Share</span></div></div></div></CardContent></Card>
          ))}
        </div>
        <div className="space-y-4">
          <Card><CardHeader><CardTitle className="text-sm">Analyst Leaderboard</CardTitle></CardHeader><CardContent className="space-y-2">{[1,2,3,4,5].map(i => <div key={i} className="flex justify-between items-center text-sm p-2 hover:bg-muted rounded"><span>#{i} Analyst_{i}</span><Badge variant="outline">{85 - i*2}% Acc</Badge></div>)}</CardContent></Card>
          <Card><CardHeader><CardTitle className="text-sm">XP Leaderboard</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><div>Streaks, Badges, Challenges active</div><Button size="sm" variant="outline" className="w-full mt-2">View Leaderboards</Button></CardContent></Card>
        </div>
      </div>
    </div>
  )
}
