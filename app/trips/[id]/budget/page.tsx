'use client'

import Link from 'next/link'
import { useTrips } from '../../../context/TripsContext'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function BudgetPage({ params }: { params: { id: string } }) {
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
  
  // Calculate budget breakdown (mock data based on trip budget)
  const budgetBreakdown = [
    { category: 'Transport', amount: Math.round(trip.totalBudget * 0.30), color: '#3B82F6' },
    { category: 'Stay', amount: Math.round(trip.totalBudget * 0.35), color: '#10B981' },
    { category: 'Activities', amount: Math.round(trip.totalBudget * 0.20), color: '#F59E0B' },
    { category: 'Food', amount: Math.round(trip.totalBudget * 0.15), color: '#EF4444' }
  ]
  
  // Calculate daily breakdown
  const tripDays = Math.ceil((new Date(trip.endDate).getTime() - new Date(trip.startDate).getTime()) / (1000 * 60 * 60 * 24)) || 1
  const avgCostPerDay = Math.round(trip.totalBudget / tripDays)
  
  // Mock daily expenses for chart
  const dailyExpenses = Array.from({ length: Math.min(tripDays, 7) }, (_, i) => ({
    day: `Day ${i + 1}`,
    planned: avgCostPerDay,
    spent: Math.round(avgCostPerDay * (0.7 + Math.random() * 0.4))
  }))
  
  // Calculate actual spent from activities
  const actualSpent = cityStops.reduce((total, stop) => {
    return total + stop.activities.reduce((sum, activity) => sum + activity.cost, 0)
  }, 0)
  
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href={`/trips/${params.id}`} className="text-blue-600 hover:underline mb-2 inline-block">
          ← Back to Trip Details
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Budget Breakdown</h1>
        <p className="text-gray-600">{trip.title}</p>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-sm text-gray-600 mb-1">Total Budget</div>
          <div className="text-3xl font-bold text-gray-800">${trip.totalBudget}</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-sm text-gray-600 mb-1">Spent So Far</div>
          <div className="text-3xl font-bold text-green-600">${actualSpent}</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-sm text-gray-600 mb-1">Remaining</div>
          <div className="text-3xl font-bold text-blue-600">${trip.totalBudget - actualSpent}</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-sm text-gray-600 mb-1">Avg Per Day</div>
          <div className="text-3xl font-bold text-purple-600">${avgCostPerDay}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Category Breakdown - Pie Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Budget by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.category}: $${entry.amount}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="amount"
              >
                {budgetBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Category List */}
          <div className="mt-6 space-y-3">
            {budgetBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded mr-3" style={{ backgroundColor: item.color }}></div>
                  <span className="font-semibold text-gray-700">{item.category}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-800 font-bold mr-2">${item.amount}</span>
                  <span className="text-sm text-gray-500">
                    ({Math.round((item.amount / trip.totalBudget) * 100)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Daily Expenses - Bar Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyExpenses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="planned" fill="#3B82F6" name="Planned" />
              <Bar dataKey="spent" fill="#10B981" name="Spent" />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">Trip Duration:</span>
              <span className="text-gray-800">{tripDays} days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">Average Daily Cost:</span>
              <span className="text-gray-800 font-bold">${avgCostPerDay}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Expense Items */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Activity Expenses</h2>
        {cityStops.length > 0 ? (
          <div className="space-y-6">
            {cityStops.map((stop) => (
              <div key={stop.id}>
                <h3 className="text-xl font-bold text-gray-700 mb-3">{stop.city}</h3>
                <div className="space-y-2">
                  {stop.activities.length > 0 ? (
                    stop.activities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-gray-600 mr-3">{activity.time}</span>
                          <span className="font-semibold text-gray-800">{activity.name}</span>
                          <span className="ml-2 px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
                            {activity.type}
                          </span>
                        </div>
                        <span className="font-bold text-gray-800">${activity.cost}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No activities added yet</p>
                  )}
                </div>
                {stop.activities.length > 0 && (
                  <div className="mt-2 text-right">
                    <span className="text-sm text-gray-600">Subtotal: </span>
                    <span className="font-bold text-gray-800">
                      ${stop.activities.reduce((sum, act) => sum + act.cost, 0)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No expenses recorded yet. Add activities to track your budget!</p>
        )}
      </div>
      
      {/* Budget Tips */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">💡 Budget Tips</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Book transportation and accommodation early for better rates</li>
          <li>• Set aside 10-15% of your budget for unexpected expenses</li>
          <li>• Look for free walking tours and local experiences</li>
          <li>• Use local transportation instead of taxis to save money</li>
        </ul>
      </div>
    </div>
  )
}
