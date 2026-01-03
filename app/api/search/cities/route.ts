export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import cities from '@/data/cities.json';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase();

    if (!query) {
        return NextResponse.json(cities.slice(0, 10));
    }

    const filtered = cities.filter(city =>
        city.name.toLowerCase().includes(query) ||
        city.country.toLowerCase().includes(query)
    );

    return NextResponse.json(filtered);
}
