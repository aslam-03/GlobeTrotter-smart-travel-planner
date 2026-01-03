# GlobeTrotter - Smart Travel Planner 🌍✈️

A **production-ready, full-stack travel planning application** built with modern web technologies. Plan multi-city trips, track budgets, visualize routes on interactive maps, and manage itineraries with an intuitive interface.

> 🏆 **Hackathon-ready**: Complete with database, authentication, REST API, and professional architecture documentation.

## 🌟 Key Features

### Core Functionality
- 🗺️ **Interactive Maps**: Visualize trip routes with Leaflet.js showing city markers and travel paths
- 💰 **Budget Tracking**: Real-time expense monitoring with visual charts (Recharts)
- 📋 **Itinerary Builder**: Day-by-day activity planning with drag-and-drop support
- 📅 **Calendar View**: See all trips in a monthly calendar layout
- 👥 **Community Feed**: Discover and share travel experiences
- 📊 **Admin Dashboard**: Analytics and user management
- 🔐 **Authentication**: Secure JWT-based login/signup with bcrypt password hashing

### Technical Highlights
- ✅ **Full-stack Architecture**: Next.js 14 App Router with API routes
- ✅ **Database Integration**: Prisma ORM with SQLite (production-ready for PostgreSQL)
- ✅ **Type Safety**: End-to-end TypeScript with strict mode
- ✅ **RESTful API**: CRUD endpoints for trips, destinations, activities, expenses
- ✅ **Server Components**: React Server Components for optimal performance
- ✅ **Responsive Design**: Mobile-first Tailwind CSS styling

## 📁 Project Structure

```
GlobeTrotter-smart-travel-planner/
├── app/
│   ├── api/                 # Backend API routes
│   │   ├── auth/           # Authentication endpoints (signup, login, logout)
│   │   └── trips/          # Trip CRUD operations
│   ├── components/          # Reusable UI components
│   │   ├── Map.tsx         # Interactive Leaflet map component
│   │   └── Navbar.tsx      # Smart navigation with auth state
│   ├── context/             # React Context for state management
│   │   └── TripsContext.tsx
│   ├── dashboard/           # Main dashboard
│   ├── login/               # User login
│   ├── register/            # User registration
│   ├── trips/               # Trip management
│   │   ├── page.tsx         # All trips list
│   │   ├── create/          # Create new trip
│   │   └── [id]/            # Dynamic trip routes
│   │       ├── page.tsx     # Trip details with map
│   │       ├── itinerary/   # Itinerary builder with map
│   │       └── budget/      # Budget breakdown with charts
│   ├── calendar/            # Calendar view of all trips
│   ├── community/           # Social features
│   └── admin/               # Analytics dashboard
├── prisma/
│   ├── schema.prisma        # Database schema (5 models)
│   ├── migrations/          # Version-controlled migrations
│   ├── seed.ts              # Demo data seeder
│   └── dev.db               # SQLite database file
├── lib/
│   └── prisma.ts            # Prisma client singleton
├── ARCHITECTURE.md          # Comprehensive system design documentation
├── PRISMA_SETUP.md          # Database setup guide
├── API_TESTING.md           # API testing documentation
└── package.json
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** installed
- **npm** or **yarn** package manager
- Git (for version control)

### Installation & Setup

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd GlobeTrotter-smart-travel-planner

# 2. Install dependencies
npm install

# 3. Set up the database
npx prisma migrate dev

# 4. Seed the database with demo data
npm run db:seed

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Default Demo User
After seeding, you can log in with:
- **Email**: `traveler@globetrotter.com`
- **Password**: `demo123`

## 📄 Available Routes

### Public Pages
- `/` - Redirects to dashboard
- `/login` - User login
- `/register` - User registration

### Protected Pages
- `/dashboard` - Main dashboard with stats and recent trips
- `/trips` - All trips overview
- `/trips/create` - Create new trip form
- `/trips/[id]` - Trip details with interactive map
- `/trips/[id]/itinerary` - Itinerary builder with map visualization
- `/trips/[id]/budget` - Budget breakdown with charts
- `/calendar` - Calendar view of all trips
- `/community` - Community feed (public trips)
- `/admin` - Admin dashboard with analytics

### API Endpoints
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - Session logout
- `GET /api/auth/me` - Get current user
- `GET /api/trips` - List all trips
- `POST /api/trips` - Create new trip
- `GET /api/trips/[id]` - Get trip details

## 🎨 Tech Stack

### Frontend
- **Framework**: Next.js 14.0.0 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.3
- **Charts**: Recharts 3.6.0
- **Maps**: Leaflet 1.9 + React Leaflet 5.0
- **State**: React Context API

### Backend
- **Runtime**: Node.js with Next.js API Routes
- **Database**: Prisma ORM 5.22.0 + SQLite (dev) / PostgreSQL (prod-ready)
- **Authentication**: JWT (jsonwebtoken), bcryptjs
- **ORM Features**: Type-safe queries, migrations, schema versioning

### Development Tools
- **Package Manager**: npm
- **TypeScript**: Strict mode enabled
- **Linting**: ESLint with Next.js config
- **Database GUI**: Prisma Studio (`npm run db:studio`)

## 🗄️ Database Schema

### Models (5 total)
1. **User**: Authentication and profile data
2. **Trip**: Main trip information with dates and budget
3. **Destination**: Cities/locations within a trip
4. **Activity**: Planned activities for each destination
5. **Expense**: Financial tracking for trips

### Relationships
- User → Trips (1:N)
- Trip → Destinations (1:N)
- Trip → Expenses (1:N)
- Destination → Activities (1:N)

See [ARCHITECTURE.md](ARCHITECTURE.md) for detailed ER diagrams and schema design.

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server on localhost:3000

# Database
npx prisma migrate dev   # Create and apply migrations
npm run db:seed          # Populate database with demo data
npm run db:studio        # Open Prisma Studio GUI
npx prisma generate      # Regenerate Prisma Client

# Production
npm run build            # Build for production
npm start                # Start production server

# Testing
node test-api.js         # Test all API endpoints
```

