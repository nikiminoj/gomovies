import "@/styles/globals.css";
import QueryProvider from "@/components/QueryProvider";
import { ToastContainer } from "react-toastify";
import { Toaster } from "@/components/ui/sonner"
import { Geist } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { Analytics } from "@vercel/analytics/react"
import { routing } from '@/i18n/routing';
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
    title: "Go Movies",
    description: "Explore and discover your favorite movies",
    keywords: ["movies", "film", "cinema", "genre", "country"],
};

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist-sans",
});

export default async function RootLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode,
    params: Promise<{ locale: string }>
}>) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <SessionProvider>
            <html lang={locale} className={`${geist.variable}`}>
                <body>
                    <NextIntlClientProvider>
                        <QueryProvider>
                            {children}
                            <ToastContainer />
                            <Toaster />
                        </QueryProvider>
                    </NextIntlClientProvider>
                    <Analytics />
                </body>
            </html>
        </SessionProvider>
    );
}