import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { movies } from "@/server/db/schema";
import { and, like, eq, isNull, count } from "drizzle-orm";
import { max_or_min } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q");
    const limit = max_or_min(Number(req.nextUrl.searchParams.get("limit")) || 10, 10);
    const page = Number(req.nextUrl.searchParams.get("page")) || 0;
    const total = await db.select({ count: count()}).from(movies);
    if (query) {
      const searchedMovies = await db
        .select()
        .from(movies)
        .where(and(like(movies.title, `%${query}%`), isNull(movies.serieId)))
        .limit(limit)
        .offset(limit * page);
      return NextResponse.json({movies: searchedMovies, count: total});
    } else {
      const allMovies = await db.select().from(movies).where(isNull(movies.serieId)).limit(limit).offset(limit * page);
      return NextResponse.json({movies: allMovies, count: total});
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}