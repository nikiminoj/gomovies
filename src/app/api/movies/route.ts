import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { movies } from "@/server/db/schema";
import { and, like, eq, isNull } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q");
    const limit = Number(req.nextUrl.searchParams.get("limit")) || 10;
    const offset = Number(req.nextUrl.searchParams.get("offset")) || 0;

    if (query) {
      const searchedMovies = await db
        .select()
        .from(movies)
        .where(and(like(movies.title, `%${query}%`), isNull(movies.serieId)))
        .limit(limit)
        .offset(offset);
      return NextResponse.json(searchedMovies);
    } else {
      const allMovies = await db.select().from(movies).where(isNull(movies.serieId)).limit(limit).offset(offset);
      return NextResponse.json(allMovies);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}