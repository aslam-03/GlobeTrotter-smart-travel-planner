'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTrips } from '../context/TripsContext'

export default function CalendarPage() {
  const { trips, getTripCityStops } = useTrips()
  const [currentDate, setCurrentDate] = useState(new Date())
  
  // Get current month and year
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  
  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startingDayOfWeek = firstDayOfMonth.getDay()
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  
  // Navigate months
  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }
  
  // Check if a date has events
  const getEventsForDate = (day: number) => {
    const dateToCheck = new Date(currentYear, currentMonth, day)
    const events: Array<{ type: 'trip-start' | 'trip-end' | 'trip-ongoing', trip: any, color: string }> = []
    
    trips.forEach((trip) => {
      const tripStart = new Date(trip.startDate)
      const tripEnd = new Date(trip.endDate)
      
      // Normalize dates to midnight for comparison
      tripStart.setHours(0, 0, 0, 0)
      tripEnd.setHours(0, 0, 0, 0)
      dateToCheck.setHours(0, 0, 0, 0)
      
      if (dateToCheck.getTime() === tripStart.getTime()) {
        events.push({ type: 'trip-start', trip, color: 'bg-green-500' })
      } else if (dateToCheck.getTime() === tripEnd.getTime()) {
        events.push({ type: 'trip-end', trip, color: 'bg-red-500' })
      } else if (dateToCheck > tripStart && dateToCheck < tripEnd) {
        events.push({ type: 'trip-ongoing', trip, color: 'bg-blue-500' })
      }
    })
    
    return events
  }
  
  // Create calendar grid
  const calendarDays = []
  
  // Add empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  
  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Travel Calendar</h1>
        <p className="text-gray-600">View all your trips and activities in one place</p>
      </div>
      
      {/* Calendar Controls */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={previousMonth}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ← Previous
          </button>
          <h2 className="text-2xl font-bold text-gray-800">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={nextMonth}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Next →
          </button>
        </div>
        
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          {dayNames.map((day) => (
            <div key={day} className="text-center font-bold text-gray-700 py-2">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="min-h-24 bg-gray-50 rounded"></div>
            }
            
            const events = getEventsForDate(day)
            const dateToCheck = new Date(currentYear, currentMonth, day)
            dateToCheck.setHours(0, 0, 0, 0)
            const isToday = dateToCheck.getTime() === today.getTime()
            
            return (
              <div
                key={day}
                className={`min-h-24 border rounded-lg p-2 ${
                  isToday ? 'bg-yellow-50 border-yellow-400 border-2' : 'bg-white border-gray-200'
                }`}
              >
                <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-yellow-700' : 'text-gray-700'}`}>
                  {day}
                </div>
                <div className="space-y-1">
                  {events.map((event, idx) => (
                    <div
                      key={idx}
                      className={`text-xs px-2 py-1 rounded text-white ${event.color} truncate`}
                      title={event.trip.title}
                    >
                      {event.type === 'trip-start' && '🛫 '}
                      {event.type === 'trip-end' && '🛬 '}
                      {event.type === 'trip-ongoing' && '✈️ '}
                      {event.trip.title}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Legend</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-gray-700">🛫 Trip Start</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span className="text-gray-700">✈️ Trip Ongoing</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
            <span className="text-gray-700">🛬 Trip End</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-yellow-400 rounded mr-2"></div>
            <span className="text-gray-700">Today</span>
          </div>
        </div>
      </div>
      
      {/* Upcoming Trips */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Upcoming Trips</h3>
        {trips.length > 0 ? (
          <div className="space-y-3">
            {trips
              .filter(trip => new Date(trip.startDate) >= today)
              .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
              .slice(0, 5)
              .map((trip) => {
                const startDate = new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                const endDate = new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                const daysUntil = Math.ceil((new Date(trip.startDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                
                return (
                  <Link
                    key={trip.id}
                    href={`/trips/${trip.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800">{trip.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          📅 {startDate} - {endDate}
                        </p>
                        <p className="text-sm text-gray-600">
                          🌍 {trip.citiesCount} {trip.citiesCount === 1 ? 'city' : 'cities'} • 💰 ${trip.totalBudget}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-3 py-1 text-sm font-semibold bg-blue-100 text-blue-800 rounded-full">
                          {daysUntil === 0 ? 'Today!' : `${daysUntil} days`}
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No upcoming trips yet</p>
            <Link href="/trips/create" className="text-blue-600 hover:underline">
              Create your first trip →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
