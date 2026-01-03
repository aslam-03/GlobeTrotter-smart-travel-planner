'use client'

import Link from 'next/link'
import { useTrips } from '../context/TripsContext'

export default function TripsPage() {
  const { trips } = useTrips()
  
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
  
  const getStatus = (startDate: string, endDate: string) => {
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    if (now > end) return { label: 'Completed', color: 'bg-gray-100 text-gray-800' }
    if (now >= start && now <= end) return { label: 'Ongoing', color: 'bg-blue-100 text-blue-800' }
    return { label: 'Upcoming', color: 'bg-green-100 text-green-800' }
  }
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Trips</h1>
          <p className="text-gray-600 text-lg">
            {trips.length} {trips.length === 1 ? 'trip' : 'trips'} planned
          </p>
        </div>
        <Link 
          href="/trips/create"
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg hover:shadow-xl transition font-semibold flex items-center"
        >
          <span className="mr-2">✈️</span> Create New Trip
        </Link>
      </div>
      
      {/* Trips Grid */}
      
      {trips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => {
            const status = getStatus(trip.startDate, trip.endDate)
            
            return (
              <div 
                key={trip.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border-2 border-gray-100 hover:border-blue-400"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-7xl">
                  🌍
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 flex-1">{trip.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ml-2 ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                  
                  <div className="space-y-3 text-sm text-gray-600 mb-6">
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
                  
                  <Link
                    href={`/trips/${trip.id}`}
                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-lg hover:shadow-lg transition font-semibold"
                  >
                    View Trip Details →
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-16 text-center">
          <div className="text-8xl mb-6">✈️</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">No trips yet!</h2>
          <p className="text-gray-600 text-lg mb-8">Start planning your first adventure today</p>
          <Link
            href="/trips/create"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-lg hover:shadow-xl transition font-semibold text-lg"
          >
            Create Your First Trip
          </Link>
        </div>
      )}
    </div>
  )
}
