"use server";
// import { db } from "@/server/db";
// import { movies, series } from "@/server/db/schema";
// import { isNull, and, eq } from 'drizzle-orm';
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { TypographyH4, TypographyP } from "@/components/ui/typography";
import { dummyMovies } from "@/lib/dummy";
import { type DB_SerieType } from "@/server/db/schema";
import {Episodes} from "./_components/episodes";

interface MovieWithSeason {
    season: string;
    episodes: typeof movies.$inferSelect[];
}

export default async function ShowSeriePage({ params }: Readonly<{
    params: Promise<{ id: string }>
}>) {

    const { id } = await params;
    // const serie = await db.query.series.findFirst({ where: eq(series.id, id) });
    const serie: DB_SerieType = {
        id: "1",
        title: "Dummy Serie",
        description: "Description of the dummy serie",
        releaseDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    };
    if (!serie) {
        return notFound();
    }
    // const allMovies = await db.query.movies.findMany({ where: eq(movies.serieId, id) });
    
    
    return <div className="container mx-auto">
        <div className="rounded-t">
            <div className="flex flex-row gap-4 items-start">
                <div className="border rounded-lg max-h-56 max-w-56 w-full h-full"></div>

                <div>
                    <div className="flex flex-row items-center justify-between">
                        <div className="bg-blue-500 rounded-full p-2 text-white">Watch Now</div>
                        <div>Add to favourite</div>
                    </div>
                    <div className="text-2xl">{serie.title}</div>
                    <div className="text-2xl">{serie.description}</div>
                    <div className="grid grid-cols-2 justify-between items-center">
                        <div>
                            {serie.releaseDate && `Released: ${format(serie.releaseDate, "yyyy-MM-dd")}`}
                        </div>
                        <div>
                            Genre: Family, Comedy, Adventure, Fantasy
                        </div>
                        <div>
                            Casts: Amanda Billing, Rachel House, Jared Hess, Danielle Brooks, Batanai Mashingaidze
                        </div>
                        <div>
                            Duration: 101 min
                        </div>
                        <div>
                            Country: Sweden, United States of America
                        </div>
                        <div>
                            Production: Warner Bros. Pictures, Legendary Pictures, Mojang Studios, Vertigo Entertainment, On the Roam, Domain Entertainment, Legendary Entertainment, Domain Entertainment
                        </div>
                    </div>
                </div>
            </div>
            <Episodes/> 
        </div>
    </div>
}