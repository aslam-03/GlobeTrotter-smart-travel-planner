import Link from 'next/link';
import { Plus, Calendar, MapPin, Search } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function TripsPage() {
    const user = await getCurrentUser();

    if (!user) {
        return <div>Unauthorized</div>;
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

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">My Trips</h1>
                <Link
                    href="/trips/new"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Trip
                </Link>
            </div>

            {trips.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {trips.map((trip: any) => (
                        <Link
                            key={trip.id}
                            href={`/trips/${trip.id}/itinerary`}
                            className="group relative flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-md transition-all hover:scale-105"
                        >
                            <div className="aspect-video bg-muted relative">
                                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-gray-100">
                                    <MapPin className="h-10 w-10 opacity-20" />
                                </div>
                                {trip.isPublic && (
                                    <span className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">Public</span>
                                )}
                            </div>
                            <div className="flex flex-1 flex-col p-4">
                                <h3 className="font-semibold tracking-tight text-lg">{trip.title}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mt-2 mb-4">
                                    {trip.description || "No description provided."}
                                </p>
                                <div className="mt-auto flex items-center justify-between text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(trip.startDate).toLocaleDateString()}
                                    </div>
                                    <div>
                                        {trip._count.stops} Stops
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-lg bg-muted/10 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold">No trips found</h3>
                    <p className="text-muted-foreground max-w-sm mt-2 mb-6">
                        You haven't planned any trips yet. Get started by creating your first itinerary!
                    </p>
                    <Link
                        href="/trips/new"
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium"
                    >
                        Start Planning
                    </Link>
                </div>
            )}
        </div>
    );
}
