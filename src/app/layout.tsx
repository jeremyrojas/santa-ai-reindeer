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
