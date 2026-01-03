import Link from 'next/link';
import {
    CreditCard,
    Globe,
    Home,
    LayoutDashboard,
    LogOut,
    Map,
    Plus,
    Search,
    Settings,
    User
} from 'lucide-react';

import { getCurrentUser } from '@/lib/auth';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const user = await getCurrentUser();

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-card transition-transform hidden md:translate-x-0 md:block">
                <div className="flex h-16 items-center px-6 border-b">
                    <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary">
                        <Globe className="h-6 w-6" />
                        <span>GlobeTrotter</span>
                    </Link>
                </div>

                <div className="flex flex-col h-[calc(100vh-4rem)] justify-between px-3 py-4">
                    <div className="space-y-1">
                        <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted">
                            <LayoutDashboard className="h-5 w-5" />
                            <span>Dashboard</span>
                        </Link>
                        <Link href="/trips/new" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted">
                            <Plus className="h-5 w-5" />
                            <span>New Trip</span>
                        </Link>
                        <Link href="/trips" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted">
                            <Map className="h-5 w-5" />
                            <span>My Trips</span>
                        </Link>
                        <Link href="/search/cities" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted">
                            <Search className="h-5 w-5" />
                            <span>Explore Cities</span>
                        </Link>
                        <Link href="/community" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted">
                            <User className="h-5 w-5" />
                            <span>Community</span>
                        </Link>
                    </div>

                    <div className="space-y-1 border-t pt-4">
                        {/* Admin Link - Only visible to ADMIN role */}
                        {/* Note: In a client component we'd use useSession, but this is a server component layout (mostly).
                            However, to access user role dynamically here we need to fetch it.
                            The layout is valid as server component.
                        */}
                        {/*
                            Actually DashboardLayout is imported in app/(dashboard)/layout.tsx.
                            Wait, the file content of layout.tsx provided earlier shows it's a default export function DashboardLayout.
                            To check role, we need to make it async and await getCurrentUser().
                        */}
                        {/* @ts-ignore */}
                        {user?.role === 'ADMIN' && (
                            <Link href="/admin" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted">
                                <CreditCard className="h-5 w-5" /> {/* Using CreditCard as an example icon */}
                                <span>Admin Dashboard</span>
                            </Link>
                        )}
                        <Link href="/profile" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted">
                            <Settings className="h-5 w-5" />
                            <span>Settings</span>
                        </Link>
                        {/* Simple logout button handling would be needed here, e.g., calling an API or clearing cookie client-side */}
                        <form action="/api/auth/logout" method="POST">
                            <button type="submit" className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-destructive hover:bg-destructive/10">
                                <LogOut className="h-5 w-5" />
                                <span>Log out</span>
                            </button>
                        </form>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:ml-64">
                {/* Mobile Header, if needed later */}
                <header className="flex h-16 items-center border-b px-6 bg-card md:hidden">
                    <Link href="/dashboard" className="font-bold flex gap-2">
                        <Globe /> GlobeTrotter
                    </Link>
                </header>

                <main className="p-6 md:p-8 max-w-7xl mx-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
