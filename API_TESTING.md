# GlobeTrotter API Routes - Testing Guide

## Available Endpoints

### 1. GET /api/trips
Get all trips with destinations and expenses

**Example Request:**
```bash
curl http://localhost:3000/api/trips
```

**JavaScript/Fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/trips')
const data = await response.json()
console.log(data)
```

**Expected Response:**
```json
{
  "success": true,
  "count": 2,
  "trips": [
    {
      "id": 1,
      "title": "European Adventure",
      "startDate": "2026-06-01T00:00:00.000Z",
      "endDate": "2026-06-10T00:00:00.000Z",
      "totalBudget": 3500,
      "destinations": [...],
      "expenses": [...],
      "_count": {
        "destinations": 2,
        "expenses": 4
      }
    }
  ]
}
```

---

### 2. POST /api/trips
Create a new trip

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/trips \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Summer Beach Getaway",
    "description": "Relaxing beach vacation in Bali",
    "startDate": "2026-08-15",
    "endDate": "2026-08-25",
    "totalBudget": 2500,
    "status": "planning"
  }'
```

**JavaScript/Fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/trips', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Summer Beach Getaway',
    description: 'Relaxing beach vacation in Bali',
    startDate: '2026-08-15',
    endDate: '2026-08-25',
    totalBudget: 2500,
    status: 'planning'
  })
})
const data = await response.json()
console.log(data)
```

**Expected Response:**
```json
{
  "success": true,
  "trip": {
    "id": 3,
    "title": "Summer Beach Getaway",
    "description": "Relaxing beach vacation in Bali",
    "startDate": "2026-08-15T00:00:00.000Z",
    "endDate": "2026-08-25T00:00:00.000Z",
    "totalBudget": 2500,
    "status": "planning",
    "userId": 1,
    "createdAt": "2026-01-03T...",
    "destinations": [],
    "expenses": []
  }
}
```

---

### 3. GET /api/trips/[id]
Get a single trip with full details (destinations, activities, expenses)

**Example Request:**
```bash
curl http://localhost:3000/api/trips/1
```

**JavaScript/Fetch:**
```javascript
const response = await fetch('http://localhost:3000/api/trips/1')
const data = await response.json()
console.log(data)
```

**Expected Response:**
```json
{
  "success": true,
  "trip": {
    "id": 1,
    "title": "European Adventure",
    "description": "Exploring the beauty of Paris and Rome",
    "startDate": "2026-06-01T00:00:00.000Z",
    "endDate": "2026-06-10T00:00:00.000Z",
    "totalBudget": 3500,
    "status": "planning",
    "user": {
      "id": 1,
      "name": "Demo Traveler",
      "email": "traveler@globetrotter.com"
    },
    "destinations": [
      {
        "id": 1,
        "city": "Paris",
        "country": "France",
        "startDate": "2026-06-01T00:00:00.000Z",
        "endDate": "2026-06-05T00:00:00.000Z",
        "activities": [
          {
            "id": 1,
            "name": "Visit Eiffel Tower",
            "type": "sightseeing",
            "cost": 25,
            "scheduledTime": "2026-06-02T10:00:00.000Z"
          }
        ]
      }
    ],
    "expenses": [
      {
        "id": 1,
        "category": "transport",
        "description": "Flight tickets to Paris",
        "amount": 850,
        "date": "2026-05-01T00:00:00.000Z"
      }
    ],
    "totalExpenses": 2080,
    "remainingBudget": 1420,
    "budgetUsedPercentage": "59.43"
  }
}
```

---

## Quick Test in Browser Console

Open http://localhost:3000 and paste this in browser console:

```javascript
// Test 1: Get all trips
fetch('/api/trips')
  .then(r => r.json())
  .then(d => console.log('All Trips:', d))

// Test 2: Create a new trip
fetch('/api/trips', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Test Trip',
    description: 'API Testing',
    startDate: '2026-12-01',
    endDate: '2026-12-10',
    totalBudget: 3000
  })
})
  .then(r => r.json())
  .then(d => console.log('Created Trip:', d))

// Test 3: Get trip by ID
fetch('/api/trips/1')
  .then(r => r.json())
  .then(d => console.log('Trip Details:', d))
```

---

## What This Demonstrates

### ✅ End-to-End Architecture
1. **Database Layer**: Prisma ORM with SQLite
2. **Backend Layer**: Next.js API routes with proper REST conventions
3. **Relational Data**: Demonstrates joins (destinations → activities, trip → expenses)
4. **Data Aggregation**: Calculates totals and percentages

### ✅ Professional Patterns
- Proper error handling with try/catch
- HTTP status codes (200, 201, 400, 404, 500)
- JSON responses with consistent structure
- Input validation
- Relational data includes with Prisma

### ✅ Hackathon-Ready
- Simple and readable code
- No authentication complexity
- Easy to test and demo
- Real database operations (not mock data)

### ✅ Scalable Foundation
- Can easily add PUT, DELETE methods
- Can add query parameters for filtering
- Can add pagination
- Can integrate with frontend React components
