import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center text-white font-bold">P</div>
              <span className="font-bold text-lg">PUNTER PREDICTION</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">AI-powered sports intelligence for football and basketball. Analytical estimates, not guarantees. 18+ only. Bet responsibly.</p>
            <div className="flex gap-2 text-xs">
              <span className="px-2 py-1 rounded bg-green-100 text-green-800">⚽ Football</span>
              <span className="px-2 py-1 rounded bg-orange-100 text-orange-800">🏀 Basketball</span>
              <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">🤖 AI Powered</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Sports</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/football">Football Predictions</Link></li>
              <li><Link href="/basketball">Basketball Predictions</Link></li>
              <li><Link href="/leagues">Leagues</Link></li>
              <li><Link href="/odds">Live Odds</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Tools</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/bet-builder">Bet Builder</Link></li>
              <li><Link href="/bet-codes">Bet Codes</Link></li>
              <li><Link href="/ai-assistant">AI Assistant</Link></li>
              <li><Link href="/analytics">Analytics</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/how-it-works">How It Works</Link></li>
              <li><Link href="/responsible-betting">Responsible Betting</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 Punter Prediction. All rights reserved. 18+ | Analytical estimates only, not guaranteed outcomes.</p>
          <div className="flex items-center gap-4">
            <span>🇳🇬 NGN • Africa/Lagos</span>
            <span>🔒 Secure & Responsible</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
