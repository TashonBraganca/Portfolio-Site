import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { SpotlightCursor } from '@/app/components/spotlight-cursor'
import { site } from '@/lib/config'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    type: 'website',
    url: site.url,
    title: site.name,
    description: site.description,
    images: [
      {
        url: site.image,
        width: 1200,
        height: 630,
        alt: site.name
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    images: [site.image]
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SpotlightCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}