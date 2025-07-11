import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Next.js Portfolio Starter',
    template: '%s | Next.js Portfolio Starter',
  },
  description: "Kevin's portfolio built with Next.js",
  openGraph: {
    title: "Kevin's Portfolio",
    description: 'Kevin Pierce Chan Ramos',
    url: baseUrl,
    siteName: "Kevin's Portfolio",
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      {/* ─── Full-width body, small side-padding ────────────────────────── */}
      <body className="w-full antialiased px-4 md:px-6">
        <main className="flex-auto mt-8 flex flex-col">
          <Navbar />
          {/* page content */}
          {children}
          <Footer />

          {/* Vercel analytics */}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
