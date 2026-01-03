import Prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { BarChart, Users, Map, Activity } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const user = await getCurrentUser();
    // In a real app, check for ADMIN role. For hackathon, any logged in user can view stats or just specific users.
    // I'll allow it for now or check if email is admin@globetrotter.com if I wanted to be strict.

    if (!user) return <div>Unauthorized</div>;

    const stats = {
        totalUsers: await Prisma.user.count(),
        totalTrips: await Prisma.trip.count(),
        activeTrips: await Prisma.trip.count({ where: { endDate: { gte: new Date() } } }),
        totalActivities: await Prisma.activity.count(),
        totalStops: await Prisma.tripStop.count()
    };

    const recentUsers = await Prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, createdAt: true }
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Admin Analytics</h1>
                <p className="text-muted-foreground mt-2">Platform usage overview.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Users</h3>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{stats.totalUsers}</div>
                </div>
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Total Trips</h3>
                        <Map className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{stats.totalTrips}</div>
                </div>
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Active Trips</h3>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{stats.activeTrips}</div>
                </div>
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="flex items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Activities Planned</h3>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="text-2xl font-bold">{stats.totalActivities}</div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold mb-4">Recent Registrations</h3>
                    <div className="space-y-4">
                        {recentUsers.map(u => (
                            <div key={u.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                <div>
                                    <p className="text-sm font-medium leading-none">{u.name}</p>
                                    <p className="text-xs text-muted-foreground">{u.email}</p>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {new Date(u.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm flex items-center justify-center text-muted-foreground">
                    <p>More charts coming soon...</p>
                </div>
            </div>
        </div>
    );
}
