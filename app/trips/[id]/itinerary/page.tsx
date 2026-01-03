'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useTrips } from '../../../context/TripsContext'

// Import Map with SSR disabled
const Map = dynamic(() => import('../../../components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Loading map...</p>
    </div>
  )
})

export default function ItineraryPage({ params }: { params: { id: string } }) {
  const { getTrip, getTripCityStops, addCityStop, addActivity } = useTrips()
  const tripId = parseInt(params.id)
  const trip = getTrip(tripId)
  const cityStops = getTripCityStops(tripId)
  
  const [showCityForm, setShowCityForm] = useState(false)
  const [showActivityForm, setShowActivityForm] = useState<number | null>(null)
  
  const [cityForm, setCityForm] = useState({
    city: '',
    startDate: '',
    endDate: ''
  })
  
  const [activityForm, setActivityForm] = useState({
    name: '',
    type: 'Sightseeing',
    cost: 0,
    time: ''
  })
  
  if (!trip) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Trip Not Found</h1>
          <Link href="/trips" className="text-blue-600 hover:underline">
             Back to Trips
          </Link>
        </div>
      </div>
    )
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  const handleAddCity = () => {
    if (cityForm.city && cityForm.startDate && cityForm.endDate) {
      addCityStop({
        tripId,
        city: cityForm.city,
        startDate: cityForm.startDate,
        endDate: cityForm.endDate,
        activities: []
      })
      setCityForm({ city: '', startDate: '', endDate: '' })
      setShowCityForm(false)
    }
  }
  
  const handleAddActivity = (cityStopId: number) => {
    if (activityForm.name && activityForm.time) {
      addActivity(cityStopId, {
        name: activityForm.name,
        type: activityForm.type,
        cost: activityForm.cost,
        time: activityForm.time
      })
      setActivityForm({ name: '', type: 'Sightseeing', cost: 0, time: '' })
      setShowActivityForm(null)
    }
  }
  
  const typeColors: { [key: string]: string } = {
    Sightseeing: 'bg-blue-100 text-blue-800',
    Culture: 'bg-purple-100 text-purple-800',
    Culinary: 'bg-orange-100 text-orange-800',
    Adventure: 'bg-green-100 text-green-800',
    Shopping: 'bg-pink-100 text-pink-800',
    Relaxation: 'bg-teal-100 text-teal-800'
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/trips/`} className="text-blue-600 hover:underline mb-2 inline-block">
           Back to Trip Details
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Itinerary Builder</h1>
        <p className="text-gray-600">{trip.title}  {formatDate(trip.startDate)} - {formatDate(trip.endDate)}</p>
      </div>
      
      {/* Add City Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowCityForm(!showCityForm)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg"
        >
          {showCityForm ? ' Cancel' : '+ Add City Stop'}
        </button>
      </div>
      
      {/* Add City Form */}
      {showCityForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-bold mb-4">Add City Stop</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="City name"
              className="px-4 py-2 border border-gray-300 rounded-lg"
              value={cityForm.city}
              onChange={(e) => setCityForm({ ...cityForm, city: e.target.value })}
            />
            <input
              type="date"
              placeholder="Start date"
              className="px-4 py-2 border border-gray-300 rounded-lg"
              value={cityForm.startDate}
              onChange={(e) => setCityForm({ ...cityForm, startDate: e.target.value })}
            />
            <input
              type="date"
              placeholder="End date"
              className="px-4 py-2 border border-gray-300 rounded-lg"
              value={cityForm.endDate}
              onChange={(e) => setCityForm({ ...cityForm, endDate: e.target.value })}
            />
          </div>
          <button
            onClick={handleAddCity}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Add City
          </button>
        </div>
      )}
      
      {/* Trip Route Map */}
      {cityStops.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📍 Your Trip Route</h2>
          <Map 
            destinations={cityStops.map(stop => ({
              id: stop.id,
              city: stop.city,
              country: stop.country || 'Unknown',
              startDate: stop.startDate,
              endDate: stop.endDate,
              order: stop.order
            }))} 
            height="400px"
          />
          <p className="text-xs text-gray-500 mt-3 text-center">
            🗺️ Interactive map showing your journey • Numbers indicate city order
          </p>
        </div>
      )}
      
      {/* City Stops */}
      <div className="space-y-6">
        {cityStops.length > 0 ? (
          cityStops.map((stop, index) => (
            <div key={stop.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800">{stop.city}</h3>
                  <p className="text-gray-600">{formatDate(stop.startDate)} - {formatDate(stop.endDate)}</p>
                </div>
              </div>
              
              {/* Activities */}
              <div className="ml-16 space-y-3">
                {stop.activities.map((activity) => (
                  <div key={activity.id} className="border-l-4 border-blue-300 pl-4 py-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="font-semibold text-gray-600 mr-3 min-w-[80px]">{activity.time}</span>
                          <h4 className="font-semibold text-lg">{activity.name}</h4>
                          <span className={`ml-2 px-2 py-1 rounded text-xs `}>
                            {activity.type}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 ml-[92px]">
                           
                          {activity.description && `  `}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Add Activity Button */}
                {showActivityForm === stop.id ? (
                  <div className="border-l-4 border-green-300 pl-4 py-3 bg-green-50">
                    <h4 className="font-semibold mb-3">Add Activity</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Activity name"
                        className="px-3 py-2 border border-gray-300 rounded"
                        value={activityForm.name}
                        onChange={(e) => setActivityForm({ ...activityForm, name: e.target.value })}
                      />
                      <input
                        type="time"
                        placeholder="Time"
                        className="px-3 py-2 border border-gray-300 rounded"
                        value={activityForm.time}
                        onChange={(e) => setActivityForm({ ...activityForm, time: e.target.value })}
                      />
                      <select
                        className="px-3 py-2 border border-gray-300 rounded"
                        value={activityForm.type}
                        onChange={(e) => setActivityForm({ ...activityForm, type: e.target.value })}
                      >
                        <option>Sightseeing</option>
                        <option>Culture</option>
                        <option>Culinary</option>
                        <option>Adventure</option>
                        <option>Shopping</option>
                        <option>Relaxation</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Cost ($)"
                        className="px-3 py-2 border border-gray-300 rounded"
                        value={activityForm.cost}
                        onChange={(e) => setActivityForm({ ...activityForm, cost: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleAddActivity(stop.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm"
                      >
                        Add Activity
                      </button>
                      <button
                        onClick={() => setShowActivityForm(null)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowActivityForm(stop.id)}
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                  >
                    + Add Activity
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Cities Added Yet</h2>
            <p className="text-gray-600 mb-4">Start building your itinerary by adding city stops</p>
            <button
              onClick={() => setShowCityForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Add Your First City
            </button>
          </div>
        )}
      </div>
      
      {/* Quick Links */}
      {cityStops.length > 0 && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3">Need inspiration?</h3>
          <div className="flex gap-4">
            <Link href="/search/cities" className="text-blue-600 hover:underline">
               ← Browse Cities
            </Link>
            <Link href="/search/activities" className="text-blue-600 hover:underline">
               ← Find Activities
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
