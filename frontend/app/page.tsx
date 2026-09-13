import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 text-white">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/20">⚽ Football</Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/20">🏀 Basketball</Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/20">🤖 AI Powered</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                AI-Powered <br />
                <span className="text-green-200">Sports Intelligence</span> for Smart Punters
              </h1>
              <p className="text-lg text-green-50/90 max-w-xl">
                Professional predictions for football and basketball with equal first-class treatment. Analytical estimates, not guarantees. Built for Nigerian punters. 18+ Responsible betting.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/predictions"><Button size="lg" variant="secondary" className="bg-white text-green-700 hover:bg-green-50">View Predictions 🎯</Button></Link>
                <Link href="/bet-builder"><Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">Bet Builder 🧩</Button></Link>
              </div>
              <div className="flex items-center gap-6 pt-4 text-sm">
                <div><div className="text-2xl font-bold">50K+</div><div className="text-green-200">Predictions</div></div>
                <div><div className="text-2xl font-bold">85%</div><div className="text-green-200">Transparency</div></div>
                <div><div className="text-2xl font-bold">24/7</div><div className="text-green-200">AI Analysis</div></div>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-white/10 backdrop-blur border-white/20 text-white">
                  <CardHeader className="pb-2"><CardTitle className="text-sm text-green-100">Today's Top Pick</CardTitle></CardHeader>
                  <CardContent>
                    <div className="text-sm">Man City vs Arsenal</div>
                    <div className="font-bold">Over 2.5 Goals</div>
                    <div className="flex items-center gap-2 mt-2"><Badge className="bg-green-400 text-green-900">72% Confidence</Badge><span className="text-xs">MEDIUM Risk</span></div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur border-white/20 text-white mt-8">
                  <CardHeader className="pb-2"><CardTitle className="text-sm text-orange-100">NBA Tonight</CardTitle></CardHeader>
                  <CardContent>
                    <div className="text-sm">Lakers vs Warriors</div>
                    <div className="font-bold">Lakers -3.5 Spread</div>
                    <div className="flex items-center gap-2 mt-2"><Badge className="bg-orange-400 text-orange-900">68% Confidence</Badge><span className="text-xs">LOW Risk</span></div>
                  </CardContent>
                </Card>
                <Card className="bg-white text-green-900 col-span-2">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div><div className="font-bold">Bet Builder • Balanced</div><div className="text-sm text-muted-foreground">5 selections • Target 10.0 odds</div></div>
                      <div className="text-right"><div className="text-2xl font-bold text-green-600">₦25k</div><div className="text-xs">Potential win</div></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Football & Basketball Equal Treatment */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Football & Basketball — Equal First-Class Treatment</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">No afterthoughts. Both sports get full data depth, AI analysis, predictions, and bet builder support.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white card-hover">
              <CardHeader>
                <div className="flex items-center gap-3"><div className="h-12 w-12 rounded-xl bg-green-600 flex items-center justify-center text-white text-xl">⚽</div><div><CardTitle>Football Intelligence</CardTitle><p className="text-sm text-muted-foreground">Premier League, La Liga, Champions League & 50+ leagues</p></div></div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 rounded-lg bg-white border">✓ 1X2, Over/Under, BTTS</div>
                  <div className="p-2 rounded-lg bg-white border">✓ Asian Handicap, Corners</div>
                  <div className="p-2 rounded-lg bg-white border">✓ Live odds movement</div>
                  <div className="p-2 rounded-lg bg-white border">✓ Form, H2H, injuries</div>
                </div>
                <Link href="/football"><Button variant="brand" className="w-full">Explore Football</Button></Link>
              </CardContent>
            </Card>
            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white card-hover">
              <CardHeader>
                <div className="flex items-center gap-3"><div className="h-12 w-12 rounded-xl bg-orange-600 flex items-center justify-center text-white text-xl">🏀</div><div><CardTitle>Basketball Intelligence</CardTitle><p className="text-sm text-muted-foreground">NBA, EuroLeague, WNBA, NCAA & more</p></div></div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 rounded-lg bg-white border">✓ Moneyline, Spread</div>
                  <div className="p-2 rounded-lg bg-white border">✓ Over/Under, Quarters</div>
                  <div className="p-2 rounded-lg bg-white border">✓ Player props</div>
                  <div className="p-2 rounded-lg bg-white border">✓ Team totals, Halves</div>
                </div>
                <Link href="/basketball"><Button className="w-full bg-orange-600 hover:bg-orange-700">Explore Basketball</Button></Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI & Bet Builder */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card><CardHeader><CardTitle className="flex items-center gap-2">🤖 AI Predictions</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Multi-provider AI with fallback, confidence scoring, risk levels. Never guaranteed, always analytical.</CardContent></Card>
            <Card><CardHeader><CardTitle className="flex items-center gap-2">🧩 Smart Bet Builder</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Conservative, Balanced, Aggressive strategies. Target odds 2-100. Merge, convert, optimize bet codes.</CardContent></Card>
            <Card><CardHeader><CardTitle className="flex items-center gap-2">💬 WhatsApp Bot</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Get predictions, check wallet, manage subscriptions via WhatsApp Business API. Nigerian numbers supported.</CardContent></Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Simple Pricing in ₦ Naira</h2>
          <p className="text-muted-foreground mb-8">Paystack & Flutterwave supported. Wallet + Credits separated.</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card><CardHeader><CardTitle>Free</CardTitle><div className="text-3xl font-bold">₦0</div></CardHeader><CardContent><ul className="text-sm space-y-2 text-left"><li>✓ 5 daily predictions</li><li>✓ Basic stats</li><li>✓ Community access</li></ul><Button variant="outline" className="w-full mt-4">Get Started</Button></CardContent></Card>
            <Card className="border-primary shadow-lg scale-105"><CardHeader><Badge variant="sport" className="w-fit">Popular</Badge><CardTitle>Pro</CardTitle><div className="text-3xl font-bold">₦2,500<span className="text-sm font-normal">/month</span></div></CardHeader><CardContent><ul className="text-sm space-y-2 text-left"><li>✓ Unlimited predictions</li><li>✓ AI analysis</li><li>✓ Bet builder pro</li><li>✓ WhatsApp alerts</li></ul><Button variant="brand" className="w-full mt-4">Go Pro</Button></CardContent></Card>
            <Card><CardHeader><CardTitle>Elite</CardTitle><div className="text-3xl font-bold">₦7,500<span className="text-sm font-normal">/month</span></div></CardHeader><CardContent><ul className="text-sm space-y-2 text-left"><li>✓ Everything in Pro</li><li>✓ Analyst access</li><li>✓ Early predictions</li><li>✓ Priority support</li></ul><Button variant="outline" className="w-full mt-4">Go Elite</Button></CardContent></Card>
          </div>
        </div>
      </section>

      {/* Responsible */}
      <section className="py-8 bg-amber-50 border-y border-amber-200">
        <div className="container mx-auto px-4 text-center text-sm">
          <p className="font-semibold text-amber-900">🔞 18+ Only | Responsible Betting</p>
          <p className="text-amber-800 max-w-3xl mx-auto mt-2">Punter Prediction provides analytical estimates and statistical insights, not guaranteed outcomes. No prediction is 100% sure. Betting involves risk. Never bet more than you can afford to lose. If you need help, contact responsible gambling support. Predictions are for informational purposes only.</p>
        </div>
      </section>
    </div>
  )
}
