import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader><CardTitle>Join Punter Prediction</CardTitle><p className="text-sm text-muted-foreground">AI-powered sports intelligence • 18+ only</p></CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Username" />
          <Input placeholder="Email (optional)" />
          <Input placeholder="Phone e.g. 08012345678" />
          <Input type="password" placeholder="Password (8+ chars, upper, lower, number)" />
          <Input placeholder="Referral code (optional)" />
          <Button variant="brand" className="w-full">Create Account • Get 5 Free Credits</Button>
          <p className="text-xs text-muted-foreground text-center">By registering you agree to Terms and confirm you are 18+. Predictions are analytical estimates, not guarantees.</p>
        </CardContent>
      </Card>
    </div>
  )
}
