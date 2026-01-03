'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarIcon, Loader2 } from 'lucide-react';

export default function NewTripPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const title = formData.get('title');
        const startDate = formData.get('startDate');
        const endDate = formData.get('endDate');
        const description = formData.get('description');
        const isPublic = formData.get('isPublic') === 'on';

        try {
            const res = await fetch('/api/trips', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    startDate,
                    endDate,
                    description,
                    isPublic
                }),
            });

            if (!res.ok) throw new Error('Failed to create trip');

            const trip = await res.json();
            router.push(`/trips/${trip.id}/itinerary`);
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Error creating trip');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Plan a New Adventure</h1>
                <p className="text-muted-foreground mt-2">Start by giving your trip a name and dates.</p>
            </div>

            <div className="bg-card border rounded-lg p-6 shadow-sm">
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Trip Title</label>
                        <input
                            name="title"
                            required
                            placeholder="e.g. Summer in Europe 2024"
                            className="w-full p-2 rounded-md border bg-background"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Start Date</label>
                            <input
                                type="date"
                                name="startDate"
                                required
                                className="w-full p-2 rounded-md border bg-background"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">End Date</label>
                            <input
                                type="date"
                                name="endDate"
                                required
                                className="w-full p-2 rounded-md border bg-background"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                        <textarea
                            name="description"
                            rows={3}
                            className="w-full p-2 rounded-md border bg-background"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="isPublic" id="isPublic" className="h-4 w-4" />
                        <label htmlFor="isPublic" className="text-sm">Make this trip public</label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 flex justify-center items-center"
                    >
                        {isLoading ? <Loader2 className="animate-spin mr-2" /> : 'Create Trip'}
                    </button>
                </form>
            </div>
        </div>
    );
}
