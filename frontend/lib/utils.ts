import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'NGN'): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatOdds(odds: number): string {
  return odds.toFixed(2)
}

export function formatDate(date: string | Date, format: 'short' | 'long' | 'time' = 'short'): string {
  const d = new Date(date)
  if (format === 'time') {
    return d.toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit' })
  }
  if (format === 'long') {
    return d.toLocaleDateString('en-NG', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
  }
  return d.toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })
}

export function formatPhoneNigeria(phone: string): string {
  let cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('0')) {
    cleaned = '234' + cleaned.substring(1)
  }
  if (!cleaned.startsWith('234') && cleaned.length === 10) {
    cleaned = '234' + cleaned
  }
  return '+' + cleaned
}

export function getRiskColor(risk: string): string {
  switch (risk) {
    case 'LOW': return 'text-green-600 bg-green-50 border-green-200'
    case 'MEDIUM': return 'text-amber-600 bg-amber-50 border-amber-200'
    case 'HIGH': return 'text-red-600 bg-red-50 border-red-200'
    default: return 'text-gray-600 bg-gray-50'
  }
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 75) return 'text-green-600'
  if (confidence >= 60) return 'text-amber-600'
  return 'text-red-600'
}
