import { eachDayOfInterval, format, isSameDay } from 'date-fns';
import Prisma from '@/lib/prisma';
import { MapPin } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function CalendarPage({ params }: { params: { tripId: string } }) {
    const trip = await Prisma.trip.findUnique({
        where: { id: params.tripId },
        include: {
            stops: {
                include: { activities: true },
                orderBy: { arrivalDate: 'asc' }
            }
        }
    });

    if (!trip) return <div>Trip not found</div>;

    const days = eachDayOfInterval({
        start: trip.startDate,
        end: trip.endDate
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Trip Calendar</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-7 bg-muted/20 p-4 rounded-lg">
                {days.map((day) => {
                    // Find stops active on this day
                    const activeStops = trip.stops.filter(stop =>
                        day >= new Date(stop.arrivalDate) && day <= new Date(stop.departureDate)
                    );

                    return (
                        <div key={day.toISOString()} className="bg-card border rounded-md p-3 min-h-[150px] flex flex-col gap-2">
                            <div className="font-semibold border-b pb-1 text-sm bg-muted/50 -m-3 mb-2 p-2">
                                {format(day, 'EEE, MMM d')}
                            </div>

                            {activeStops.map(stop => (
                                <div key={stop.id} className="text-xs space-y-1">
                                    <div className="font-bold flex items-center gap-1 text-primary">
                                        <MapPin className="h-3 w-3" /> {stop.cityName}
                                    </div>
                                    {/* Activities for this stop */}
                                    {stop.activities.map(act => (
                                        <div key={act.id} className="bg-muted p-1 rounded border overflow-hidden truncate">
                                            {act.name}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
