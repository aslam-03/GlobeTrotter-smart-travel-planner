# GlobeTrotter - Smart Travel Planner

A modern travel itinerary planning application built with Next.js 14 App Router and Tailwind CSS.

## 🌟 Features

- **Dashboard**: Overview of trips, stats, and quick actions
- **Trip Management**: Create, view, and manage travel itineraries
- **Dynamic Trip Details**: View individual trip information with day-by-day itineraries
- **Search**: Discover cities and activities worldwide
- **Calendar**: Visual calendar view of all trips and events
- **Community**: Share experiences and connect with other travelers
- **Profile**: Manage personal information, preferences, and travel history
- **Admin Dashboard**: Comprehensive admin panel for user and system management

## 📁 Project Structure

```
GlobeTrotter-smart-travel-planner/
├── app/
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Home page (redirects to dashboard)
│   ├── globals.css          # Global styles with Tailwind
│   ├── dashboard/           # Dashboard page
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── trips/               # Trips management
│   │   ├── page.tsx         # All trips list
│   │   ├── create/          # Create new trip
│   │   └── [id]/            # Dynamic trip routes
│   │       ├── page.tsx     # Trip details
│   │       └── itinerary/   # Trip itinerary
│   ├── search/
│   │   ├── cities/          # City search
│   │   └── activities/      # Activity search
│   ├── calendar/            # Calendar view
│   ├── community/           # Community feed
│   ├── profile/             # User profile
│   └── admin/               # Admin dashboard
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

The app will redirect to the dashboard automatically.

## 📄 Available Routes

- `/` - Redirects to dashboard
- `/login` - User login
- `/register` - User registration
- `/dashboard` - Main dashboard
- `/trips` - All trips overview
- `/trips/create` - Create new trip
- `/trips/[id]` - Trip details (dynamic route)
- `/trips/[id]/itinerary` - Detailed itinerary (dynamic route)
- `/search/cities` - Search and browse cities
- `/search/activities` - Search and browse activities
- `/calendar` - Calendar view of trips
- `/community` - Community posts and discussions
- `/profile` - User profile and settings
- `/admin` - Admin dashboard

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks (local state)
- **Data**: Mock data arrays (no backend required)

## 🔧 Development Notes

- All pages use mock/placeholder data
- No authentication logic implemented (UI only)
- No API calls or database connections
- Client-side components marked with 'use client' directive
- Dynamic routes use Next.js App Router params
- Fully responsive design with Tailwind CSS

## 📝 Next Steps

To build upon this skeleton:

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
