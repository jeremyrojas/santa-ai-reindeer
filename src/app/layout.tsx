import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <main className="container mx-auto px-4">
          {children}
        </main>
      </body>
    </html>
  )
}
