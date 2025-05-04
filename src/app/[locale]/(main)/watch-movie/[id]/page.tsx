"use server";
import { db } from "@/server/db";
import { movies } from "@/server/db/schema";
import { isNull, and, eq } from 'drizzle-orm';
import { notFound } from "next/navigation";

export default async function WatchMoviePage({ params }: Readonly<{
    params: Promise<{ id: string }>
}>) {
    const { id } = await params;
    const my_movies = await db.select().from(movies).where(and(eq(movies.id, id), isNull(movies.serieId))).limit(1);
    if (my_movies === null || my_movies.length <= 0 || (my_movies.length > 0 && my_movies[0] === null)) {
        return notFound();
    }

    const movie = my_movies[0];

    return <div className="container mx-auto">
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
    </div>
};