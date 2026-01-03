import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function DELETE(request: Request, { params }: { params: { tripId: string } }) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { tripId } = params;

        // Check if the trip belongs to the user
        const trip = await prisma.trip.findUnique({ where: { id: tripId } });
        if (!trip || trip.userId !== user.id) {
            return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
        }

        await prisma.trip.delete({ where: { id: tripId } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting trip:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: Request, { params }: { params: { tripId: string } }) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { tripId } = params;

        const trip = await prisma.trip.findUnique({
            where: { id: tripId },
            include: {
                stops: {
                    include: { activities: true },
                    orderBy: { order: 'asc' }
                }
            }
        });

        if (!trip || trip.userId !== user.id) {
            return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 404 });
        }

        return NextResponse.json(trip);
    } catch (error) {
        console.error('Error fetching trip:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
