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
        const { cityId, cityName, arrivalDate, departureDate, order } = json;

        const stop = await prisma.tripStop.create({
            data: {
                tripId: params.tripId,
                cityId,
                cityName,
                arrivalDate: new Date(arrivalDate),
                departureDate: new Date(departureDate),
                order: order || 0
            }
        });

        return NextResponse.json(stop);
    } catch (error) {
        console.error('Error adding stop:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(
    request: Request,
    { params }: { params: { tripId: string } }
) {
    const stops = await prisma.tripStop.findMany({
        where: { tripId: params.tripId },
        orderBy: { order: 'asc' },
        include: { activities: true }
    });

    return NextResponse.json(stops);
}
