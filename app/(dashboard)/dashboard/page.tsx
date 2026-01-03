import Link from 'next/link';
import { Plus, Calendar, MapPin } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) {
        return (
            <div className="p-8">
                <h2 className="text-2xl font-bold">Please log in to view your dashboard.</h2>
            </div>
        );
    }

    const trips = await prisma.trip.findMany({
        where: { userId: user.id },
        orderBy: { updatedAt: 'desc' },
        take: 3,
        include: {
            _count: {
                select: { stops: true }
            }
        }
    });

    const stats = {
        totalTrips: await prisma.trip.count({ where: { userId: user.id } }),
        upcomingTrips: await prisma.trip.count({
            where: {
                userId: user.id,
                startDate: { gte: new Date() }
            }
        }),
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}</h1>
                    <p className="text-muted-foreground mt-2">Here's an overview of your travel plans.</p>
                </div>
                <Link
                    href="/trips/new"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Trip
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Trips</h3>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M22 12h-6l-2 7h-2L8 12H2" />
                            <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                        </svg>
                    </div>
                    <div className="text-2xl font-bold">{stats.totalTrips}</div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Upcoming Adventures</h3>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{stats.upcomingTrips}</div>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight">Recent Trips</h2>
                {trips.length === 0 ? (
                    <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
                        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                            <h3 className="mt-4 text-lg font-semibold">No trips created yet</h3>
                            <p className="mb-4 mt-2 text-sm text-muted-foreground">
                                You haven't created any trips. Start planning your next adventure.
                            </p>
                            <Link
                                href="/trips/new"
                                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Trip
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {trips.map((trip) => (
                            <Link
                                key={trip.id}
                                href={`/trips/${trip.id}/itinerary`}
                                className="group relative flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-md transition-all hover:scale-105"
                            >
                                <div className="aspect-video bg-muted relative">
                                    {/* Placeholder for trip image, could be dynamic later */}
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-gray-100">
                                        <MapPin className="h-10 w-10 opacity-20" />
                                    </div>
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
                )}
            </div>
        </div>
    )
}
