import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { ratings } from '@/server/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const movieId = params.id;

    const movieRatings = await db
      .select()
      .from(ratings)
      .where(and(eq(ratings.itemId, movieId),eq(ratings.type, "movie")));

    return NextResponse.json(movieRatings);
  } catch (error) {
    console.error('Error fetching movie ratings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}