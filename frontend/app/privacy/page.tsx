export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none text-sm text-muted-foreground space-y-4">
        <p>Last updated: 2026-09-11</p>
        <p>Punter Prediction respects your privacy. We collect email, phone, username for account purposes, with Nigerian phone formatting support.</p>
        <p>Data stored securely in PostgreSQL, passwords hashed bcrypt 12 rounds, JWT secure.</p>
        <p>No private keys exposed to frontend. WhatsApp tokens, payment secrets server-side only.</p>
        <p>Contact: privacy@punterprediction.com</p>
      </div>
    </div>
  )
}
