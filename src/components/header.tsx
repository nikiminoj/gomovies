"use client"
import { Link } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Header() {
    const t = useTranslations("HomePage");
    const [searchTerm, setSearchTerm] = useState("");

    const router = useRouter();
    const handleSearch = () => {
        router.push(`/search/${searchTerm}`);
    };

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
            <Input
                type="text"
                value={searchTerm}
                onSubmit={handleSearch}
                placeholder={t("searchPlaceholder")}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-2 p-2 rounded bg-gray-700 text-white w-full"
            />
        </header>
    )
}