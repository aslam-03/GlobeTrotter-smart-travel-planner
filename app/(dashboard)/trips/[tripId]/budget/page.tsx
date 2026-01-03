import Prisma from '@/lib/prisma';
import BudgetChart from '@/components/budget/BudgetChart';
import { DollarSign } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function BudgetPage({ params }: { params: { tripId: string } }) {
    const activities = await Prisma.activity.findMany({
        where: {
            tripStop: {
                tripId: params.tripId
            }
        },
        include: {
            tripStop: true
        }
    });

    const totalCost = activities.reduce((sum, act) => sum + act.cost, 0);

    // Group by City
    const byCity = activities.reduce((acc: any, act) => {
        const city = act.tripStop.cityName;
        acc[city] = (acc[city] || 0) + act.cost;
        return acc;
    }, {});

    const chartData = Object.entries(byCity).map(([name, value]) => ({ name, value }));

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold">Trip Budget</h2>
                <p className="text-muted-foreground">Estimate based on planned activities.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-primary" /> Cost Overview
                    </h3>
                    <div className="text-4xl font-bold text-primary">
                        ${totalCost.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Total estimated cost</p>
                </div>

                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold mb-4">Cost Distribution by City</h3>
                    {chartData.length > 0 ? (
                        <BudgetChart data={chartData} />
                    ) : (
                        <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                            No data to display
                        </div>
                    )}
                </div>
            </div>

            <div className="rounded-lg border bg-card">
                <div className="p-6 border-b">
                    <h3 className="font-semibold">Expense Details</h3>
                </div>
                <div className="p-0">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr className="text-left">
                                <th className="p-4 font-medium text-muted-foreground">Activity</th>
                                <th className="p-4 font-medium text-muted-foreground">City</th>
                                <th className="p-4 font-medium text-muted-foreground text-right">Cost</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {activities.length === 0 && (
                                <tr><td colSpan={3} className="p-4 text-center text-muted-foreground">No expenses recorded.</td></tr>
                            )}
                            {activities.map(activity => (
                                <tr key={activity.id}>
                                    <td className="p-4">{activity.name}</td>
                                    <td className="p-4">{activity.tripStop.cityName}</td>
                                    <td className="p-4 text-right font-mono">${activity.cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
