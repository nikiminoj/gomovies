"use client";

import { useTranslations, NextIntlClientProvider } from "next-intl";
import { notFound } from 'next/navigation';
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Label } from "@/components/ui/label";
import { Link } from "@/i18n/navigation";
import { useOs } from "@/lib/utils";

export default function HomePage() {
  const t = useTranslations("HomePage");

  const [searchTerm, setSearchTerm] = useState("");

  const os = useOs();
  const router = useRouter();
  
  const handleSearch = (term:string) => {
    if(term){
      router.push(`/search/${term}`);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {

    if (!searchTerm) {
      return;
    }


    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  return (
    <>
      <main className="container mx-auto p-4 relative">
        <div className="relative">
          <Input
            type="text"
            value={searchTerm}
            placeholder={t("searchPlaceholder")}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            className="mt-2 p-2 rounded w-full relative"
          />

          <Label
            htmlFor="search"
            className="absolute top-3 right-3 text-muted-foreground text-xs pointer-events-none"
          >
            {os === "mac" ? "⌘ k" : "ctrl + k"}
          </Label>
        </div>
      </main>
    </>
  );
}
