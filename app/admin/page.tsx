'use client'

import { useTrips } from '../context/TripsContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const mockAnalytics = {
  totalUsers: 1247,
  totalTrips: 389,
  activeUsers: 856,
  avgBudget: 3250
}

const popularCities = [
  { name: 'Tokyo', visits: 145, color: '#3B82F6' },
  { name: 'Paris', visits: 132, color: '#10B981' },
  { name: 'New York', visits: 128, color: '#F59E0B' },
  { name: 'London', visits: 98, color: '#EF4444' },
  { name: 'Barcelona', visits: 87, color: '#8B5CF6' }
]

const monthlyData = [
  { month: 'Aug', trips: 45, users: 67 },
  { month: 'Sep', trips: 52, users: 89 },
  { month: 'Oct', trips: 78, users: 124 },
  { month: 'Nov', trips: 91, users: 156 },
  { month: 'Dec', trips: 123, users: 203 }
]

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

export default function AdminPage() {
  const { trips } = useTrips()
  
  // Calculate real stats from actual trips
  const actualTrips = trips.length
  const totalBudget = trips.reduce((sum, trip) => sum + trip.totalBudget, 0)
  const avgTripBudget = actualTrips > 0 ? Math.round(totalBudget / actualTrips) : 0
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of platform analytics and activity</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
          <div className="text-4xl mb-2">👥</div>
          <div className="text-3xl font-bold mb-1">{mockAnalytics.totalUsers}</div>
          <div className="text-blue-100">Total Users</div>
          <div className="mt-2 text-sm text-blue-100">+12% this month</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
          <div className="text-4xl mb-2">✈️</div>
          <div className="text-3xl font-bold mb-1">{mockAnalytics.totalTrips}</div>
          <div className="text-green-100">Total Trips</div>
          <div className="mt-2 text-sm text-green-100">+18% this month</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <div className="text-4xl mb-2">🔥</div>
          <div className="text-3xl font-bold mb-1">{mockAnalytics.activeUsers}</div>
          <div className="text-purple-100">Active Users</div>
          <div className="mt-2 text-sm text-purple-100">+8% this month</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white">
          <div className="text-4xl mb-2">💰</div>
          <div className="text-3xl font-bold mb-1">${mockAnalytics.avgBudget}</div>
          <div className="text-orange-100">Avg Trip Budget</div>
          <div className="mt-2 text-sm text-orange-100">+15% this month</div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Popular Cities */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Destinations</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={popularCities}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => entry.name}
                outerRadius={100}
                fill="#8884d8"
                dataKey="visits"
              >
                {popularCities.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {popularCities.map((city, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index] }}
                  ></div>
                  <span className="text-gray-700">{city.name}</span>
                </div>
                <span className="font-bold text-gray-800">{city.visits} visits</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Monthly Growth */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Monthly Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="trips" fill="#3B82F6" name="Trips Created" />
              <Bar dataKey="users" fill="#10B981" name="New Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Recent Trips Table */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recent Trips from Users</h2>
          <span className="text-sm text-gray-600">{actualTrips} total trips in system</span>
        </div>
        
        {trips.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Trip Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Start Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Cities</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Budget</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {trips.slice(0, 10).map((trip) => {
                  const today = new Date()
                  const startDate = new Date(trip.startDate)
                  const endDate = new Date(trip.endDate)
                  const status = 
                    today < startDate ? 'Upcoming' :
                    today > endDate ? 'Completed' : 'Active'
                  
                  return (
                    <tr key={trip.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-800">{trip.title}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{trip.citiesCount}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-green-600">${trip.totalBudget}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                          status === 'Active' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No trips in the system yet</p>
          </div>
        )}
      </div>
      
      {/* System Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">📊 Platform Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Actual Trips:</span>
              <span className="font-bold text-gray-800">{actualTrips}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Budget:</span>
              <span className="font-bold text-gray-800">${avgTripBudget}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Budget:</span>
              <span className="font-bold text-gray-800">${totalBudget.toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">🌍 Coverage</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Countries:</span>
              <span className="font-bold text-gray-800">48</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cities:</span>
              <span className="font-bold text-gray-800">324</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Activities:</span>
              <span className="font-bold text-gray-800">1,247</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">⚡ Performance</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Uptime:</span>
              <span className="font-bold text-green-600">99.9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Avg Load Time:</span>
              <span className="font-bold text-gray-800">1.2s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">API Calls:</span>
              <span className="font-bold text-gray-800">45.2K</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
