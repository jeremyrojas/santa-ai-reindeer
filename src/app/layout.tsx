import './globals.css'
import type { Metadata } from 'next'
import '../styles/survey-theme.css'

export const metadata: Metadata = {
  title: "Santa's AI-Powered Reindeer Quiz",
  description: 'Find out which of Santa\'s AI-Powered reindeer matches your style!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="snow-overlay" />
        {children}
      </body>
    </html>
  )
}
