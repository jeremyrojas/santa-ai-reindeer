import './globals.css'
import type { Metadata } from 'next'
import '../styles/survey-theme.css'

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="snow-overlay" />
        {children}
      </body>
    </html>
  )
}
