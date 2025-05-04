interface Ratings {
  [movieId: string]: number;
}

interface UserRatings {
  [userId: string]: Ratings;
}

function cosineSimilarity(vec1: number[], vec2: number[]): number {
  if (vec1.length !== vec2.length) {
    throw new Error('Vectors must have the same dimensions');
  }

  let dotProduct = 0;
  let normVec1 = 0;
  let normVec2 = 0;

  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i]! * vec2[i]!;
    normVec1 += vec1[i]! * vec1[i]!;
    normVec2 += vec2[i]! * vec2[i]!;
  }

  const norm1 = Math.sqrt(normVec1);
  const norm2 = Math.sqrt(normVec2);

  return norm1 > 0 && norm2 > 0 ? dotProduct / (norm1 * norm2) : 0;
}

export function predictRating(userId: string, movieId: string, userRatings: UserRatings, k = 5): number | null {
  const targetRatings = userRatings[userId] || {};
  const similarities: [string, number][] = [];
  for (const otherUser in userRatings) {
    if (otherUser !== userId && userRatings[otherUser][movieId] !== undefined) {
      const allMovies = new Set([...Object.keys(targetRatings), ...Object.keys(userRatings[otherUser])]);
      const vec1 = Array.from(allMovies).map(m => targetRatings[m] || 0);
      const vec2 = Array.from(allMovies).map(m => userRatings[otherUser][m] || 0);
      const sim = cosineSimilarity(vec1, vec2);
      similarities.push([otherUser, sim]);
    }
  }
  similarities.sort((a, b) => b[1] - a[1]);
  const topNeighbors = similarities.slice(0, k);
  const numerator = topNeighbors.reduce((sum, [neighbor, sim]) => sum + sim * userRatings[neighbor][movieId], 0);
  const denominator = topNeighbors.reduce((sum, [, sim]) => sum + Math.abs(sim), 0);
  return denominator > 0 ? numerator / denominator : null;
}
