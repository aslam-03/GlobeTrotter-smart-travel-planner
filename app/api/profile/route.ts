import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const profile = await prisma.user.findUnique({
            where: { id: user.id },
            select: {
                id: true,
                name: true,
                email: true,
                photo: true,
                language: true,
                createdAt: true,
                _count: {
                    select: {
                        trips: true,
                        savedDestinations: true
                    }
                }
            }
        });

        return NextResponse.json(profile);
    } catch (error) {
        console.error('Error fetching profile:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { name, email, photo, language } = await request.json();

        // Check if email is already taken by another user
        if (email && email !== user.email) {
            const existingUser = await prisma.user.findUnique({ where: { email } });
            if (existingUser) {
                return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                name: name || undefined,
                email: email || undefined,
                photo: photo || undefined,
                language: language || undefined
            },
            select: {
                id: true,
                name: true,
                email: true,
                photo: true,
                language: true
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Delete the user (cascade will delete related data)
        await prisma.user.delete({
            where: { id: user.id }
        });

        // Clear the auth cookie
        cookies().delete('token');

        return NextResponse.json({ success: true, message: 'Account deleted' });
    } catch (error) {
        console.error('Error deleting account:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
