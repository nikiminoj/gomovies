import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wallet, LayoutDashboard, BarChart3, Globe, Home, ChevronDown, LifeBuoy, Link, Settings } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <div className="min-h-screen bg-black text-white">
        <div className="grid lg:grid-cols-[280px_1fr]">
            <aside className="border-r bg-background/50 backdrop-blur">
                <div className="flex h-16 items-center gap-2 border-b px-6">
                    <Wallet className="h-6 w-6" />
                    <span className="font-bold">Vaultify</span>
                </div>
                <div className="px-4 py-4">
                    <Input placeholder="Search" className="bg-background/50" />
                </div>
                <nav className="space-y-2 px-2">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Statistics & Income
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <BarChart3 className="h-4 w-4" />
                        Traffic
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <Globe className="h-4 w-4" />
                        Movies
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <Home className="h-4 w-4" />
                        Episodes
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <Wallet className="h-4 w-4" />
                        Yield Vaults
                        <ChevronDown className="ml-auto h-4 w-4" />
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        <LifeBuoy className="h-4 w-4" />
                        Support
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2">
                        {/* <Link href="/dashboard/settings"> */}
                            <Settings className="h-4 w-4" />
                        {/* </Link> */}
                        Settings
                    </Button>
                </nav>
            </aside>
            {children}
        </div>
    </div >
}