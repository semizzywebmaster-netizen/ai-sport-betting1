import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function WalletPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Wallet • Separate Cash & Credits</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-green-200"><CardHeader><CardTitle className="flex justify-between"><span>Cash Wallet (NGN)</span><Badge variant="success">NGN</Badge></CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">₦12,500</div><p className="text-sm text-muted-foreground">Deposits via Paystack & Flutterwave • Server-verified • Idempotency protected</p><div className="flex gap-2 mt-4"><Button variant="brand" className="flex-1">Deposit</Button><Button variant="outline" className="flex-1">Withdraw</Button></div></CardContent></Card>
        <Card className="border-blue-200"><CardHeader><CardTitle className="flex justify-between"><span>AI Credits</span><Badge>Credits</Badge></CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">42 credits</div><p className="text-sm text-muted-foreground">For predictions, AI analysis, bet builder • Never mixed with cash</p><div className="flex gap-2 mt-4"><Button className="flex-1 bg-blue-600 hover:bg-blue-700">Buy Credits</Button><Button variant="outline" className="flex-1">History</Button></div></CardContent></Card>
      </div>
      <Card className="mt-6"><CardHeader><CardTitle>Recent Transactions • Immutable Ledger</CardTitle></CardHeader><CardContent className="space-y-2">{[1,2,3,4].map(i => <div key={i} className="flex justify-between p-3 border rounded-xl text-sm"><span>Deposit via Paystack • TX-ABC123 • Success</span><span className="font-bold text-green-600">+₦5,000</span></div>)}</CardContent></Card>
    </div>
  )
}
