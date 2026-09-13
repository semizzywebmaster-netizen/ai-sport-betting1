import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BottomNav } from '@/components/layout/bottom-nav'

export const metadata: Metadata = {
  title: 'Punter Prediction - AI Sports Intelligence',
  description: 'Professional AI-powered football and basketball predictions. Analytical estimates for Premier League, NBA, La Liga, Champions League & more. 18+ Responsible betting.',
  keywords: ['football predictions', 'basketball predictions', 'AI betting', 'Premier League', 'NBA', 'bet builder', 'punter prediction'],
  authors: [{ name: 'Punter Prediction' }],
  openGraph: {
    title: 'Punter Prediction - AI Sports Intelligence',
    description: 'AI-powered football & basketball predictions with equal first-class treatment',
    type: 'website',
    locale: 'en_NG',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Punter Prediction',
    description: 'AI-powered sports predictions',
  },
  manifest: '/manifest.json',
  themeColor: '#16a34a',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  )
}
