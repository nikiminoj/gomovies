import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/server/db';
import { ratings } from '@/server/db/schema';
import { eq, sql } from 'drizzle-orm';

type RatingBody = {
  userId: string;
  rating: number;
};

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body: RatingBody = await req.json();
    const { userId, rating } = body;

    if (!userId || rating === undefined || rating === null) {
      return NextResponse.json(
        { message: 'userId and rating are required' },
        { status: 400 }
      );
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    await db.insert(ratings).values({
      type: "movie",
      itemId: id,
      userId: userId,
      rating: rating,
    });

    return NextResponse.json({ message: 'Rating added successfully' });
  } catch (error) {
    console.error('Error adding rating:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}