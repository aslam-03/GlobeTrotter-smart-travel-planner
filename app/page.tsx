import Link from 'next/link'
import { Globe, ArrowRight, MapPin, Calendar, CreditCard, Layout } from 'lucide-react'

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="px-6 h-16 flex items-center justify-between border-b sticky top-0 bg-background/80 backdrop-blur-sm z-50">
                <Link className="flex items-center justify-center gap-2 font-bold text-xl" href="#">
                    <Globe className="h-6 w-6 text-primary" />
                    <span className="text-foreground">GlobeTrotter</span>
                </Link>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="/login">
                        Log In
                    </Link>
                    <Link className="text-sm font-medium hover:underline underline-offset-4" href="/register">
                        Sign Up
                    </Link>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-24 md:py-32 lg:py-48 bg-gradient-to-b from-background to-muted/50 border-b">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2 max-w-3xl">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 pb-2">
                                    Plan Your Next Adventure Like a Pro
                                </h1>
                                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                    Smart itinerary planning, budget tracking, and community inspiration.
                                    The all-in-one platform for the modern traveler.
                                </p>
                            </div>
                            <div className="space-x-4 pt-4">
                                <Link
                                    className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 hover:scale-105"
                                    href="/register"
                                >
                                    Start Planning Free <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                                <Link
                                    className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background/50 backdrop-blur-sm px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                                    href="/community"
                                >
                                    Explore Trips
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                            <div className="flex flex-col items-center md:items-start space-y-4 p-6 border rounded-xl shadow-sm bg-card hover:shadow-md transition-shadow">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold">Multi-City Formatting</h3>
                                <p className="text-muted-foreground">Effortlessly chaining destinations together. We calculate the best order for your trip.</p>
                            </div>
                            <div className="flex flex-col items-center md:items-start space-y-4 p-6 border rounded-xl shadow-sm bg-card hover:shadow-md transition-shadow">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <CreditCard className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold">Smart Budgeting</h3>
                                <p className="text-muted-foreground">Track expenses by category and city. Never overspend on your holidays again.</p>
                            </div>
                            <div className="flex flex-col items-center md:items-start space-y-4 p-6 border rounded-xl shadow-sm bg-card hover:shadow-md transition-shadow">
                                <div className="p-3 rounded-full bg-primary/10 text-primary">
                                    <Layout className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold">Visual Itineraries</h3>
                                <p className="text-muted-foreground">See your trip come to life with beautiful timeline and calendar views.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30 border-t">
                    <div className="container px-4 md:px-6 mx-auto text-center">
                        <h2 className="text-3xl font-bold tracking-tighter mb-4">Ready to go?</h2>
                        <Link
                            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                            href="/register"
                        >
                            Create Your Account
                        </Link>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t font-light text-sm text-muted-foreground">
                <p className="text-xs">© 2024 GlobeTrotter Inc. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="hover:underline underline-offset-4" href="#">
                        Terms of Service
                    </Link>
                    <Link className="hover:underline underline-offset-4" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}
