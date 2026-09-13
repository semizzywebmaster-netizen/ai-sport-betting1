export default function HowItWorks() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">How It Works</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-2xl"><h3 className="font-bold">1. Sports Data</h3><p className="text-sm text-muted-foreground mt-2">Real provider data via adapters, never fake odds. Football & basketball equal treatment.</p></div>
        <div className="p-6 border rounded-2xl"><h3 className="font-bold">2. AI Analysis</h3><p className="text-sm text-muted-foreground mt-2">Multi-provider AI with fallback, confidence %, risk levels, reasoning, factors.</p></div>
        <div className="p-6 border rounded-2xl"><h3 className="font-bold">3. Bet Builder</h3><p className="text-sm text-muted-foreground mt-2">Build slips, target odds 2-100, generate secure bet codes, share via WhatsApp.</p></div>
      </div>
    </div>
  )
}
