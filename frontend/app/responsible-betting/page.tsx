export default function ResponsibleBetting() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Responsible Betting • 18+</h1>
      <div className="space-y-6 text-sm leading-relaxed">
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
          <p className="font-bold text-amber-900">Our predictions are analytical estimates, NOT guarantees. There is no such thing as a guaranteed win or 100% sure prediction.</p>
        </div>
        <ul className="list-disc pl-6 space-y-2">
          <li>Only bet if you are 18 or older</li>
          <li>Never bet more than you can afford to lose</li>
          <li>Set deposit limits and stick to them</li>
          <li>Take breaks, don't chase losses</li>
          <li>Balance betting with other activities</li>
          <li>Seek help if betting affects your life</li>
        </ul>
        <p>Platform language: We use terms like "AI confidence", "analytical estimate", "statistical insight", "prediction analysis", "not guaranteed" - never "guaranteed win" or "risk-free profit".</p>
      </div>
    </div>
  )
}
