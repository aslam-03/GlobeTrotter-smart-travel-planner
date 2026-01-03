import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(
    request: Request,
    { params }: { params: { tripId: string } }
) {
    try {
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const json = await request.json();
        const { tripStopId, name, cost, currency, duration, startTime } = json;

        const activity = await prisma.activity.create({
            data: {
                tripStopId,
                name,
                cost: parseFloat(cost) || 0,
                currency: currency || 'USD',
                duration: parseInt(duration) || 60,
                startTime: startTime ? new Date(startTime) : null // Optional
            }
        });

        return NextResponse.json(activity);
    } catch (error) {
        console.error('Error adding activity:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Get all activities for a trip (useful for budget/calendar flattening)
export async function GET(
    request: Request,
    { params }: { params: { tripId: string } }
) {
    try {
        const activities = await prisma.activity.findMany({
            where: {
                tripStop: {
                    tripId: params.tripId
                }
            },
            include: {
                tripStop: true
            },
            orderBy: {
                tripStop: {
                    arrivalDate: 'asc'
                }
            }
        });

        return NextResponse.json(activities);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
