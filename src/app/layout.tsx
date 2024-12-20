import './globals.css'
import type { Metadata } from 'next'
import '../styles/survey-theme.css'
import { Nunito } from 'next/font/google'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Santa's AI Reindeer Quiz",
  description: 'Find out which of Santa\'s AI builder reindeer matches your style!',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
      { rel: 'manifest', url: '/site.webmanifest' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={nunito.className}>
      <body>
        <div className="snow-overlay" />
        {children}
      </body>
    </html>
  )
}
