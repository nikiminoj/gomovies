import { NextResponse } from "next/server";
import { predictRating } from "@/lib/ml/similarity";
import { matrixFactorization, predictRatingMatrixFactorization } from "@/lib/ml/matrix_factorization";
import { db } from "@/server/db";
import { ratings } from "@/server/db/schema";
import { auth } from "@/server/auth";

export async function GET(
  request: Request,
  
) {
  try {
    const { searchParams } = new URL(request.url)
    const movieId = searchParams.get('movieId');
    const session = await auth();
    const userId = session?.user;

    
    if (!movieId) {
        return NextResponse.json(
            { error: 'movieId is required' },
            { status: 400 },
          );
    }

    const allRatings = await db.select().from(ratings);

        if(userId){
            const userRatings: Record<string, Record<string, number>> = {};

            for (const rating of allRatings) {
                if (!userRatings[rating.userId]) {
                    userRatings[rating.userId] = {};
                }
                userRatings[rating.userId][rating.movieId] = rating.rating;
            }
            const predictedRating = predictRating(userId, movieId, userRatings);
            return NextResponse.json({ predictedRating });
        }else{
            
            const userIds = new Set();
            const movieIds = new Set();
            const ratingData: Record<string, Record<string, number>> = {};

            allRatings.forEach(rating => {
                userIds.add(rating.userId);
                movieIds.add(rating.itemId);
                if (!ratingData[rating.userId]) {
                    ratingData[rating.userId] = {};
                }
                ratingData[rating.userId][rating.itemId] = rating.rating;
            });

            const userIdArray = Array.from(userIds);
            const movieIdArray = Array.from(movieIds);

            const R: number[][] = userIdArray.map(userId => 
                movieIdArray.map(movieId => ratingData[userId]?.[movieId] || 0)
            );

            if(R.length === 0){
                 const R: number[][] = Array.from({length: 5}, () => Array.from({length: 5}, () => Math.floor(Math.random() * 5) + 1));
                const { U, V } = await matrixFactorization(R, 5, 0.01, 0.02, 50);
                 const predictedRating = predictRatingMatrixFactorization(0, 0, U, V);
                return NextResponse.json({ predictedRating });
            }
           
            const { U, V } = await matrixFactorization(R, 5, 0.01, 0.02, 50);
             const indexMovieId = movieIdArray.indexOf(movieId);
            const predictedRating = predictRatingMatrixFactorization(0, indexMovieId, U, V);
            return NextResponse.json({ predictedRating });


        }
  } catch (error) {
    console.error("Error predicting rating:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}



