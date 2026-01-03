'use client'

import { useState } from 'react'

const mockActivities = [
  { id: 1, name: 'Eiffel Tower Visit', city: 'Paris', category: 'Landmark', price: 25, duration: '2 hours', rating: 4.8, image: '🗼', description: 'Iconic Parisian landmark with stunning views' },
  { id: 2, name: 'Sushi Making Class', city: 'Tokyo', category: 'Culinary', price: 80, duration: '3 hours', rating: 4.9, image: '🍣', description: 'Learn authentic sushi preparation' },
  { id: 3, name: 'Surfing Lesson', city: 'Bali', category: 'Adventure', price: 45, duration: '2 hours', rating: 4.7, image: '🏄', description: 'Beginner-friendly surf instruction' },
  { id: 4, name: 'Broadway Show', city: 'New York', category: 'Entertainment', price: 120, duration: '2.5 hours', rating: 4.8, image: '🎭', description: 'World-class theater performance' },
  { id: 5, name: 'Colosseum Tour', city: 'Rome', category: 'Historical', price: 35, duration: '3 hours', rating: 4.9, image: '🏛️', description: 'Ancient Roman amphitheater guided tour' },
  { id: 6, name: 'Sagrada Familia', city: 'Barcelona', category: 'Landmark', price: 30, duration: '2 hours', rating: 4.8, image: '⛪', description: 'Gaudi\'s masterpiece basilica' },
  { id: 7, name: 'Desert Safari', city: 'Dubai', category: 'Adventure', price: 95, duration: '6 hours', rating: 4.6, image: '🏜️', description: 'Dune bashing and camel riding' },
  { id: 8, name: 'London Eye Ride', city: 'London', category: 'Landmark', price: 40, duration: '30 min', rating: 4.5, image: '🎡', description: 'Panoramic city views from capsule' },
  { id: 9, name: 'Cooking Workshop', city: 'Paris', category: 'Culinary', price: 100, duration: '4 hours', rating: 4.7, image: '👨‍🍳', description: 'French cuisine masterclass' },
  { id: 10, name: 'Scuba Diving', city: 'Bali', category: 'Adventure', price: 70, duration: '4 hours', rating: 4.8, image: '🤿', description: 'Explore underwater coral reefs' },
  { id: 11, name: 'Museum Visit', city: 'Rome', category: 'Culture', price: 20, duration: '3 hours', rating: 4.6, image: '🎨', description: 'Vatican Museums and Sistine Chapel' },
  { id: 12, name: 'Wine Tasting', city: 'Barcelona', category: 'Culinary', price: 60, duration: '2 hours', rating: 4.7, image: '🍷', description: 'Spanish wine tasting experience' },
]

const categories = ['All', 'Landmark', 'Culinary', 'Adventure', 'Entertainment', 'Historical', 'Culture']

export default function SearchActivitiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceFilter, setPriceFilter] = useState('All')
  const [toast, setToast] = useState<string | null>(null)
  
  const filteredActivities = mockActivities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || activity.category === selectedCategory
    const matchesPrice = 
      priceFilter === 'All' ||
      (priceFilter === 'Low' && activity.price < 30) ||
      (priceFilter === 'Medium' && activity.price >= 30 && activity.price < 70) ||
      (priceFilter === 'High' && activity.price >= 70)
    return matchesSearch && matchesCategory && matchesPrice
  })
  
  const handleAddActivity = (activityName: string) => {
    console.log(`Adding ${activityName} to itinerary`)
    setToast(`${activityName} added to your itinerary! ✅`)
    setTimeout(() => setToast(null), 3000)
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Search Activities</h1>
      <p className="text-gray-600 mb-8">Find exciting things to do on your trip</p>
      
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
            placeholder="Search for activities..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
            🔍 Search
          </button>
        </div>
        
        {/* Category Filters */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Price Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
          <div className="flex flex-wrap gap-2">
            {['All', 'Low (<$30)', 'Medium ($30-$70)', 'High ($70+)'].map((price) => {
              const value = price.split(' ')[0]
              return (
                <button
                  key={value}
                  onClick={() => setPriceFilter(value)}
                  className={`px-4 py-2 rounded-lg transition ${
                    priceFilter === value
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {price}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      
      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">Found <span className="font-semibold">{filteredActivities.length}</span> activities</p>
      </div>
      
      {/* Activities List */}
      {filteredActivities.length > 0 ? (
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-6">
              <div className="flex gap-6">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-5xl flex-shrink-0">
                  {activity.image}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800">{activity.name}</h3>
                      <p className="text-gray-600">📍 {activity.city}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">${activity.price}</div>
                      <div className="text-sm text-gray-600">per person</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{activity.description}</p>
                  
                  <div className="flex gap-4 mb-3 text-sm">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                      {activity.category}
                    </span>
                    <span className="text-gray-600">⏱️ {activity.duration}</span>
                    <span className="text-gray-600">⭐ {activity.rating}</span>
                  </div>
                  
                  <button 
                    onClick={() => handleAddActivity(activity.name)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    Add Activity
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-gray-600 text-lg">No activities found matching your criteria.</p>
          <button 
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('All')
              setPriceFilter('All')
            }}
            className="mt-4 text-blue-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
