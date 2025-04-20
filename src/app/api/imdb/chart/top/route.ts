ts
// src/app/api/imdb/chart/top/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { movies, series } from '@/server/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const type = searchParams.get('type') || 'all'; // 'movie', 'series', or 'all'
  const country = searchParams.get('country');
  const genre = searchParams.get('genre');

  if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
    return NextResponse.json({ error: 'Invalid page or limit parameters' }, { status: 400 });
  }

  const offset = (page - 1) * limit;

  try {
    let moviesResult = [];
    let seriesResult = [];

    if (type === 'movie' || type === 'all') {
      let query = db.select({
        title: movies.title,
        imdbRating: movies.imdbRating,
        country: movies.country,
        genre: movies.genre,
      }).from(movies)
      .where(eq())
        .orderBy(desc(movies.imdbRating))
        .limit(limit)
        .offset(offset);

      if (country) {
        query = query.where(eq(movies.country, country));
      }

      if (genre) {
        query = query.where(eq(movies.genre, genre));
      }

      moviesResult = await query;
    }

    if (type === 'series' || type === 'all') {
      let query = db.select({
        title: series.title,
        imdbRating: series.imdbRating,
        type: 'series',
        country: series.country,
        genre: series.genre,
      }).from(series)
        .orderBy(desc(series.imdbRating))
        .limit(limit)
        .offset(offset);

      if (country) {
        query = query.where(eq(series.country, country));
      }

      if (genre) {
        query = query.where(eq(series.genre, genre));
      }

      seriesResult = await query;
    }

    let results = [...moviesResult, ...seriesResult];

    if (type !== 'all') {
      results = results.slice(0, limit); // Ensure limit is respected when filtering by type
    }

    // Basic in-memory sorting for combined results (if needed)
    if (type === 'all') {
      results.sort((a, b) => (b.imdbRating || 0) - (a.imdbRating || 0));
    }

    return NextResponse.json({
      data: results,
      page,
      limit,
      // You might want to add total count and other metadata in a real application
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}