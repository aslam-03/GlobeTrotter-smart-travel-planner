import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;

        // Verify ownership
        const destination = await prisma.savedDestination.findUnique({
            where: { id }
        });

        if (!destination || destination.userId !== user.id) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        await prisma.savedDestination.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting saved destination:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
