"use client";

import { useTranslations } from "next-intl";

export default function SettingsPage() {
  const t = useTranslations("SettingsPage");

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
      </div>
      <p className="text-muted-foreground">
        {t("description")}
      </p>
      {/* Add your settings content here */}
      <div>
        <p>Placeholder content for settings.</p>
      </div>
    </div>
  );
}