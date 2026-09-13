export default function FAQ() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">FAQ</h1>
      <div className="space-y-4">
        <div className="p-4 border rounded-xl"><h4 className="font-semibold">Are predictions guaranteed?</h4><p className="text-sm text-muted-foreground">No. All predictions are analytical estimates, not guarantees. We never claim 100% sure or guaranteed wins. 18+ Responsible betting.</p></div>
        <div className="p-4 border rounded-xl"><h4 className="font-semibold">Football vs Basketball?</h4><p className="text-sm text-muted-foreground">Equal first-class treatment. Both have full data depth, AI, markets, bet builder.</p></div>
        <div className="p-4 border rounded-xl"><h4 className="font-semibold">cPanel compatible?</h4><p className="text-sm text-muted-foreground">Yes. No Docker/Redis/RabbitMQ required. Uses process.env.PORT, npm install/build/start, cron via cPanel.</p></div>
      </div>
    </div>
  )
}
