'use client'

import { useState } from 'react'

const mockCities = [
  { id: 1, name: 'Paris', country: 'France', rating: 4.8, costIndex: 'High', description: 'City of lights and romance', image: '🗼' },
  { id: 2, name: 'Tokyo', country: 'Japan', rating: 4.9, costIndex: 'High', description: 'Modern metropolis with rich tradition', image: '🗾' },
  { id: 3, name: 'Bali', country: 'Indonesia', rating: 4.7, costIndex: 'Medium', description: 'Tropical paradise with beaches', image: '🏝️' },
  { id: 4, name: 'New York', country: 'USA', rating: 4.6, costIndex: 'Very High', description: 'The city that never sleeps', image: '🗽' },
  { id: 5, name: 'Rome', country: 'Italy', rating: 4.8, costIndex: 'High', description: 'Ancient history meets modern life', image: '🏛️' },
  { id: 6, name: 'Barcelona', country: 'Spain', rating: 4.7, costIndex: 'Medium', description: 'Art, architecture, and beaches', image: '🏖️' },
  { id: 7, name: 'Dubai', country: 'UAE', rating: 4.5, costIndex: 'Very High', description: 'Luxury and modern wonders', image: '🏙️' },
  { id: 8, name: 'London', country: 'UK', rating: 4.6, costIndex: 'Very High', description: 'Historic capital with royal heritage', image: '🎡' },
  { id: 9, name: 'Bangkok', country: 'Thailand', rating: 4.6, costIndex: 'Low', description: 'Vibrant culture and amazing food', image: '🛕' },
  { id: 10, name: 'Prague', country: 'Czech Republic', rating: 4.7, costIndex: 'Medium', description: 'Medieval charm and beer culture', image: '🏰' },
  { id: 11, name: 'Istanbul', country: 'Turkey', rating: 4.6, costIndex: 'Medium', description: 'Where East meets West', image: '🕌' },
  { id: 12, name: 'Amsterdam', country: 'Netherlands', rating: 4.8, costIndex: 'High', description: 'Canals, culture, and freedom', image: '🚲' },
]

export default function SearchCitiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCostIndex, setSelectedCostIndex] = useState('All')
  const [toast, setToast] = useState<string | null>(null)
  
  const filteredCities = mockCities.filter(city => {
    const matchesSearch = city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         city.country.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCost = selectedCostIndex === 'All' || city.costIndex === selectedCostIndex
    return matchesSearch && matchesCost
  })
  
  const handleAddToTrip = (cityName: string) => {
    console.log(`Adding ${cityName} to trip`)
    setToast(`${cityName} added to your trip! 🎉`)
    setTimeout(() => setToast(null), 3000)
  }
  
  const getCostColor = (costIndex: string) => {
    switch(costIndex) {
      case 'Low': return 'text-green-600'
      case 'Medium': return 'text-yellow-600'
      case 'High': return 'text-orange-600'
      case 'Very High': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Search Cities</h1>
      <p className="text-gray-600 mb-8">Discover amazing destinations around the world</p>
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-bounce">
          {toast}
        </div>
      )}
      
      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex gap-4 mb-4">
          <input 
            type="text"
            placeholder="Search for a city or country..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
            🔍 Search
          </button>
        </div>
        
        {/* Cost Index Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Cost</label>
          <div className="flex flex-wrap gap-2">
            {['All', 'Low', 'Medium', 'High', 'Very High'].map((cost) => (
              <button
                key={cost}
                onClick={() => setSelectedCostIndex(cost)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCostIndex === cost
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cost}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">Found <span className="font-semibold">{filteredCities.length}</span> cities</p>
      </div>
      
      {/* Cities Grid */}
      {filteredCities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCities.map((city) => (
            <div key={city.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition overflow-hidden">
              <div className="h-40 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-6xl">
                {city.image}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{city.name}</h3>
                <p className="text-gray-600 text-sm mb-2">📍 {city.country}</p>
                <p className="text-gray-700 text-sm mb-3 h-10">{city.description}</p>
                
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-lg">⭐</span>
                    <span className="ml-1 font-semibold">{city.rating}</span>
                  </div>
                  <span className={`text-xs font-semibold ${getCostColor(city.costIndex)}`}>
                    💰 {city.costIndex}
                  </span>
                </div>
                
                <button 
                  onClick={() => handleAddToTrip(city.name)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Add to Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600 text-lg">No cities found matching your search.</p>
          <button 
            onClick={() => {
              setSearchTerm('')
              setSelectedCostIndex('All')
            }}
            className="mt-4 text-blue-600 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
