import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const json = await request.json();
        const { title, startDate, endDate, description, isPublic } = json;

        const trip = await prisma.trip.create({
            data: {
                title,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                description,
                isPublic: isPublic || false,
                userId: user.id
            }
        });

        return NextResponse.json(trip);
    } catch (error) {
        console.error('Error creating trip:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const trips = await prisma.trip.findMany({
            where: { userId: user.id },
            orderBy: { startDate: 'desc' },
            include: {
                _count: {
                    select: { stops: true }
                }
            }
        });

        return NextResponse.json(trips);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
