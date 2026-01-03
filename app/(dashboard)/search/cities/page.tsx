'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Plus, Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface City {
    id: string;
    name: string;
    country: string;
    region: string;
}

interface Trip {
    id: string;
    title: string;
}

export default function SearchCitiesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [cities, setCities] = useState<City[]>([]);
    const [countries, setCountries] = useState<string[]>([]);
    const [regions, setRegions] = useState<string[]>([]);
    const [trips, setTrips] = useState<Trip[]>([]);
    const [selectedTrip, setSelectedTrip] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showTripModal, setShowTripModal] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchCities();
        fetchTrips();
    }, []);

    useEffect(() => {
        fetchCities();
    }, [searchQuery, selectedCountry, selectedRegion]);

    async function fetchCities() {
        setIsLoading(true);
        const params = new URLSearchParams();
        if (searchQuery) params.set('q', searchQuery);
        if (selectedCountry) params.set('country', selectedCountry);
        if (selectedRegion) params.set('region', selectedRegion);

        const res = await fetch(`/api/search/cities?${params.toString()}`);
        const data = await res.json();
        setCities(data.cities || []);
        setCountries(data.countries || []);
        setRegions(data.regions || []);
        setIsLoading(false);
    }

    async function fetchTrips() {
        const res = await fetch('/api/trips');
        if (res.ok) {
            const data = await res.json();
            setTrips(data);
        }
    }

    async function handleAddToTrip(city: City) {
        if (!selectedTrip) {
            setMessage('Please select a trip first.');
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        const res = await fetch(`/api/trips/${selectedTrip}/stops`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cityId: city.id,
                cityName: city.name,
                arrivalDate: today,
                departureDate: today,
                order: 0
            })
        });

        if (res.ok) {
            setMessage(`Added ${city.name} to your trip!`);
            setShowTripModal(null);
            setTimeout(() => setMessage(''), 3000);
        } else {
            setMessage('Failed to add city to trip.');
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Search Cities</h1>
            </div>

            {message && (
                <div className="bg-green-100 text-green-700 p-3 rounded-md text-sm">
                    {message}
                </div>
            )}

            {/* Search and Filters */}
            <div className="bg-card border rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search cities by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 p-2 border rounded-md"
                    />
                </div>

                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            className="p-2 border rounded-md text-sm"
                        >
                            <option value="">All Countries</option>
                            {countries.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <select
                            value={selectedRegion}
                            onChange={(e) => setSelectedRegion(e.target.value)}
                            className="p-2 border rounded-md text-sm"
                        >
                            <option value="">All Regions</option>
                            {regions.map(region => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                    </div>

                    {(selectedCountry || selectedRegion || searchQuery) && (
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCountry('');
                                setSelectedRegion('');
                            }}
                            className="text-sm text-primary hover:underline"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
            </div>

            {/* Cities List */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {isLoading ? (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                        Loading cities...
                    </div>
                ) : cities.length === 0 ? (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                        No cities found matching your criteria.
                    </div>
                ) : (
                    cities.map(city => (
                        <div
                            key={city.id}
                            className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-primary" />
                                        {city.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {city.country}
                                    </p>
                                    <span className="inline-block mt-2 text-xs bg-muted px-2 py-1 rounded">
                                        {city.region}
                                    </span>
                                </div>
                                <button
                                    onClick={() => setShowTripModal(city.id)}
                                    className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm flex items-center gap-1 hover:opacity-90"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add to Trip
                                </button>
                            </div>

                            {/* Trip Selection Modal */}
                            {showTripModal === city.id && (
                                <div className="mt-4 p-3 bg-muted/50 rounded-md border">
                                    <label className="block text-sm font-medium mb-2">Select a Trip</label>
                                    {trips.length === 0 ? (
                                        <p className="text-sm text-muted-foreground">
                                            No trips available. <a href="/trips/new" className="text-primary hover:underline">Create one</a>
                                        </p>
                                    ) : (
                                        <>
                                            <select
                                                value={selectedTrip}
                                                onChange={(e) => setSelectedTrip(e.target.value)}
                                                className="w-full p-2 border rounded-md text-sm mb-2"
                                            >
                                                <option value="">Choose a trip...</option>
                                                {trips.map(trip => (
                                                    <option key={trip.id} value={trip.id}>{trip.title}</option>
                                                ))}
                                            </select>
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    onClick={() => setShowTripModal(null)}
                                                    className="text-sm text-muted-foreground hover:text-foreground"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => handleAddToTrip(city)}
                                                    className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
