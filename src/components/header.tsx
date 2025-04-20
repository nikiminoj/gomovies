"use client"
import { Bell, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react"
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import Link from "next/link";

export function Header() {
    const { data: session } = useSession();
    const t = useTranslations("HomePage");
    const isLoggedIn = !!session?.user;
    return (
        <header className="bg-gray-800 p-4 flex items-center justify-between">
            <div className="flex items-center">
                <h1 className="text-2xl font-bold mr-4">{t("title")}</h1>
                <Button asChild variant="ghost">
                    <Link href="/movie">
                        Movies
                    </Link>
                </Button>
                <Button asChild variant="ghost">
                    <Link href="/series">
                        Series
                    </Link>
                </Button>
            </div>

            <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                    <>
                        <Button variant="ghost" size="icon">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <Button asChild variant="secondary">
                            <Link href="/account" className="flex items-center">
                                <User className="h-4 w-4 mr-2" />
                                Account
                            </Link>
                        </Button>
                    </>) : (
                    <Button variant="secondary" onClick={() => signIn()}>
                        <User className="h-4 w-4 mr-2" />
                        Getting Started
                    </Button>
                )}
            </div>
        </header>
    );
}