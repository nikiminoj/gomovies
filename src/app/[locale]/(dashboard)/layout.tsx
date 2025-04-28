"use server"
import { Footer } from "@/components/footer";
import { routing } from "@/i18n/routing";
import { Header } from "@radix-ui/react-accordion";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";

export default async function Layout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return <html lang={locale}>
        <body>
            <NextIntlClientProvider>
                {children}
            </NextIntlClientProvider>
        </body>
    </html >
}