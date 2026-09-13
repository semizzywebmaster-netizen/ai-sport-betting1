'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function BottomNav() {
  const pathname = usePathname()
  const items = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/football', label: 'Football', icon: '⚽' },
    { href: '/basketball', label: 'Basket', icon: '🏀' },
    { href: '/predictions', label: 'Predict', icon: '🎯' },
    { href: '/bet-builder', label: 'Builder', icon: '🧩' },
  ]
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t px-2 py-2">
      <div className="flex justify-around">
        {items.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href} className={`flex flex-col items-center p-2 rounded-xl text-xs ${active ? 'text-primary bg-primary/10' : 'text-muted-foreground'}`}>
              <span className="text-lg">{item.icon}</span>
              <span className="mt-1 font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
