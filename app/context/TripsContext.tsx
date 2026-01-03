'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface Activity {
  id: number
  name: string
  type: string
  cost: number
  time: string
  description?: string
}

export interface CityStop {
  id: number
  tripId: number
  city: string
  startDate: string
  endDate: string
  activities: Activity[]
}

export interface Trip {
  id: number
  title: string
  startDate: string
  endDate: string
  citiesCount: number
  totalBudget: number
  destination?: string
  description?: string
}

interface TripsContextType {
  trips: Trip[]
  cityStops: CityStop[]
  addTrip: (trip: Omit<Trip, 'id'>) => void
  getTrip: (id: number) => Trip | undefined
  getTripCityStops: (tripId: number) => CityStop[]
  addCityStop: (cityStop: Omit<CityStop, 'id'>) => void
  addActivity: (cityStopId: number, activity: Omit<Activity, 'id'>) => void
}

const TripsContext = createContext<TripsContextType | undefined>(undefined)

const initialTrips: Trip[] = [
  {
    id: 1,
    title: 'Paris Adventure',
    destination: 'Paris, France',
    startDate: '2026-03-15',
    endDate: '2026-03-22',
    citiesCount: 3,
    totalBudget: 3500,
    description: 'A romantic getaway to the City of Light with art, culture, and amazing cuisine.'
  },
  {
    id: 2,
    title: 'Tokyo Explorer',
    destination: 'Tokyo, Japan',
    startDate: '2026-05-10',
    endDate: '2026-05-20',
    citiesCount: 4,
    totalBudget: 5000,
    description: 'Experience the blend of traditional and modern Japan in the bustling capital.'
  },
  {
    id: 3,
    title: 'Bali Retreat',
    destination: 'Bali, Indonesia',
    startDate: '2026-07-05',
    endDate: '2026-07-15',
    citiesCount: 2,
    totalBudget: 2800,
    description: 'Relaxing beach vacation with yoga, surfing, and tropical paradise.'
  },
  {
    id: 4,
    title: 'New York City',
    destination: 'New York, USA',
    startDate: '2026-08-01',
    endDate: '2026-08-07',
    citiesCount: 1,
    totalBudget: 2200,
    description: 'Experience the city that never sleeps.'
  },
  {
    id: 5,
    title: 'Rome Holiday',
    destination: 'Rome, Italy',
    startDate: '2026-09-12',
    endDate: '2026-09-19',
    citiesCount: 2,
    totalBudget: 3000,
    description: 'Explore ancient history and modern Italian life.'
  },
]

const initialCityStops: CityStop[] = [
  {
    id: 1,
    tripId: 1,
    city: 'Paris',
    startDate: '2026-03-15',
    endDate: '2026-03-18',
    activities: [
      { id: 1, name: 'Eiffel Tower Visit', type: 'Sightseeing', cost: 25, time: '10:00 AM', description: 'Iconic landmark' },
      { id: 2, name: 'Louvre Museum', type: 'Culture', cost: 20, time: '2:00 PM', description: 'World-class art' },
    ]
  },
  {
    id: 2,
    tripId: 1,
    city: 'Lyon',
    startDate: '2026-03-18',
    endDate: '2026-03-20',
    activities: [
      { id: 3, name: 'Food Tour', type: 'Culinary', cost: 80, time: '11:00 AM', description: 'French cuisine' },
    ]
  },
]

export function TripsProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(initialTrips)
  const [cityStops, setCityStops] = useState<CityStop[]>(initialCityStops)

  const addTrip = (trip: Omit<Trip, 'id'>) => {
    const newTrip = {
      ...trip,
      id: Math.max(...trips.map(t => t.id), 0) + 1,
    }
    setTrips([...trips, newTrip])
  }

  const getTrip = (id: number) => {
    return trips.find(trip => trip.id === id)
  }

  const getTripCityStops = (tripId: number) => {
    return cityStops.filter(stop => stop.tripId === tripId)
  }

  const addCityStop = (cityStop: Omit<CityStop, 'id'>) => {
    const newCityStop = {
      ...cityStop,
      id: Math.max(...cityStops.map(s => s.id), 0) + 1,
      activities: []
    }
    setCityStops([...cityStops, newCityStop])
  }

  const addActivity = (cityStopId: number, activity: Omit<Activity, 'id'>) => {
    setCityStops(cityStops.map(stop => {
      if (stop.id === cityStopId) {
        const newActivity = {
          ...activity,
          id: Math.max(...stop.activities.map(a => a.id), 0) + 1
        }
        return {
          ...stop,
          activities: [...stop.activities, newActivity]
        }
      }
      return stop
    }))
  }

  return (
    <TripsContext.Provider value={{ trips, cityStops, addTrip, getTrip, getTripCityStops, addCityStop, addActivity }}>
      {children}
    </TripsContext.Provider>
  )
}

export function useTrips() {
  const context = useContext(TripsContext)
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripsProvider')
  }
  return context
}
