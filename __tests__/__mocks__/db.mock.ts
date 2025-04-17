// __tests__/__mocks__/db.mock.ts

// This mock simulates the database module.  Adjust the mocked functions
// to match the actual functions you use in your tests.

const mockDB = {
  select: jest.fn(() => ({
    from: jest.fn(() => ({
      where: jest.fn(() => ({
        limit: jest.fn(() => ({
          offset: jest.fn(() => ({
            orderBy: jest.fn(() => Promise.resolve([])), // Default: return empty array
          })),
        })),
        orderBy: jest.fn(() => Promise.resolve([])),
      })),
      orderBy: jest.fn(() => Promise.resolve([])),
    })),
  })),
  query: {
    movies: {
      findMany: jest.fn(() => Promise.resolve([])), // Mock findMany for movies
    },
    series: {
      findMany: jest.fn(() => Promise.resolve([])), // Mock findMany for series
    }
  },
};

export { mockDB as db };