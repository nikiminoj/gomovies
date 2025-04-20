"use client";

import { useTranslations, NextIntlClientProvider } from "next-intl";
import { notFound } from 'next/navigation';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Link } from "@/i18n/navigation";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const handleSearch = () => {
    router.push(`/search/${searchTerm}`);
  };
  
  return (
    <>
      <main className="container mx-auto p-4">

        <Input
          type="text"
          value={searchTerm}
          onSubmit={handleSearch}
          placeholder={t("searchPlaceholder")}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2 p-2 rounded bg-gray-700 text-white w-full"
        />
      </main>
    </>
  );
}
