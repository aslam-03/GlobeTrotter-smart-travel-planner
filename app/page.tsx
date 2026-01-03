import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-7xl font-bold text-white mb-4 drop-shadow-lg">
              🌍 GlobeTrotter
            </h1>
            <p className="text-2xl text-white/90 font-light">
              Smart Travel Planning Made Simple
            </p>
          </div>

          {/* Value Proposition */}
          <div className="max-w-3xl mb-12">
            <p className="text-xl text-white/95 mb-6 leading-relaxed">
              Plan your dream trips with interactive maps, smart budgeting, and collaborative itineraries. 
              Everything you need to explore the world with confidence.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link 
              href="/register"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition shadow-2xl hover:shadow-3xl hover:scale-105 transform"
            >
              🚀 Get Started Free
            </Link>
            <Link 
              href="/login"
              className="bg-purple-600/30 backdrop-blur text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-purple-600/50 transition shadow-xl"
            >
              🔑 Sign In
            </Link>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition">
              <div className="text-5xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold text-white mb-2">Interactive Maps</h3>
              <p className="text-white/80">
                Visualize your journey with beautiful maps showing your route and destinations
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Budgeting</h3>
              <p className="text-white/80">
                Track expenses in real-time with visual charts and stay within budget
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-white mb-2">Day-by-Day Plans</h3>
              <p className="text-white/80">
                Build detailed itineraries with activities, times, and priorities
              </p>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-white/70 text-sm">
            <p>✨ Built with Next.js 14, TypeScript, Prisma, and Leaflet Maps</p>
          </div>
        </div>
      </div>
    </div>
  )
}
