'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

export function Header() {
  const [mobileMenu, setMobileMenu] = useState(false)
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl gradient-brand flex items-center justify-center text-white font-bold text-lg">P</div>
            <span className="font-bold text-xl hidden sm:inline">PUNTER<span className="text-primary"> PREDICTION</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/football" className="flex items-center gap-1 hover:text-primary transition"><span className="h-2 w-2 rounded-full bg-green-600"></span> Football</Link>
            <Link href="/basketball" className="flex items-center gap-1 hover:text-primary transition"><span className="h-2 w-2 rounded-full bg-orange-600"></span> Basketball</Link>
            <Link href="/predictions" className="hover:text-primary transition">Predictions</Link>
            <Link href="/bet-builder" className="hover:text-primary transition">Bet Builder</Link>
            <Link href="/community" className="hover:text-primary transition">Community</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="sport" className="hidden sm:flex">AI Powered</Badge>
          <Link href="/login"><Button variant="ghost" size="sm">Login</Button></Link>
          <Link href="/register"><Button variant="brand" size="sm">Join Now</Button></Link>
          <button className="md:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)}>☰</button>
        </div>
      </div>
      {mobileMenu && (
        <div className="md:hidden border-t bg-background p-4 space-y-3">
          <Link href="/football" className="block py-2">⚽ Football</Link>
          <Link href="/basketball" className="block py-2">🏀 Basketball</Link>
          <Link href="/predictions" className="block py-2">Predictions</Link>
          <Link href="/bet-builder" className="block py-2">Bet Builder</Link>
          <Link href="/community" className="block py-2">Community</Link>
        </div>
      )}
    </header>
  )
}
