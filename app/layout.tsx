import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stray - Intelligent IoT Stray Cat Management',
  description: 'A smart IoT system for managing stray cats on campus. Automated feeding, health monitoring, population tracking, and community engagement.',
  keywords: 'stray cats, IoT, smart feeding, cat management, NTUST, campus cats',
  openGraph: {
    title: 'Stray - Intelligent IoT Stray Cat Management',
    description: 'Smart IoT system for stray cat welfare',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-bg-primary text-text-primary font-body antialiased">
        {children}
      </body>
    </html>
  )
}
