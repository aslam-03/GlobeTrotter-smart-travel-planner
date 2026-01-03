'use client'

import Link from 'next/link'

// Mock data for individual community trip
const mockCommunityTrips = [
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
    image: '🗾',
    itinerary: [
      {
        day: 1,
        city: 'Tokyo',
        date: 'Mar 15, 2026',
        activities: [
          { time: '09:00', name: 'Senso-ji Temple', type: 'Culture', cost: 0 },
          { time: '12:00', name: 'Sushi Lunch at Tsukiji', type: 'Culinary', cost: 45 },
          { time: '15:00', name: 'Tokyo Skytree', type: 'Sightseeing', cost: 25 },
        ]
      },
      {
        day: 2,
        city: 'Tokyo',
        date: 'Mar 16, 2026',
        activities: [
          { time: '10:00', name: 'Meiji Shrine', type: 'Culture', cost: 0 },
          { time: '14:00', name: 'Shibuya Crossing', type: 'Sightseeing', cost: 0 },
          { time: '18:00', name: 'Izakaya Dinner', type: 'Culinary', cost: 35 },
        ]
      },
      {
        day: 3,
        city: 'Kyoto',
        date: 'Mar 17, 2026',
        activities: [
          { time: '09:00', name: 'Fushimi Inari Shrine', type: 'Culture', cost: 0 },
          { time: '13:00', name: 'Traditional Lunch', type: 'Culinary', cost: 30 },
          { time: '16:00', name: 'Bamboo Grove', type: 'Sightseeing', cost: 0 },
        ]
      }
    ],
    budgetBreakdown: [
      { category: 'Transport', amount: 1050, percentage: 30 },
      { category: 'Stay', amount: 1225, percentage: 35 },
      { category: 'Activities', amount: 700, percentage: 20 },
      { category: 'Food', amount: 525, percentage: 15 }
    ]
  }
]

export default function CommunityTripDetailPage({ params }: { params: { id: string } }) {
  const tripId = parseInt(params.id)
  const trip = mockCommunityTrips.find(t => t.id === tripId)
  
  if (!trip) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Trip Not Found</h1>
          <Link href="/community" className="text-blue-600 hover:underline">
            ← Back to Community
          </Link>
        </div>
      </div>
    )
  }
  
  const typeColors: { [key: string]: string } = {
    Sightseeing: 'bg-blue-100 text-blue-800',
    Culture: 'bg-purple-100 text-purple-800',
    Culinary: 'bg-orange-100 text-orange-800',
    Adventure: 'bg-green-100 text-green-800',
    Shopping: 'bg-pink-100 text-pink-800'
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/community" className="text-blue-600 hover:underline mb-2 inline-block">
          ← Back to Community
        </Link>
      </div>
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 mb-6 text-white">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-3xl mr-4">
            {trip.avatar}
          </div>
          <div>
            <div className="text-sm opacity-90">Trip by {trip.author}</div>
            <div className="text-xs opacity-75">{trip.duration}</div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-6xl mb-4">{trip.image}</div>
          <h1 className="text-4xl font-bold mb-2">{trip.title}</h1>
          <p className="text-lg opacity-90 mb-4">{trip.description}</p>
          <div className="flex justify-center gap-6 text-sm">
            <span>❤️ {trip.likes} likes</span>
            <span>📌 {trip.savedCount} saved</span>
            <span>📅 {trip.duration}</span>
          </div>
        </div>
      </div>
      
      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Budget Breakdown</h2>
          <div className="mb-6">
            <div className="text-sm text-gray-600">Total Estimated Budget</div>
            <div className="text-4xl font-bold text-green-600">${trip.totalBudget}</div>
          </div>
          <div className="space-y-3">
            {trip.budgetBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-green-500' :
                    index === 2 ? 'bg-orange-500' :
                    'bg-red-500'
                  }`}></div>
                  <span className="font-semibold text-gray-700">{item.category}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800">${item.amount}</div>
                  <div className="text-sm text-gray-500">{item.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Destinations</h2>
          <div className="space-y-3">
            {trip.destinations.map((dest, idx) => (
              <div key={idx} className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-2xl mr-3">📍</span>
                <span className="font-semibold text-gray-800">{dest}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
            <div className="text-sm text-gray-600">Average per day</div>
            <div className="text-2xl font-bold text-purple-600">
              ${Math.round(trip.totalBudget / parseInt(trip.duration))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Itinerary */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sample Itinerary</h2>
        <div className="space-y-6">
          {trip.itinerary.map((dayPlan) => (
            <div key={dayPlan.day} className="border-l-4 border-blue-500 pl-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                  {dayPlan.day}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{dayPlan.city}</h3>
                  <p className="text-gray-600">{dayPlan.date}</p>
                </div>
              </div>
              <div className="space-y-3 ml-16">
                {dayPlan.activities.map((activity, idx) => (
                  <div key={idx} className="flex items-start p-3 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-gray-600 mr-4 min-w-[60px]">{activity.time}</span>
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className="font-semibold text-gray-800 mr-2">{activity.name}</span>
                        <span className={`px-2 py-1 rounded text-xs ${typeColors[activity.type]}`}>
                          {activity.type}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Cost: ${activity.cost}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-3">Love this itinerary?</h3>
        <p className="text-gray-600 mb-4">Create your own trip inspired by this one!</p>
        <div className="flex justify-center gap-4">
          <Link
            href="/trips/create"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Create Similar Trip
          </Link>
          <button className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition font-semibold">
            ⭐ Save Trip
          </button>
        </div>
      </div>
    </div>
  )
}
