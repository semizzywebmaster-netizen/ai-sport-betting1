import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader><CardTitle>Welcome Back</CardTitle><p className="text-sm text-muted-foreground">Login with email, phone or username</p></CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Email, phone or username" />
          <Input type="password" placeholder="Password" />
          <Button variant="brand" className="w-full">Login</Button>
          <div className="text-center text-sm"><Link href="/register" className="text-primary">Don't have account? Register</Link> • <Link href="/forgot-password" className="text-muted-foreground">Forgot password?</Link></div>
          <div className="text-xs text-center text-muted-foreground">🇳🇬 Nigerian numbers supported: +234 or 0 format • Secure JWT auth</div>
        </CardContent>
      </Card>
    </div>
  )
}
