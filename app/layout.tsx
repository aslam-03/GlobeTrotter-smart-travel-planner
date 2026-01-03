import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TripsProvider } from './context/TripsContext'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GlobeTrotter - Smart Travel Planner',
  description: 'Plan your perfect trip with AI-powered recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <TripsProvider>
          {children}
        </TripsProvider>
        <footer className="bg-gray-800 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} GlobeTrotter. Your smart travel companion.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
