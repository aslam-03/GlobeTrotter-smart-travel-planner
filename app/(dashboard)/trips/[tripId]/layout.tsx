import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, LayoutList, Map, PieChart } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export default async function TripLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { tripId: string };
}) {
    const user = await getCurrentUser();
    if (!user) return notFound();

    const trip = await prisma.trip.findUnique({
        where: { id: params.tripId },
    });

    if (!trip) return notFound();

    // Basic check to see if user owns trip or it is public (for viewing)
    // For editing (which this layout mostly serves), must be owner
    if (trip.userId !== user.id) {
        // If implementing shared editing later, change this.
        // For now, only owner can see this dashboard view.
        return <div className="p-8">Unauthorized access to this trip.</div>;
    }

    const tabs = [
        { name: 'Itinerary', href: `/trips/${trip.id}/itinerary`, icon: LayoutList },
        { name: 'Budget', href: `/trips/${trip.id}/budget`, icon: PieChart },
        { name: 'Calendar', href: `/trips/${trip.id}/calendar`, icon: Calendar },
        { name: 'View Public', href: `/public-trip/${trip.id}`, icon: Map },
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold">{trip.title}</h1>
                <div className="flex gap-4 text-muted-foreground">
                    <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{trip.isPublic ? 'Public' : 'Private'}</span>
                </div>
            </div>

            <div className="border-b">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <Link
                            key={tab.name}
                            href={tab.href}
                            className="flex items-center gap-2 whitespace-nowrap border-b-2 border-transparent py-4 px-1 text-sm font-medium text-muted-foreground hover:border-gray-300 hover:text-foreground"
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.name}
                        </Link>
                    ))}
                </nav>
            </div>

            <main>
                {children}
            </main>
        </div>
    );
}
