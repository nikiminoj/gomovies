import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MetricsCard } from "@/components/metrics-card"
import { StatsChart } from "@/components/stats-chart"
import { MovieTable } from "@/components/admin/movie-table"
import { BarChart3, ChevronDown, Globe, Home, LayoutDashboard, LifeBuoy, Settings, Wallet } from "lucide-react"
import { db } from "@/server/db/index";
import { QUERIES } from "@/server/db/queries"

export default async function Page() {
    const moviesCount = (await QUERIES.getMoviesCount())[0]?.count || 0;
    const seriesCount = (await QUERIES.getSeriesCount())[0]?.count || 0;
    return (
        <main className="p-6">
            <div className="mt-6">
                <MovieTable />
            </div>
        </main>
    )
}
