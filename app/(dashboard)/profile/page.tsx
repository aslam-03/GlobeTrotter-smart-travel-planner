import Prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export default async function ProfilePage() {
    const user = await getCurrentUser();
    if (!user) return <div>Please log in</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Profile Settings</h1>
                <p className="text-muted-foreground mt-2">Manage your account and preferences.</p>
            </div>

            <div className="bg-card border rounded-lg p-6 shadow-sm space-y-6">
                <div className="grid gap-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <div className="p-2 bg-muted rounded border">{user.name}</div>
                </div>
                <div className="grid gap-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <div className="p-2 bg-muted rounded border">{user.email}</div>
                </div>

                <div className="pt-4 border-t">
                    <h3 className="text-lg font-medium mb-4">Account Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                            <div className="text-2xl font-bold">
                                {await Prisma.trip.count({ where: { userId: user.id } })}
                            </div>
                            <div className="text-xs text-muted-foreground uppercase tracking-wider">Trips Created</div>
                        </div>
                        {/* Add more stats if needed */}
                    </div>
                </div>
            </div>
        </div>
    );
}
