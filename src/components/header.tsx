"use client"
import { Bell, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react"
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import Link from "next/link";
import { TypographyH1 } from "./ui/typography";

export function Header() {
    const { data: session } = useSession();
    const t = useTranslations("HomePage");
    const isLoggedIn = !!session?.user;
    return (
        <header className="bg-background p-4 flex items-center justify-between">
            <div className="flex items-center">
                <TypographyH1 className="text-2xl font-bold mr-4 text-primary">{t("title")}</TypographyH1>
                <Button asChild variant="ghost">
                    <Link href="/movie">
                        Movies
                    </Link>
                </Button>
                <Button asChild variant="ghost">
                    <Link href="/serie">
                        Series
                    </Link>
                </Button>
            </div>

            <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                    <>
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/notifications">
                                <Bell className="h-5 w-5" />
                            </Link>
                        </Button>
                        <Button asChild variant="secondary">
                            <Link href="/account" className="flex items-center">
                                <User className="h-4 w-4 mr-2" />
                                Account
                            </Link>
                        </Button>
                    </>) : (
                    <Button variant="secondary" onClick={() => signIn()} className="cursor-pointer">
                        <User className="h-4 w-4 mr-2" />
                        Getting Started
                    </Button>
                )}
            </div>
        </header>
    );
}