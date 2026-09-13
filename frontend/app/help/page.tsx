export default function HelpPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Help Center</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-2xl"><h3 className="font-bold">Getting Started</h3><p className="text-sm text-muted-foreground mt-2">Register with email/phone/username, verify OTP, get 5 free credits. Nigerian numbers +234 supported.</p></div>
        <div className="p-6 border rounded-2xl"><h3 className="font-bold">Predictions</h3><p className="text-sm text-muted-foreground mt-2">AI confidence %, risk levels, reasoning, supporting/warning factors. Analytical estimates, not guarantees. 18+.</p></div>
        <div className="p-6 border rounded-2xl"><h3 className="font-bold">Bet Builder</h3><p className="text-sm text-muted-foreground mt-2">Add selections, choose strategy Conservative/Balanced/Aggressive, target odds 2-100, generate secure bet codes.</p></div>
        <div className="p-6 border rounded-2xl"><h3 className="font-bold">Wallet</h3><p className="text-sm text-muted-foreground mt-2">Cash (NGN) and Credits separated. Paystack & Flutterwave, server-verified, idempotency protected.</p></div>
        <div className="p-6 border rounded-2xl"><h3 className="font-bold">WhatsApp Bot</h3><p className="text-sm text-muted-foreground mt-2">Link account via OTP, commands: predictions, football, basketball, wallet, help. Payment links secure.</p></div>
        <div className="p-6 border rounded-2xl"><h3 className="font-bold">Responsible Betting</h3><p className="text-sm text-muted-foreground mt-2">18+ only, never bet more than you can afford, no guaranteed wins, analytical estimates only.</p></div>
      </div>
    </div>
  )
}
