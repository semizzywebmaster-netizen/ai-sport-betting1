import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function BetCodesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Bet Codes • Secure & Shareable</h1>
      <p className="text-muted-foreground mb-6">Create, import, lookup, merge, share, expiry where appropriate. Secure generation, server-verified.</p>
      <Card><CardHeader><CardTitle>Lookup Bet Code</CardTitle></CardHeader><CardContent className="flex gap-2"><Input placeholder="Enter code e.g. PP-A1B2C3D4" className="flex-1" /><Button variant="brand">Lookup</Button></CardContent></Card>
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <Card><CardContent className="pt-6"><div className="font-mono font-bold">PP-A1B2C3D4</div><div className="text-sm text-muted-foreground">3 selections • 7.38 odds • Balanced</div><Button size="sm" variant="outline" className="w-full mt-3">View Slip</Button></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="font-mono font-bold">PP-X9Y8Z7W6</div><div className="text-sm text-muted-foreground">5 selections • 12.5 odds • Aggressive</div><Button size="sm" variant="outline" className="w-full mt-3">View Slip</Button></CardContent></Card>
      </div>
    </div>
  )
}
