import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const savedDestinations = await prisma.savedDestination.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(savedDestinations);
    } catch (error) {
        console.error('Error fetching saved destinations:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { cityId, cityName, country, region } = await request.json();

        // Check if already saved
        const existing = await prisma.savedDestination.findUnique({
            where: {
                userId_cityId: {
                    userId: user.id,
                    cityId
                }
            }
        });

        if (existing) {
            return NextResponse.json({ error: 'Destination already saved' }, { status: 400 });
        }

        const savedDestination = await prisma.savedDestination.create({
            data: {
                userId: user.id,
                cityId,
                cityName,
                country,
                region
            }
        });

        return NextResponse.json(savedDestination);
    } catch (error) {
        console.error('Error saving destination:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
