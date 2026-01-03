import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Hardcoded default user ID (from seed data)
const DEFAULT_USER_ID = 1

// GET /api/trips - Get all trips
export async function GET() {
  try {
    const trips = await prisma.trip.findMany({
      where: {
        userId: DEFAULT_USER_ID
      },
      include: {
        destinations: true,
        expenses: true,
        _count: {
          select: {
            destinations: true,
            expenses: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      count: trips.length,
      trips
    })
  } catch (error) {
    console.error('Error fetching trips:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trips' },
      { status: 500 }
    )
  }
}

// POST /api/trips - Create a new trip
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, startDate, endDate, totalBudget, status } = body

    // Basic validation
    if (!title || !startDate || !endDate || !totalBudget) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, startDate, endDate, totalBudget' },
        { status: 400 }
      )
    }

    // Create trip
    const trip = await prisma.trip.create({
      data: {
        title,
        description: description || null,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalBudget: parseFloat(totalBudget),
        status: status || 'planning',
        userId: DEFAULT_USER_ID
      },
      include: {
        destinations: true,
        expenses: true
      }
    })

    return NextResponse.json({
      success: true,
      trip
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating trip:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create trip' },
      { status: 500 }
    )
  }
}
