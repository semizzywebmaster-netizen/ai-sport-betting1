import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://punterprediction.com'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/football`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${base}/basketball`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${base}/predictions`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${base}/bet-builder`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/responsible-betting`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
