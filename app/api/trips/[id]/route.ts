import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/trips/[id] - Get a single trip with full details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tripId = parseInt(params.id)

    if (isNaN(tripId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid trip ID' },
        { status: 400 }
      )
    }

    const trip = await prisma.trip.findUnique({
      where: {
        id: tripId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        destinations: {
          include: {
            activities: {
              orderBy: {
                scheduledTime: 'asc'
              }
            }
          },
          orderBy: {
            order: 'asc'
          }
        },
        expenses: {
          orderBy: {
            date: 'desc'
          }
        }
      }
    })

    if (!trip) {
      return NextResponse.json(
        { success: false, error: 'Trip not found' },
        { status: 404 }
      )
    }

    // Calculate total expenses
    const totalExpenses = trip.expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const remainingBudget = trip.totalBudget - totalExpenses

    return NextResponse.json({
      success: true,
      trip: {
        ...trip,
        totalExpenses,
        remainingBudget,
        budgetUsedPercentage: (totalExpenses / trip.totalBudget * 100).toFixed(2)
      }
    })

  } catch (error) {
    console.error('Error fetching trip:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch trip' },
      { status: 500 }
    )
  }
}
