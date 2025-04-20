ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  // Mock data - replace with actual database query for series
  const mockSeries = [
    { title: 'Series 1', imdbRating: 9.2 },
    { title: 'Series 2', imdbRating: 8.9 },
    // More mock series data...
  ];

  // Implement pagination logic here with actual database query
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedSeries = mockSeries.slice(startIndex, endIndex);

  return NextResponse.json(paginatedSeries);
}