import { QUERIES } from "@/server/db/queries";
import { db } from "@/server/db";
import { movies, series } from "@/server/db/schema";
import { eq, isNull, isNotNull, count, asc, desc } from "drizzle-orm";

// Mock the database interaction
jest.mock("@/server/db", () => ({
  db: {
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    leftJoin: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    offset: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    groupBy: jest.fn().mockReturnThis(),
    query: {
      movies: {
        findMany: jest.fn(),
      },
      series: {
        findMany: jest.fn(),
      },
    },
  },
}));

describe("QUERIES", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a number for getMoviesCount", async () => {
    (db.select as jest.Mock).mockResolvedValue([{ count: 5 }]);
    const result = await QUERIES.getMoviesCount();
    expect(result).toEqual([{ count: 5 }]);
    expect(db.select).toHaveBeenCalledWith({ count: count() });
    expect(db.from).toHaveBeenCalledWith(movies);
    expect(db.where).toHaveBeenCalledWith(isNull(movies.serieId));
  });

  it("should return a number for getSeriesCount", async () => {
    (db.select as jest.Mock).mockResolvedValue([{ count: 3 }]);
    const result = await QUERIES.getSeriesCount();
    expect(result).toEqual([{ count: 3 }]);
    expect(db.select).toHaveBeenCalledWith({ count: count() });
    expect(db.from).toHaveBeenCalledWith(movies);
    expect(db.where).toHaveBeenCalledWith(isNotNull(movies.serieId));
  });

  it("should return an array for getMoviesWithSeries", async () => {
    const mockMoviesWithSeries = [{ movie: { id: 1, title: "Movie 1" }, serie: { id: 1, name: "Series 1" } }];
    (db.query.movies.findMany as jest.Mock).mockResolvedValue(mockMoviesWithSeries);
    const result = await QUERIES.getMoviesWithSeries();
    expect(result).toEqual(mockMoviesWithSeries);
    expect(db.query.movies.findMany).toHaveBeenCalledWith({
      where: { serieId: undefined }, // Adjust the expected where clause
      limit: 10,
      offset: 0,
      orderBy: [asc(movies.title)],
    });
  });
});