import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { TripsProvider } from './context/TripsContext'

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
        <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/dashboard" className="text-2xl font-bold hover:text-blue-100 transition flex items-center">
                <span className="text-3xl mr-2">🌍</span> GlobeTrotter
              </Link>
              <div className="flex space-x-8">
                <Link href="/dashboard" className="hover:text-blue-200 transition font-medium hover:underline">
                  Dashboard
                </Link>
                <Link href="/trips" className="hover:text-blue-200 transition font-medium hover:underline">
                  My Trips
                </Link>
                <Link href="/community" className="hover:text-blue-200 transition font-medium hover:underline">
                  Community
                </Link>
                <Link href="/calendar" className="hover:text-blue-200 transition font-medium hover:underline">
                  Calendar
                </Link>
                <Link href="/admin" className="hover:text-blue-200 transition font-medium hover:underline">
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <TripsProvider>
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </TripsProvider>
        <footer className="bg-gray-800 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-400">© 2024 GlobeTrotter. Your smart travel companion.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
