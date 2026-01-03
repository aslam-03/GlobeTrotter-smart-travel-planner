# 🌍 GlobeTrotter - Smart Travel Planner

GlobeTrotter is a full-stack production-grade travel itinerary planning platform featuring multi-city trip management, automatic budget calculations, itinerary visualization, and community sharing.

## ✨ Features

- **Trip Planning**: Create multi-city trips with date ranges.
- **Itinerary Builder**: Drag-and-drop style itinerary management (ordered stops).
- **Activity Management**: Add detailed activities with costs and durations.
- **Budget Engine**: Real-time automatic budget calculation and visualization.
- **Visualization**:
  - 📅 Calendar View
  - 📊 Budget Charts (Pie charts by city)
  - 🗺️ Timeline View
- **Community**: Share trips publicly and explore community itineraries.
- **Authentication**: Secure email/password login.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Charts**: Recharts
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL Database URL (Supabase recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/globetrotter.git
   cd globetrotter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/db?pgbouncer=true"
   DIRECT_URL="postgresql://user:password@host:5432/db"
   # Add any other secrets here
   ```

4. **Initialize Database**
   Push the Prisma schema to your database:
   ```bash
   npx prisma db push
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
globetrotter/
├── app/                  # Next.js App Router pages & API routes
│   ├── (auth)/           # Authentication routes (Login/Register)
│   ├── (dashboard)/      # Protected User Dashboard
│   ├── api/              # Backend API endpoints
│   └── page.tsx          # Landing Page
├── components/           # Reusable UI components
├── lib/                  # Utilities (Prisma, Auth, Constants)
├── prisma/               # Database Schema
├── public/               # Static assets
└── styles/               # Global styles & Tailwind
```

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes
4. Push to the Branch
5. Open a Pull Request

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
