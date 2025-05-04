import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { ratings } from '@/server/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const serieId = params.id;

    const serieRatings = await db
      .select()
      .from(ratings)
      .where(and(eq(ratings.itemId, serieId),eq(ratings.type,"serie")));

    return NextResponse.json(serieRatings);
  } catch (error) {
    console.error('Error fetching serie ratings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}