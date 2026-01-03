'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

interface User {
  id: number
  name: string
  email: string
}

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [pathname])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)
      router.push('/login')
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  // Hide navbar on landing page, login, and register pages
  if (pathname === '/' || pathname === '/login' || pathname === '/register') {
    return null
  }

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="text-2xl font-bold hover:text-blue-100 transition flex items-center">
            <span className="text-3xl mr-2">🌍</span> GlobeTrotter
          </Link>
          
          <div className="flex items-center space-x-8">
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

            {/* User Menu */}
            {!loading && (
              <div className="relative">
                {user ? (
                  <div>
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center space-x-2 bg-blue-800 bg-opacity-50 px-4 py-2 rounded-lg hover:bg-opacity-70 transition"
                    >
                      <span className="text-xl">👤</span>
                      <span className="font-medium">{user.name}</span>
                      <span className="text-xs">▼</span>
                    </button>

                    {showDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 text-gray-800">
                        <div className="px-4 py-2 border-b border-gray-200">
                          <p className="text-sm font-semibold">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-medium"
                        >
                          🚪 Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link
                      href="/login"
                      className="px-4 py-2 hover:text-blue-200 transition font-medium"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
