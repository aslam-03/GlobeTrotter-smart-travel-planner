'use client'

import { useState } from 'react'
import Link from 'next/link'

// Mock public trips from other users
const mockPublicTrips = [
  {
    id: 1,
    author: 'Sarah Chen',
    avatar: '👩‍🦰',
    title: 'Amazing Japan Adventure',
    destinations: ['Tokyo', 'Kyoto', 'Osaka'],
    duration: '14 days',
    totalBudget: 3500,
    description: 'Experience the perfect blend of tradition and modernity',
    likes: 124,
    savedCount: 45,
    image: '🗾'
  },
  {
    id: 2,
    author: 'Mike Johnson',
    avatar: '👨‍🦱',
    title: 'Budget Europe Backpacking',
    destinations: ['Paris', 'Amsterdam', 'Berlin', 'Prague'],
    duration: '21 days',
    totalBudget: 2800,
    description: 'See Europe without breaking the bank',
    likes: 89,
    savedCount: 67,
    image: '🗺️'
  },
  {
    id: 3,
    author: 'Emma Rodriguez',
    avatar: '👩',
    title: 'Southeast Asia Explorer',
    destinations: ['Bangkok', 'Bali', 'Singapore'],
    duration: '18 days',
    totalBudget: 2200,
    description: 'Beaches, temples, and amazing food',
    likes: 156,
    savedCount: 92,
    image: '🌴'
  },
  {
    id: 4,
    author: 'Alex Kumar',
    avatar: '👨',
    title: 'American Road Trip',
    destinations: ['San Francisco', 'Las Vegas', 'Grand Canyon', 'Los Angeles'],
    duration: '12 days',
    totalBudget: 4200,
    description: 'Epic road trip across the American West',
    likes: 203,
    savedCount: 78,
    image: '🚗'
  },
  {
    id: 5,
    author: 'Lisa Wang',
    avatar: '👩‍🦳',
    title: 'Mediterranean Paradise',
    destinations: ['Barcelona', 'Nice', 'Rome'],
    duration: '16 days',
    totalBudget: 3800,
    description: 'Sun, sea, and incredible history',
    likes: 178,
    savedCount: 103,
    image: '🏖️'
  },
  {
    id: 6,
    author: 'David Park',
    avatar: '👨‍🦲',
    title: 'Nordic Adventure',
    destinations: ['Copenhagen', 'Oslo', 'Stockholm'],
    duration: '10 days',
    totalBudget: 4500,
    description: 'Explore the beautiful Scandinavian capitals',
    likes: 94,
    savedCount: 52,
    image: '🏔️'
  }
]

export default function CommunityPage() {
  const [filter, setFilter] = useState<'all' | 'budget' | 'luxury'>('all')
  const [savedTrips, setSavedTrips] = useState<number[]>([])
  
  const filteredTrips = mockPublicTrips.filter(trip => {
    if (filter === 'budget') return trip.totalBudget < 3000
    if (filter === 'luxury') return trip.totalBudget >= 4000
    return true
  })
  
  const toggleSave = (tripId: number) => {
    setSavedTrips(prev => 
      prev.includes(tripId) 
        ? prev.filter(id => id !== tripId)
        : [...prev, tripId]
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Community Trips</h1>
        <p className="text-gray-600">Get inspired by trips from travelers around the world</p>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Trips
          </button>
          <button
            onClick={() => setFilter('budget')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === 'budget' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            💰 Budget Friendly (< $3000)
          </button>
          <button
            onClick={() => setFilter('luxury')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === 'luxury' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ✨ Luxury ($4000+)
          </button>
        </div>
      </div>
      
      {/* Trips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrips.map((trip) => (
          <div key={trip.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-center">
              <div className="text-6xl mb-2">{trip.image}</div>
              <h3 className="text-xl font-bold text-white">{trip.title}</h3>
            </div>
            
            {/* Card Content */}
            <div className="p-6">
              {/* Author */}
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-xl mr-3">
                  {trip.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{trip.author}</div>
                  <div className="text-sm text-gray-500">{trip.duration}</div>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">{trip.description}</p>
              
              {/* Destinations */}
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">📍 Destinations:</div>
                <div className="flex flex-wrap gap-2">
                  {trip.destinations.map((dest, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {dest}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Budget */}
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm text-gray-600">Estimated Budget</div>
                <div className="text-2xl font-bold text-green-600">${trip.totalBudget}</div>
              </div>
              
              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <span>❤️ {trip.likes} likes</span>
                <span>📌 {trip.savedCount} saved</span>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/community/${trip.id}`}
                  className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  View Trip
                </Link>
                <button
                  onClick={() => toggleSave(trip.id)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    savedTrips.includes(trip.id)
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={savedTrips.includes(trip.id) ? 'Unsave' : 'Save trip'}
                >
                  {savedTrips.includes(trip.id) ? '⭐' : '☆'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* No Results */}
      {filteredTrips.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No trips found matching your filter</p>
        </div>
      )}
      
      {/* Community Stats */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Community Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">{mockPublicTrips.length}</div>
            <div className="text-gray-600 mt-1">Public Trips</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">
              {mockPublicTrips.reduce((sum, t) => sum + t.likes, 0)}
            </div>
            <div className="text-gray-600 mt-1">Total Likes</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">
              {mockPublicTrips.reduce((sum, t) => sum + t.savedCount, 0)}
            </div>
            <div className="text-gray-600 mt-1">Times Saved</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600">
              {new Set(mockPublicTrips.flatMap(t => t.destinations)).size}
            </div>
            <div className="text-gray-600 mt-1">Unique Destinations</div>
          </div>
        </div>
      </div>
    </div>
  )
}
