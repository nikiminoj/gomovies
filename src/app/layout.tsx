import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import QueryProvider from "@/components/QueryProvider";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Movie Discovery",
  description: "Explore and discover your favorite movies",
  keywords: ["movies", "film", "cinema", "genre", "country"],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {

  return (
    <SessionProvider>
      <html lang="en" className={`${geist.variable}`}>
        <body>
          <QueryProvider>
            {children}
          </QueryProvider>
          <ToastContainer />
        </body>
      </html>
    </SessionProvider>
  );
}