## 📖 Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Complete system architecture, design decisions, and scalability roadmap
- **[PRISMA_SETUP.md](PRISMA_SETUP.md)** - Database setup guide with schema explanations
- **[API_TESTING.md](API_TESTING.md)** - API endpoint documentation with examples

## 🔧 Development Notes

## � Development Notes

### Architecture Highlights
- **Server Components**: Default rendering mode for optimal performance
- **Client Components**: Used for interactivity (forms, maps, charts)
- **API Routes**: RESTful backend within Next.js App Router
- **Type Safety**: End-to-end TypeScript from database to UI
- **Authentication**: JWT tokens in HTTP-only cookies
- **Dynamic Imports**: Maps loaded with SSR disabled (Leaflet requires window)

### Map Integration
The interactive maps use **Leaflet.js** with a static coordinate database for hackathon demo purposes. In production, you'd integrate:
- Google Maps Geocoding API
- OpenStreetMap Nominatim API
- Mapbox Geocoding API

### Database Migration Path
Current: SQLite (file-based, zero config)  
Production: Change `datasource` in `schema.prisma` to PostgreSQL, run migrations

```prisma
// Change from SQLite to PostgreSQL
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## 🎯 Key Features Showcase

### 1. Interactive Trip Maps 🗺️
- **Location**: Trip details page (`/trips/[id]`) and itinerary page
- **Technology**: Leaflet.js with custom markers
- **Features**: 
  - Numbered city markers
  - Dashed route lines connecting destinations
  - Popup cards with dates and info
  - Auto-zoom to fit all markers

### 2. Budget Tracking 💰
- **Location**: Budget page (`/trips/[id]/budget`)
- **Technology**: Recharts (Pie & Bar charts)
- **Features**:
  - Category-wise expense breakdown
  - Budget vs actual spending visualization
  - Real-time progress bars

### 3. Authentication System 🔐
- **Technology**: JWT + bcrypt
- **Security**: 
  - HTTP-only cookies (XSS protection)
  - Hashed passwords (10 salt rounds)
  - Token expiry (7 days)
  - Protected API routes

### 4. Database Integration 🗄️
- **ORM**: Prisma with auto-generated TypeScript types
- **Migrations**: Version-controlled schema changes
- **Seeding**: Demo data for immediate testing
- **Relations**: Proper foreign keys and cascading deletes

## 📈 Scalability Roadmap

This project is designed for easy scaling:

✅ **Immediate** (No code changes):
- Deploy to Vercel (zero-config)
- Use Vercel Edge Network for CDN
- Auto-scaling serverless functions

✅ **Short-term** (1-2 days):
- Migrate to PostgreSQL
- Add Redis for session caching
- Implement rate limiting middleware

✅ **Medium-term** (1-2 weeks):
- Add WebSocket support for real-time collaboration
- Integrate third-party APIs (Google Places, Weather, Flights)
- Add image upload with Cloudinary/S3
- Implement advanced search with Algolia

## 📝 Next Steps & Enhancements

### Planned Features
- [ ] Real-time collaboration (multiple users editing same trip)
- [ ] AI-powered destination recommendations
- [ ] Weather forecasts for trip dates
- [ ] Flight/hotel booking integration
- [ ] Mobile app (React Native with shared API)
- [ ] Email notifications (Resend/SendGrid)
- [ ] Photo gallery with geo-tagging
- [ ] Social features (follow travelers, like trips)

### Backend Improvements
- [ ] Add Redis for caching frequently accessed trips
- [ ] Implement pagination for large trip lists
- [ ] Add GraphQL API as alternative to REST
- [ ] Set up CI/CD pipeline with GitHub Actions
- [ ] Add comprehensive test suite (Jest + Playwright)

## 🏆 Hackathon Talking Points

When presenting this project to judges, highlight:

1. **Full-Stack Competence**: Not just a UI demo – has real database, authentication, and API
2. **Production-Ready Architecture**: Follows industry best practices, documented in [ARCHITECTURE.md](ARCHITECTURE.md)
3. **Type Safety**: End-to-end TypeScript eliminates entire classes of bugs
4. **Modern Stack**: Uses latest Next.js 14 features (Server Components, App Router)
5. **Scalability**: Clear migration path from SQLite → PostgreSQL, easy Vercel deployment
6. **Visual Wow-Factor**: Interactive maps and charts make it demo-friendly
7. **Complete Documentation**: Architecture docs show systems thinking

## 🤝 Contributing

This is a hackathon project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for your own hackathons or learning!

## 👥 Team / Author

Built with ❤️ for hackathon success.

---

**⭐ Star this repo if you found it helpful for your hackathon!**

1. Add authentication (NextAuth.js, Clerk, etc.)
2. Connect to a database (Prisma, Supabase, etc.)
3. Implement API routes for data operations
4. Add real-time features (WebSockets, Pusher, etc.)
5. Integrate external APIs (Google Maps, weather, etc.)
6. Add image uploads and media handling
7. Implement payment processing
8. Add testing (Jest, Playwright)

## 🤝 Contributing

This is a hackathon skeleton project. Feel free to fork and build upon it!

## 📜 License

MIT License - feel free to use this project for your own purposes.
