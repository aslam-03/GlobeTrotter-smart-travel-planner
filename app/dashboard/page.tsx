'use client'

import Link from 'next/link'
import { useTrips } from '../context/TripsContext'

export default function DashboardPage() {
  const { trips } = useTrips()
  
  // Get 3 most recent trips
  const recentTrips = trips
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
    .slice(0, 3)
  
  // Calculate stats
  const totalTrips = trips.length
  const averageBudget = trips.length > 0 
    ? Math.round(trips.reduce((sum, trip) => sum + trip.totalBudget, 0) / trips.length)
    : 0
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  const getDuration = (start: string, end: string) => {
    const days = Math.ceil((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24))
    return `${days} ${days === 1 ? 'day' : 'days'}`
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Hero Section with Gradient Background */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 md:p-12 mb-10 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">Welcome to GlobeTrotter! 🌍</h1>
        <p className="text-xl mb-6 opacity-90">Plan your next adventure and explore the world with confidence</p>
        <Link 
          href="/trips/create"
          className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold text-lg shadow-lg hover:shadow-xl"
        >
          <span className="mr-2">✈️</span> Plan New Trip
        </Link>
      </div>
      
      {/* Stats Grid with Enhanced Styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-blue-500 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-600 mb-2">Total Trips</div>
              <div className="text-5xl font-bold text-blue-600">{totalTrips}</div>
              <div className="text-xs text-gray-500 mt-2">Your travel adventures</div>
            </div>
            <div className="text-5xl">🗺️</div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-green-500 hover:shadow-xl transition">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-600 mb-2">Average Budget</div>
              <div className="text-5xl font-bold text-green-600">${averageBudget.toLocaleString()}</div>
              <div className="text-xs text-gray-500 mt-2">Per trip spending</div>
            </div>
            <div className="text-5xl">💰</div>
          </div>
        </div>
      </div>
      
      {/* Divider */}
      <div className="border-t-2 border-gray-200 mb-10"></div>
      
      {/* Recent Trips Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Recent Trips</h2>
            <p className="text-gray-600 mt-1">Your latest adventures</p>
          </div>
          <Link 
            href="/trips"
            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline flex items-center"
          >
            View All <span className="ml-1">→</span>
          </Link>
        </div>
        
        {recentTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentTrips.map((trip) => (
              <Link 
                key={trip.id}
                href={`/trips/${trip.id}`}
                className="block border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-4">{trip.title}</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="mr-3 text-lg">📍</span>
                    <span className="font-medium">{trip.citiesCount} {trip.citiesCount === 1 ? 'city' : 'cities'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3 text-lg">📅</span>
                    <span>{formatDate(trip.startDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3 text-lg">⏱️</span>
                    <span>{getDuration(trip.startDate, trip.endDate)}</span>
                  </div>
                  <div className="flex items-center pt-2 border-t border-gray-200">
                    <span className="mr-3 text-lg">💰</span>
                    <span className="font-bold text-blue-600 text-lg">${trip.totalBudget.toLocaleString()}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <div className="text-6xl mb-4">✈️</div>
            <p className="text-gray-500 text-xl mb-6">No trips yet. Start planning your first adventure!</p>
            <Link 
              href="/trips/create"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Create Your First Trip
            </Link>
          </div>
        )}
      </div>
      
      {/* Divider */}
      <div className="border-t-2 border-gray-200 mb-10"></div>
      
      {/* Quick Actions Grid */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Explore More</h2>
        <p className="text-gray-600 mb-6">Discover destinations and connect with fellow travelers</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/search/cities" className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">Search Cities</h3>
            <p className="opacity-90">Discover your next destination</p>
          </Link>
          
          <Link href="/search/activities" className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-2">Find Activities</h3>
            <p className="opacity-90">Explore things to do</p>
          </Link>
          
          <Link href="/community" className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-2xl font-bold mb-2">Community</h3>
            <p className="opacity-90">Connect with travelers</p>
          </Link>
        </div>
      </div>
      </div>
    </div>
  )
}
