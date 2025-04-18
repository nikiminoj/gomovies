import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MetricsCard } from "@/components/metrics-card"
import { StatsChart } from "@/components/stats-chart"
import { MovieTable } from "@/components/movie-table"
import { BarChart3, ChevronDown, Globe, Home, LayoutDashboard, LifeBuoy, Settings, Wallet } from "lucide-react"
import { db } from "@/server/db/index";
import { QUERIES } from "@/server/db/queries"

export default async function Page() {
    const moviesCount = (await QUERIES.getMoviesCount())[0]?.count || 0;
    const seriesCount = (await QUERIES.getSeriesCount())[0]?.count || 0;
    return (
        <main className="p-6">
            <div className="mb-6 flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold">Overview</h1>
                    <div className="text-sm text-muted-foreground">Aug 13, 2023 - Aug 18, 2023</div>
                </div>
                <Button variant="outline" className="gap-2">
                    Ethereum Network
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
                <MetricsCard
                    title="Your Movies"
                    value={moviesCount.toString()}
                    change={{ value: "$1,340", percentage: "-2.1%", isPositive: false }}
                />
                <MetricsCard
                    title="Your Series"
                    value={seriesCount.toString()}
                    change={{ value: "$1,340", percentage: "+13.2%", isPositive: true }}
                />
            </div>
            <Card className="mt-6 p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">General Statistics</h2>
                    <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                            Today
                        </Button>
                        <Button size="sm" variant="ghost">
                            Last week
                        </Button>
                        <Button size="sm" variant="ghost">
                            Last month
                        </Button>
                        <Button size="sm" variant="ghost">
                            Last 6 month
                        </Button>
                        <Button size="sm" variant="ghost">
                            Year
                        </Button>
                    </div>
                </div>
                <StatsChart />
            </Card>
            <div className="mt-6">
                <MovieTable />
            </div>
        </main>
    )
}
