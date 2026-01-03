import Link from 'next/link';
import Prisma from '@/lib/prisma';
import { Calendar, MapPin, User } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CommunityPage() {
    const publicTrips = await Prisma.trip.findMany({
        where: { isPublic: true },
        orderBy: { createdAt: 'desc' },
        include: {
            user: { select: { name: true } },
            _count: { select: { stops: true } }
        },
        take: 20
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Community Trips</h1>
                <p className="text-muted-foreground mt-2">Explore itineraries shared by other travelers.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {publicTrips.map((trip) => (
                    <Link
                        key={trip.id}
                        href={`/public-trip/${trip.id}`}
                        className="group flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                    >
                        <div className="aspect-video bg-muted relative flex items-center justify-center">
                            <MapPin className="h-12 w-12 text-muted-foreground/20" />
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                            <h3 className="font-semibold tracking-tight text-lg group-hover:text-primary transition-colors">{trip.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-2 mb-4">
                                {trip.description || "No description provided."}
                            </p>

                            <div className="mt-auto pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" /> {trip.user.name}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" /> {new Date(trip.startDate).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

                {publicTrips.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No public trips found. Be the first to share yours!
                    </div>
                )}
            </div>
        </div>
    );
}
