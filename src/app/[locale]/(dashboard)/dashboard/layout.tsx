"use client";

import { Button } from "@/components/ui/button";
import {
  Wallet,
  LayoutDashboard,
  BarChart3,
  Globe,
  Home,
  ChevronDown,
  LifeBuoy,
  Settings,
  Search,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useState, useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  return (
    <div className="min-h-screen">
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandEmpty>No results found.</CommandEmpty>
      </CommandDialog>
        <div className="min-h-screen ">
            <div className="grid lg:grid-cols-[280px_1fr]">
                <aside className="border-r bg-background/50 backdrop-blur">
                    <div className="flex h-16 items-center gap-2 border-b px-6">
                        <Wallet className="h-6 w-6" />
                        <span className="font-bold">Go Movies</span>
                    </div>
                    <div className="px-4 py-4">
                        <Button className="w-full justify-start gap-2" variant={"outline"}>
                            <Search className="h-4 w-4" />
                             Search
                        </Button>
                    </div>
                        <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                            <Link href="/dashboard/movies">
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <BarChart3 className="h-4 w-4" />
                            Statistics & Income
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                            <Link href="/dashboard/traffics">
                                <BarChart3 className="h-4 w-4" />
                                Traffic
                            </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                            <Link href="/dashboard/movies">
                                <Globe className="h-4 w-4" />
                                Movies
                            </Link>
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                            <Link href="/dashboard/series">
                                <Home className="h-4 w-4" />
                                Series
                            </Link>
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
                        <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                            <Link href="/dashboard/settings">
                                <Settings className="h-4 w-4" />
                                Settings
                            </Link>
                        </Button>
                </aside>
                {children}
            </div>
        </div>
    </div>
  );
};