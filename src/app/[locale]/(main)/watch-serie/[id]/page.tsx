"use server";
import { db } from "@/server/db";
import { series, movies } from "@/server/db/schema";
import { isNull, and, eq, isNotNull } from 'drizzle-orm';
import { notFound } from "next/navigation";

import { EpisodeList } from '@/components/series/episode-list';
export default async function WatchSeriePage({ params }: Readonly<{
    params: Promise<{ id: string }>
}>) {
    const { id } = await params;
    let my_movies, my_series;
    my_movies = await db.select().from(movies).where(and(eq(movies.id, id), isNotNull(movies.serieId))).limit(1);
    if (my_movies === null || my_movies.length <= 0 || (my_movies.length > 0 && my_movies[0] === null)) {
        my_series = await db.select().from(series).where(eq(series.id, id)).limit(1);
        if (my_series === null || my_series.length <= 0 || (my_series.length > 0 && my_movies[0] === null)) {
            return notFound();
        }
    }

    const movie = my_movies[0];
    const serie = await db.select().from(series).where(eq(series.id, movie!.serieId!))

    return <div className="container mx-auto ">
        <div className="rounded-t">
            <div className="flex flex-row gap-4 items-start">
                <div className="border rounded-lg max-h-56 max-w-56 w-full h-full"></div>
                <div>
                    <div className="flex flex-row items-center justify-between">
                        <div className="bg-blue-500 rounded-full p-2 text-white">Watch Now</div>
                        <div>Add to favourite</div>
                    </div>
                    <div className="text-2xl">{movie.title}</div>
                    <div className="text-2xl">{movie.description}</div>
                    <div className="grid grid-cols-2 justify-between items-center">
                        <div>
                            Released: 2025-03-31
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
        </div>
        <EpisodeList episodes={[
            { season: 1, number: 1, name: 'Episode #1.1' },
            { season: 1, number: 2, name: 'Episode #1.2' },
            { season: 1, number: 3, name: 'Episode #1.3' },
            { season: 1, number: 4, name: 'Episode #1.4' },
            { season: 1, number: 5, name: 'Episode #1.5' },
            { season: 1, number: 6, name: 'Episode #1.6' },
            { season: 1, number: 7, name: 'Episode #1.7' },
            { season: 1, number: 8, name: 'Episode #1.8' },
            { season: 1, number: 9, name: 'Episode #1.9' },
            { season: 1, number: 10, name: 'Episode #1.10' },
            { season: 1, number: 11, name: 'Episode #1.11' },
            { season: 1, number: 12, name: 'Episode #1.12' },
            { season: 1, number: 13, name: 'Episode #1.13' },
            { season: 1, number: 14, name: 'Episode #1.14' },
            { season: 1, number: 15, name: 'Episode #1.15' },
            { season: 1, number: 16, name: 'Episode #1.16' },
            { season: 1, number: 17, name: 'Episode #1.17' },
            { season: 1, number: 18, name: 'Episode #1.18' },
            { season: 1, number: 19, name: 'Episode #1.19' },
            { season: 1, number: 20, name: 'Episode #1.20' },
            { season: 1, number: 21, name: 'Episode #1.21' },
            { season: 1, number: 22, name: 'Episode #1.22' },
            { season: 2, number: 1, name: 'Episode #2.1' }, { season: 2, number: 2, name: 'Episode #2.2' }, { season: 2, number: 3, name: 'Episode #2.3' }
        ]} />
    </div>
};