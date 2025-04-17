"use client";

import { useTranslations, NextIntlClientProvider } from "next-intl";
import { notFound } from 'next/navigation';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const handleSearch = () => {
    router.push(`/search/${searchTerm}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <input
          type="text"
          value={searchTerm}
          onSubmit={handleSearch}
          placeholder={t("searchPlaceholder")}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2 p-2 rounded bg-gray-700 text-white w-full"
        />
      </header>

      <main className="container mx-auto p-4">
      </main>
      <footer className="bg-gray-800 p-4 mt-8">
        <div className="container mx-auto">
          <p className="text-gray-400">{t("footer.questions")}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-gray-400">
            <ul>
              <li><a href="#">{t("footer.faq")}</a></li>
              <li><a href="#">{t("footer.helpCenter")}</a></li>
              <li><a href="#">{t("footer.account")}</a></li>
              <li><a href="#">{t("footer.mediaCenter")}</a></li>
            </ul>
            <ul>
              <li><a href="#">{t("footer.investorRelations")}</a></li>
              <li><a href="#">{t("footer.jobs")}</a></li>
              <li><a href="#">{t("footer.waysToWatch")}</a></li>
              <li><a href="#">{t("footer.termsOfUse")}</a></li>
            </ul>
            <ul>
              <li><a href="#">{t("footer.privacy")}</a></li>
              <li><a href="#">{t("footer.cookiePreferences")}</a></li>
              <li><a href="#">{t("footer.corporateInformation")}</a></li>
              <li><a href="#">{t("footer.contactUs")}</a></li>
            </ul>
            <ul>
              <li><a href="#">{t("footer.speedTest")}</a></li>
              <li><a href="#">{t("footer.legalNotices")}</a></li>
              <li><a href="#">{t("footer.onlyOnNetflix")}</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
