"use client"
import { Link } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Header() {
    const t = useTranslations("HomePage");

    return (
        <header className="bg-gray-800 p-4">
            <h1 className="text-2xl font-bold">{t("title")}</h1>
            <Button asChild>
                <Link href="/movie">
                    Movies
                </Link>
            </Button>
            <Button asChild>
                <Link href="/Series">
                    Series
                </Link>
            </Button>
        </header>
    )
}