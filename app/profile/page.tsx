import Link from 'next/link'

const mockUser = {
  name: 'John Traveler',
  email: 'john@example.com',
  joinDate: 'January 2025',
  avatar: '👤',
  bio: 'Passionate traveler exploring the world one destination at a time. Love adventure, culture, and authentic experiences.',
  stats: {
    trips: 12,
    countries: 8,
    cities: 24,
    followers: 156,
    following: 89,
  }
}

const recentTrips = [
  { id: 1, name: 'Paris Adventure', image: '🗼', date: 'Mar 2026' },
  { id: 2, name: 'Tokyo Explorer', image: '🗾', date: 'May 2026' },
  { id: 3, name: 'Bali Retreat', image: '🏝️', date: 'Jul 2026' },
]

const badges = [
  { id: 1, name: 'Explorer', icon: '🌟', description: 'Visited 5+ countries' },
  { id: 2, name: 'Planner Pro', icon: '📋', description: 'Created 10+ trips' },
  { id: 3, name: 'Community Star', icon: '⭐', description: '100+ likes received' },
]

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-6xl flex-shrink-0">
                {mockUser.avatar}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-3xl font-bold">{mockUser.name}</h2>
                    <p className="text-gray-600">{mockUser.email}</p>
                    <p className="text-sm text-gray-500">Member since {mockUser.joinDate}</p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Edit Profile
                  </button>
                </div>
                <p className="text-gray-700 mb-4">{mockUser.bio}</p>
                
                {/* Stats */}
                <div className="grid grid-cols-5 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{mockUser.stats.trips}</div>
                    <div className="text-sm text-gray-600">Trips</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{mockUser.stats.countries}</div>
                    <div className="text-sm text-gray-600">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{mockUser.stats.cities}</div>
                    <div className="text-sm text-gray-600">Cities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{mockUser.stats.followers}</div>
                    <div className="text-sm text-gray-600">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{mockUser.stats.following}</div>
                    <div className="text-sm text-gray-600">Following</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Trips */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Recent Trips</h3>
              <Link href="/trips" className="text-blue-600 hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {recentTrips.map(trip => (
                <Link 
                  key={trip.id}
                  href={`/trips/${trip.id}`}
                  className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg p-6 text-center hover:shadow-lg transition"
                >
                  <div className="text-5xl mb-2">{trip.image}</div>
                  <div className="text-white font-semibold">{trip.name}</div>
                  <div className="text-white text-sm opacity-90">{trip.date}</div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Travel Map */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-2xl font-bold mb-4">Travel Map</h3>
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              🗺️ Interactive map coming soon...
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Achievements</h3>
            <div className="space-y-4">
              {badges.map(badge => (
                <div key={badge.id} className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    {badge.icon}
                  </div>
                  <div>
                    <div className="font-semibold">{badge.name}</div>
                    <div className="text-sm text-gray-600">{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Preferences */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Travel Preferences</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Budget Level:</span>
                <span className="font-semibold">Moderate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Travel Style:</span>
                <span className="font-semibold">Adventure</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Group Size:</span>
                <span className="font-semibold">2-4 people</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition">
              Update Preferences
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-blue-100 text-blue-700 py-2 rounded-lg hover:bg-blue-200 transition">
                Change Password
              </button>
              <button className="w-full bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200 transition">
                Privacy Settings
              </button>
              <button className="w-full bg-purple-100 text-purple-700 py-2 rounded-lg hover:bg-purple-200 transition">
                Notification Settings
              </button>
              <button className="w-full bg-red-100 text-red-700 py-2 rounded-lg hover:bg-red-200 transition">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
