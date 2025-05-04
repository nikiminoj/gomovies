import { db } from "@/server/db";
import { movies, series } from "@/server/db/schema";
import MovieCard from "@/components/movie-card";
import { ilike, eq } from "drizzle-orm";
import { TypographyH1 } from "@/components/ui/typography";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { Filter } from "lucide-react";
import * as motion from "motion/react-client";

interface Props {
  params: { keyword: string };
}

async function searchMovies(searchKeyword: string) {
  return await db
    .select()
    .from(movies)
    .where(ilike(movies.title, `%${searchKeyword}%`))
    .limit(24)
    .offset(0);
}
export default async function SearchResultsPage({ params }: Props) {
  const { keyword } = params;
  const searchResults = await searchMovies(keyword);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <>

        <div className="container mx-auto">
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
            <TypographyH1>Search results for: {decodeURIComponent(keyword)}</TypographyH1>
          </div>

        </div>
        <div className="container mx-auto mt-10 max-w-6xl p-4">
          {searchResults.length === 0 ? (
            <p>No result found for this keyword.</p>
          ) : (
            searchResults.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          )}
        </div>
      </>
    </motion.div >
  );
}
