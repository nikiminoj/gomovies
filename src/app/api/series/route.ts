import { NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import { series } from "@/server/db/schema";
import { and, like, eq, isNull } from "drizzle-orm";
import { max_or_min } from "@/lib/utils";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q");
    const limit = max_or_min(Number(req.nextUrl.searchParams.get("limit")) || 10, 10);
    const page = Number(req.nextUrl.searchParams.get("page")) || 0;

    if (query) {
      const searchedSeries = await db
        .select()
        .from(series)
        .where(like(series.title, `%${query}%`))
        .limit(limit)
        .offset(page*limit);
      return NextResponse.json(searchedSeries);
    } else {
      const allMovies = await db.select().from(series).limit(limit).offset(offset);
      return NextResponse.json(allMovies);
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 });
  }
}