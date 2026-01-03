import { notFound } from 'next/navigation';
import Prisma from '@/lib/prisma';
import { Calendar, MapPin, Globe } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PublicTripPage({ params }: { params: { tripId: string } }) {
    const trip = await Prisma.trip.findUnique({
        where: { id: params.tripId },
        include: {
            user: { select: { name: true } },
            stops: {
                include: { activities: true },
                orderBy: { order: 'asc' }
            }
        }
    });

    if (!trip || !trip.isPublic) {
        return notFound();
    }

    const totalCost = trip.stops.reduce((acc, stop) => {
        return acc + stop.activities.reduce((sum, act) => sum + act.cost, 0);
    }, 0);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="font-bold flex items-center gap-2 text-xl">
                        <Globe className="h-6 w-6 text-primary" /> GlobeTrotter
                    </Link>
                    <div>
                        <Link href="/login" className="text-sm font-medium hover:underline">Create your own trip</Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-card rounded-xl border shadow-lg overflow-hidden">
                    <div className="bg-muted p-8 text-center">
                        <h1 className="text-4xl font-bold mb-2">{trip.title}</h1>
                        <p className="text-muted-foreground">{trip.description}</p>
                        <div className="flex items-center justify-center gap-4 mt-4 text-sm font-medium">
                            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>Trip by {trip.user.name}</span>
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Itinerary</h2>
                            <div className="text-lg font-mono font-bold text-primary">Est. Budget: ${totalCost}</div>
                        </div>

                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                            {trip.stops.map((stop, index) => (
                                <div key={stop.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-primary text-primary-foreground shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                        <MapPin className="h-5 w-5" />
                                    </div>

                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow">
                                        <div className="flex items-center justify-between space-x-2 mb-1">
                                            <div className="font-bold text-slate-900">{stop.cityName}</div>
                                            <time className="font-caveat font-medium text-indigo-500">{new Date(stop.arrivalDate).toLocaleDateString()}</time>
                                        </div>
                                        <div className="text-slate-500 text-sm">
                                            {stop.activities.length > 0 ? (
                                                <ul className="list-disc list-inside mt-2 space-y-1">
                                                    {stop.activities.map(act => (
                                                        <li key={act.id}>{act.name}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span className="italic">Free time exploring {stop.cityName}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
