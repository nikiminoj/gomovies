"use client";

import * as motion from "motion/react-client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import type { DB_SerieType } from "@/server/db/schema";
import { TypographyH1 } from "@/components/ui/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Filter } from "@/components/filter";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import SerieCard from "@/components/series/serie-card";


const ITEMS_PER_PAGE = 24;

interface SerieData {
  series: DB_SerieType[];
  count: number;
}

const fetchSeries = async (page: number, limit: number) => {
  const res = await fetch(`/api/series?page=${page}&limit=${limit}`);
  if (!res.ok) {
    throw new Error("Failed to fetch series");
  }
  const response = (await res.json()) as SerieData;

  return {
    series: response.series.map((serie) => ({
      ...serie,
      releaseDate: serie.releaseDate ? new Date(serie.releaseDate) : null,
    })), count: response.count
  }
};

export default function SeriePage() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 0
  const router = useRouter();

  const {
    data: seriesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["series", page],
    queryFn: () => fetchSeries(page, ITEMS_PER_PAGE),
    // keepPreviousData: true,
  });

  const allSeries = seriesData?.series ?? [];
  const seriesCount = seriesData?.count ?? 0;

  console.log(allSeries);

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    > <>{isLoading ? (
      <div>Loading...</div>
    ) : isError ? (
      <div>Error: {(error as Error).message ?? "Something went wrong"}</div>
    ) : (
      <><div className="container mx-auto">
        <Accordion type="single" collapsible>
          <AccordionItem value="filter">
            <AccordionTrigger>Filter
            </AccordionTrigger>
            <AccordionContent>
              <Filter />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex flex-row items-center justify-between">
          <TypographyH1>Popular Series</TypographyH1>
        </div>
      </div>
        <div className="container mx-auto mt-10 max-w-6xl p-4">
          <div><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allSeries.map((serie) => (
              <SerieCard key={serie.id} serie={serie} />
            ))}
          </div>
            <Pagination
              totalPages={Math.ceil(seriesCount / ITEMS_PER_PAGE)}
              onPageChange={handlePageChange} />
          </div>
        </div></>
    )}</></motion.div>
  );
}
