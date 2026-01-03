# GlobeTrotter - Prisma Database Layer

## Overview
This project uses **Prisma ORM** with **SQLite** to implement a real relational database schema for the GlobeTrotter travel planning application. This demonstrates professional data modeling suitable for hackathon presentations.

## Database Schema

### Tables & Relationships

```
User (1) ─────── (N) Trip
                     │
                     ├─── (N) Destination
                     │         │
                     │         └─── (N) Activity
                     │
                     └─── (N) Expense
```

### 1. **User Model**
Represents travelers using the platform.
- `id`: Auto-increment primary key
- `email`: Unique email address
- `name`: User's name
- `createdAt` / `updatedAt`: Timestamps

**Relationships**: One-to-many with Trips

### 2. **Trip Model**
Main travel planning entity representing a complete journey.
- `id`: Auto-increment primary key
- `title`: Trip name
- `description`: Optional trip description
- `startDate` / `endDate`: Trip duration
- `totalBudget`: Planned budget
- `status`: planning | ongoing | completed
- `userId`: Foreign key to User

**Relationships**: 
- Belongs to one User
- Has many Destinations
- Has many Expenses

### 3. **Destination Model**
Cities or places visited within a trip.
- `id`: Auto-increment primary key
- `city` / `country`: Location details
- `startDate` / `endDate`: Stay duration
- `notes`: Optional notes
- `order`: For sorting destinations
- `tripId`: Foreign key to Trip

**Relationships**:
- Belongs to one Trip
- Has many Activities

### 4. **Activity Model**
Things to do at each destination.
- `id`: Auto-increment primary key
- `name`: Activity name
- `description`: Optional description
- `type`: sightseeing | adventure | culture | food | etc.
- `scheduledTime`: When to do it
- `duration`: In minutes
- `cost`: Activity cost
- `priority`: high | medium | low
- `completed`: Boolean status
- `destinationId`: Foreign key to Destination

**Relationships**: Belongs to one Destination

### 5. **Expense Model**
Budget tracking for trips.
- `id`: Auto-increment primary key
- `category`: transport | accommodation | food | activities | shopping | other
- `description`: Expense description
- `amount`: Cost
- `date`: Expense date
- `currency`: Default USD
- `tripId`: Foreign key to Trip

**Relationships**: Belongs to one Trip

## Why This Schema Works for Travel Planning

1. **Hierarchical Structure**: User → Trip → Destination → Activity mirrors real travel planning
2. **Flexible**: Can handle solo trips or group travel (extendable)
3. **Budget Tracking**: Separate Expense model allows detailed financial tracking
4. **Itinerary Support**: Destinations with order + Activities with scheduledTime
5. **Status Management**: Trip status helps track planning stages
6. **Cascading Deletes**: Deleting a trip removes all related data automatically

## Setup Commands

```bash
# 1. Install Prisma
npm install prisma @prisma/client

# 2. Initialize Prisma (already done)
npx prisma init --datasource-provider sqlite

# 3. Apply migrations
npx prisma migrate deploy

# 4. Generate Prisma Client
npx prisma generate

# 5. Seed the database
npm run db:seed
```

## Useful Commands

```bash
# View database in browser (Prisma Studio)
npm run db:studio
# or
npx prisma studio

# Create a new migration after schema changes
npx prisma migrate dev --name description_of_change

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Format schema file
npx prisma format
```

## Prisma Studio

To view and edit your data visually:

```bash
npm run db:studio
```

This opens a browser interface at http://localhost:5555 where you can:
- Browse all tables
- View relationships
- Edit data
- Run queries visually

## Sample Data

The seed script (`prisma/seed.ts`) creates:
- 1 demo user
- 2 complete trips (Europe & Japan)
- 4 destinations (Paris, Rome, Tokyo, Kyoto)
- 9 activities across destinations
- 6 expense entries

## Using Prisma Client in Your App

```typescript
// Import the Prisma client
import { prisma } from '@/lib/prisma'

// Query examples
const trips = await prisma.trip.findMany({
  where: { userId: 1 },
  include: {
    destinations: {
      include: {
        activities: true
      }
    },
    expenses: true
  }
})

// Create a new trip
const newTrip = await prisma.trip.create({
  data: {
    title: 'Summer Vacation',
    startDate: new Date('2026-07-01'),
    endDate: new Date('2026-07-15'),
    totalBudget: 5000,
    userId: 1
  }
})
```

## Technical Stack

- **ORM**: Prisma 5.22.0
- **Database**: SQLite (file-based)
- **Language**: TypeScript
- **Query Builder**: Type-safe Prisma Client
- **Migrations**: Prisma Migrate
- **Location**: `prisma/dev.db`

## For Hackathon Judges

This implementation demonstrates:
- ✅ Real database schema (not just mock data)
- ✅ Proper relational design
- ✅ Cascading relationships
- ✅ Type-safe database queries
- ✅ Migration management
- ✅ Seed data for testing
- ✅ Professional ORM usage

The schema is production-ready and can scale to real-world usage with minimal changes.
