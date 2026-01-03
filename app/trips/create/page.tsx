'use client'

import Link from 'next/link'
import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useTrips } from '../../context/TripsContext'

export default function CreateTripPage() {
  const router = useRouter()
  const { addTrip } = useTrips()
  
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    citiesCount: 1,
    totalBudget: 0,
    description: ''
  })
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Trip name is required'
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    }
    
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date'
    }
    
    if (formData.citiesCount < 1) {
      newErrors.citiesCount = 'At least 1 city is required'
    }
    
    if (formData.totalBudget < 0) {
      newErrors.totalBudget = 'Budget cannot be negative'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    // Add the trip
    addTrip({
      title: formData.title,
      startDate: formData.startDate,
      endDate: formData.endDate,
      citiesCount: formData.citiesCount,
      totalBudget: formData.totalBudget,
      description: formData.description,
      destination: `${formData.citiesCount} ${formData.citiesCount === 1 ? 'city' : 'cities'}`
    })
    
    // Redirect to trips list
    router.push('/trips')
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link href="/trips" className="text-blue-600 hover:underline">
            ← Back to Trips
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Create New Trip</h1>
        <p className="text-gray-600 mb-8">Plan your next adventure by filling out the details below</p>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Trip Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trip Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Summer in Europe"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </div>
            
            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <input 
                  type="date" 
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.startDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date <span className="text-red-500">*</span>
                </label>
                <input 
                  type="date" 
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.endDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
              </div>
            </div>
            
            {/* Number of Cities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Cities
              </label>
              <input 
                type="number" 
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.citiesCount ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="1"
                min="1"
                value={formData.citiesCount}
                onChange={(e) => setFormData({ ...formData, citiesCount: parseInt(e.target.value) || 1 })}
              />
              {errors.citiesCount && <p className="text-red-500 text-sm mt-1">{errors.citiesCount}</p>}
            </div>
            
            {/* Total Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Budget ($)
              </label>
              <input 
                type="number" 
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.totalBudget ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="3000"
                min="0"
                value={formData.totalBudget}
                onChange={(e) => setFormData({ ...formData, totalBudget: parseInt(e.target.value) || 0 })}
              />
              {errors.totalBudget && <p className="text-red-500 text-sm mt-1">{errors.totalBudget}</p>}
            </div>
            
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="Describe your trip plans, preferences, or special notes..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            
            {/* Form Actions */}
            <div className="flex space-x-4 pt-4">
              <button 
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg hover:shadow-xl"
              >
                Create Trip ✈️
              </button>
              <Link 
                href="/trips"
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
        
        {/* Helper Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> After creating your trip, you can add detailed itineraries, activities, and more from the trip details page.
          </p>
        </div>
      </div>
    </div>
  )
}
