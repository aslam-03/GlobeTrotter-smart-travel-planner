'use client';

import Link from 'next/link';
import { Calendar, MapPin, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TripCardProps {
    trip: {
        id: string;
        title: string;
        description?: string | null;
        startDate: string;
        endDate: string;
        isPublic: boolean;
        _count: { stops: number };
    };
}

export default function TripCard({ trip }: TripCardProps) {
    const router = useRouter();

    async function handleDelete(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (!confirm('Are you sure you want to delete this trip?')) return;
        await fetch(`/api/trips/${trip.id}`, { method: 'DELETE' });
        router.refresh();
    }

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm hover:shadow-md transition-all hover:scale-105">
            <Link
                href={`/trips/${trip.id}/itinerary`}
                className="flex-1"
                style={{ display: 'block' }}
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
                            {new Date(trip.startDate).toISOString().split('T')[0]} - {new Date(trip.endDate).toISOString().split('T')[0]}
                        </div>
                        <div>
                            {trip._count.stops} Stops
                        </div>
                    </div>
                </div>
            </Link>
            <button
                onClick={handleDelete}
                className="absolute top-2 left-2 bg-white/80 hover:bg-red-100 text-red-600 rounded-full p-1 shadow transition-colors"
                title="Delete trip"
            >
                <Trash2 className="h-5 w-5" />
            </button>
        </div>
    );
}
