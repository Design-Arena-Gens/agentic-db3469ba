import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'N8n Finance Bot',
  description: 'AI-powered finance assistant bot',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
