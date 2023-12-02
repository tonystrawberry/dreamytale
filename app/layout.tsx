import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from "@/components/header"
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wonderscape | Natural Wonders',
  description: 'Discover the most beautiful places of the world and ignite your wanderlust like never before.',
}

export default function RootLayout({ children } : { children: React.ReactNode } ) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
