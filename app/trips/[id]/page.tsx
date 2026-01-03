'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useTrips } from '../../context/TripsContext'

// Import Map with SSR disabled (Leaflet requires window object)
const Map = dynamic(() => import('../../components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  )
})

export default function TripDetailPage({ params }: { params: { id: string } }) {
  const { getTrip, getTripCityStops } = useTrips()
  const tripId = parseInt(params.id)
  const trip = getTrip(tripId)
  const cityStops = getTripCityStops(tripId)
  
  if (!trip) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Trip Not Found</h1>
          <Link href="/trips" className="text-blue-600 hover:underline">
            ← Back to Trips
          </Link>
        </div>
      </div>
    )
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  const getDuration = (start: string, end: string) => {
    const days = Math.ceil((new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60 * 24))
    return `${days} ${days === 1 ? 'day' : 'days'}`
  }
  
  const totalActivities = cityStops.reduce((sum, stop) => sum + stop.activities.length, 0)
  const totalActivityCost = cityStops.reduce((sum, stop) => 
    sum + stop.activities.reduce((actSum, act) => actSum + act.cost, 0), 0
  )
  
  // Calculate budget percentage
  const totalCost = totalActivityCost
  const percentage = trip.totalBudget > 0 ? (totalCost / trip.totalBudget) * 100 : 0
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link href="/trips" className="text-blue-600 hover:underline mb-2 inline-block">
          ← Back to Trips
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{trip.title}</h1>
        <p className="text-xl text-gray-600">
          {formatDate(trip.startDate)} - {formatDate(trip.endDate)} • {getDuration(trip.startDate, trip.endDate)}
        </p>
      </div>
      
      {/* Description */}
      {trip.description && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">About This Trip</h2>
          <p className="text-gray-700">{trip.description}</p>
        </div>
      )}
      
      {/* Interactive Map */}
      {cityStops.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Trip Route Map</h2>
          <Map 
            destinations={cityStops.map(stop => ({
              id: stop.id,
              city: stop.city,
              country: stop.country || 'Unknown',
              startDate: stop.startDate,
              endDate: stop.endDate,
              order: stop.order
            }))} 
            height="500px"
          />
          <p className="text-xs text-gray-500 mt-3 text-center">
            📌 Click on markers to see destination details • Route shown as dashed line
          </p>
        </div>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
          <div className="text-2xl mb-2">📍</div>
          <div className="text-sm text-gray-600">Cities</div>
          <div className="text-3xl font-bold text-blue-600">{cityStops.length}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
          <div className="text-2xl mb-2">💰</div>
          <div className="text-sm text-gray-600">Total Budget</div>
          <div className="text-3xl font-bold text-green-600">${trip.totalBudget.toLocaleString()}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
          <div className="text-2xl mb-2">🎯</div>
          <div className="text-sm text-gray-600">Activities</div>
          <div className="text-3xl font-bold text-purple-600">{totalActivities}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
          <div className="text-2xl mb-2">💳</div>
          <div className="text-sm text-gray-600">Activities Cost</div>
          <div className="text-3xl font-bold text-orange-600">${totalActivityCost}</div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link 
          href={`/trips/${params.id}/itinerary`}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 hover:shadow-lg transition text-center"
        >
          <div className="text-4xl mb-3">📋</div>
          <h3 className="text-xl font-bold mb-2">Build Itinerary</h3>
          <p className="text-sm opacity-90">Plan your daily activities</p>
        </Link>
        
        <Link 
          href={`/trips/${params.id}/budget`}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6 hover:shadow-lg transition text-center"
        >
          <div className="text-4xl mb-3">💰</div>
          <h3 className="text-xl font-bold mb-2">Budget Breakdown</h3>
          <p className="text-sm opacity-90">Track expenses with charts</p>
        </Link>
        
        <Link 
          href="/calendar"
          className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6 hover:shadow-lg transition text-center"
        >
          <div className="text-4xl mb-3">📅</div>
          <h3 className="text-xl font-bold mb-2">Calendar View</h3>
          <p className="text-sm opacity-90">See all your trips</p>
        </Link>
        
        <Link 
          href="/community"
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-6 hover:shadow-lg transition text-center"
        >
          <div className="text-4xl mb-3">🌍</div>
          <h3 className="text-xl font-bold mb-2">Community</h3>
          <p className="text-sm opacity-90">Get inspired by others</p>
        </Link>
      </div>
      
      {/* Budget Overview (Quick View) */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Budget Progress</h2>
          <Link 
            href={`/trips/${params.id}/budget`}
            className="text-blue-600 hover:underline text-sm font-semibold"
          >
            View Full Breakdown →
          </Link>
        </div>
        <div className="mb-3">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Spent: ${totalCost}</span>
            <span className="text-gray-600">Budget: ${trip.totalBudget}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full ${
                percentage >= 100 ? 'bg-red-500' : 
                percentage >= 75 ? 'bg-yellow-500' : 
                'bg-green-500'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            ></div>
          </div>
          <div className="text-right text-sm mt-1 font-semibold">
            <span className={
              percentage >= 100 ? 'text-red-600' : 
              percentage >= 75 ? 'text-yellow-600' : 
              'text-green-600'
            }>
              {percentage.toFixed(1)}% used
            </span>
          </div>
        </div>
      </div>
      
      {/* Itinerary Preview */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Itinerary Preview</h2>
          <Link 
            href={`/trips/${params.id}/itinerary`}
            className="text-blue-600 hover:underline font-semibold"
          >
            View Full Itinerary →
          </Link>
        </div>
        
        {cityStops.length > 0 ? (
          <div className="space-y-4">
            {cityStops.slice(0, 3).map((stop) => (
              <div key={stop.id} className="border-l-4 border-blue-500 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{stop.city}</h3>
                    <p className="text-sm text-gray-600">
                      {formatDate(stop.startDate)} - {formatDate(stop.endDate)}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {stop.activities.length} {stop.activities.length === 1 ? 'activity' : 'activities'} planned
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-3">No itinerary created yet</p>
            <Link 
              href={`/trips/${params.id}/itinerary`}
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Start Planning
            </Link>
          </div>
        )}
      </div>
      
      {/* Budget Breakdown */}
      <div id="budget-breakdown" className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Budget Breakdown</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-700">Total Budget:</span>
            <span className="font-bold text-lg">${trip.totalBudget.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-700">Activities Cost:</span>
            <span className="font-semibold text-orange-600">${totalActivityCost}</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-gray-700">Remaining Budget:</span>
            <span className="font-semibold text-green-600">${(trip.totalBudget - totalActivityCost).toLocaleString()}</span>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-600 h-4 rounded-full transition-all"
                style={{ width: `${Math.min((totalActivityCost / trip.totalBudget) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              {((totalActivityCost / trip.totalBudget) * 100).toFixed(1)}% of budget used
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
