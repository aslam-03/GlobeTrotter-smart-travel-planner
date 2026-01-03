export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import cities from '@/data/cities.json';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase();
    const country = searchParams.get('country')?.toLowerCase();
    const region = searchParams.get('region')?.toLowerCase();

    let filtered = cities;

    if (query) {
        filtered = filtered.filter(city =>
            city.name.toLowerCase().includes(query) ||
            city.country.toLowerCase().includes(query)
        );
    }

    if (country) {
        filtered = filtered.filter(city =>
            city.country.toLowerCase() === country
        );
    }

    if (region) {
        filtered = filtered.filter(city =>
            city.region.toLowerCase() === region
        );
    }

    // Return all unique countries and regions for filter dropdowns
    const countries = [...new Set(cities.map(c => c.country))].sort();
    const regions = [...new Set(cities.map(c => c.region))].sort();

    return NextResponse.json({
        cities: filtered,
        countries,
        regions
    });
}
