export default function CookiePolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
      <div className="prose max-w-none text-sm text-muted-foreground space-y-4">
        <p>We use cookies for authentication (JWT), preferences (theme), analytics (if enabled), and PWA functionality.</p>
        <p>Essential cookies: session, auth, CSRF where applicable.</p>
        <p>Analytics: only if NEXT_PUBLIC_ENABLE_ANALYTICS=true.</p>
        <p>You can manage cookies in browser settings.</p>
      </div>
    </div>
  )
}
