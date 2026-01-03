'use client';

import { useState, useEffect } from 'react';
import { Plus, GripVertical, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Stop {
    id: string;
    cityName: string;
    arrivalDate: string;
    departureDate: string;
    activities: any[];
}

export default function ItineraryPage({ params }: { params: { tripId: string } }) {
    const [stops, setStops] = useState<Stop[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddingStop, setIsAddingStop] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddingActivity, setIsAddingActivity] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        fetchStops();
    }, [params.tripId]);

    async function fetchStops() {
        try {
            const res = await fetch(`/api/trips/${params.tripId}/stops`);
            if (res.ok) {
                const data = await res.json();
                setStops(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSearch(query: string) {
        setSearchQuery(query);
        if (query.length > 2) {
            const res = await fetch(`/api/search/cities?q=${query}`);
            const data = await res.json();
            setSearchResults(data);
        } else {
            setSearchResults([]);
        }
    }

    async function addActivity(e: React.FormEvent<HTMLFormElement>, tripStopId: string) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const cost = formData.get('cost');
        const duration = formData.get('duration');

        await fetch(`/api/trips/${params.tripId}/activities`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tripStopId,
                name,
                cost,
                duration
            })
        });

        setIsAddingActivity(null);
        fetchStops();
        router.refresh();
    }

    async function addStop(city: any) {
        // Default dates (today for now, user needs to edit)
        const today = new Date().toISOString().split('T')[0];

        await fetch(`/api/trips/${params.tripId}/stops`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cityId: city.id,
                cityName: city.name,
                arrivalDate: today,
                departureDate: today,
                order: stops.length
            })
        });

        setIsAddingStop(false);
        setSearchQuery('');
        fetchStops();
        router.refresh();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Itinerary Builder</h2>
                <button
                    onClick={() => setIsAddingStop(true)}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2 hover:opacity-90"
                >
                    <Plus className="h-4 w-4" />
                    Add Destination
                </button>
            </div>

            {isAddingStop && (
                <div className="bg-card border p-4 rounded-lg shadow-sm border-primary animate-in fade-in-20">
                    <label className="block text-sm font-medium mb-2">Search for a City</label>
                    <input
                        autoFocus
                        type="text"
                        className="w-full p-2 border rounded-md"
                        placeholder="Paris, London, Tokyo..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {searchResults.length > 0 && (
                        <ul className="mt-2 text-sm border rounded-md divide-y max-h-48 overflow-y-auto">
                            {searchResults.map(city => (
                                <li
                                    key={city.id}
                                    className="p-2 hover:bg-muted cursor-pointer flex justify-between items-center"
                                    onClick={() => addStop(city)}
                                >
                                    <span>{city.name}, {city.country}</span>
                                    <Plus className="h-4 w-4 text-muted-foreground" />
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="mt-4 flex justify-end">
                        <button
                            onClick={() => setIsAddingStop(false)}
                            className="text-sm text-muted-foreground hover:text-foreground"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="space-y-4">
                {stops.length === 0 && !isLoading && (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg text-muted-foreground">
                        No stops added yet. Start by adding a destination!
                    </div>
                )}

                {stops.map((stop, index) => (
                    <div key={stop.id} className="group bg-card border rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row">
                        <div className="bg-muted w-full md:w-12 flex items-center justify-center border-r">
                            <span className="font-mono text-muted-foreground font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1 p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-bold flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-primary" />
                                        {stop.cityName}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                        <CalendarIcon className="h-4 w-4" />
                                        {new Date(stop.arrivalDate).toLocaleDateString()} - {new Date(stop.departureDate).toLocaleDateString()}
                                    </div>
                                </div>
                                {/* Actions like delete/edit would go here */}
                            </div>

                            <div className="mt-4">
                                <h4 className="text-sm font-semibold mb-2 uppercase tracking-wider text-muted-foreground text-xs">Activities</h4>
                                {stop.activities && stop.activities.length > 0 ? (
                                    <ul className="space-y-2">
                                        {stop.activities.map((activity: any) => (
                                            <li key={activity.id} className="text-sm bg-muted/50 p-2 rounded flex justify-between items-center">
                                                <div className="flex gap-2 items-center">
                                                    <span>{activity.name}</span>
                                                    <span className="text-xs text-muted-foreground">({activity.duration}m)</span>
                                                </div>
                                                <span className="font-mono font-medium">{activity.cost} {activity.currency}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-sm text-muted-foreground italic mb-2">No activities planned yet.</div>
                                )}

                                {isAddingActivity === stop.id ? (
                                    <form onSubmit={(e) => addActivity(e, stop.id)} className="mt-2 p-3 bg-muted/30 rounded-md border text-sm space-y-2">
                                        <input name="name" placeholder="Activity Name" required className="w-full p-1 border rounded" />
                                        <div className="flex gap-2">
                                            <input name="cost" type="number" placeholder="Cost" required className="w-1/2 p-1 border rounded" />
                                            <input name="duration" type="number" placeholder="Duration (min)" required className="w-1/2 p-1 border rounded" />
                                        </div>
                                        <div className="flex gap-2 justify-end pt-2">
                                            <button type="button" onClick={() => setIsAddingActivity(null)} className="text-muted-foreground hover:text-foreground">Cancel</button>
                                            <button type="submit" className="bg-primary text-primary-foreground px-2 py-1 rounded">Save</button>
                                        </div>
                                    </form>
                                ) : (
                                    <button
                                        onClick={() => setIsAddingActivity(stop.id)}
                                        className="mt-2 text-sm text-primary hover:underline flex items-center gap-1"
                                    >
                                        <Plus className="h-3 w-3" /> Add Activity
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
