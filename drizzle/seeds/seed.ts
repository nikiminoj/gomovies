import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { movies, type DB_MovieType } from "../../src/server/db/schema";

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes
}

async function main() {
  const connectionString = process.env.DATABASE_URL!;
  const client = postgres(connectionString);
  const db = drizzle(client);
  // const movie: DB_MovieType = {
  //   title: "Oppenheimer",
  //   description:
  //     "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
  //   slug: slugify("Oppenheimer"),
  //   genre: "Biography",
  //   country: "USA",
  //   imdbRating: 8.3,
  //   duration: 180,
  //   releaseDate: new Date("2023-07-21"),
  //   cast: JSON.stringify(["Cillian Murphy", "Emily Blunt", "Matt Damon"]),
  //   productionCompany: "Syncopy",
  // };

  const data: Partial<DB_MovieType>[] = [
    {
      title: "Oppenheimer",
      description:
        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      slug: slugify("Oppenheimer"),
      genre: "Biography",
      country: "USA",
      imdbRating: 8.3,
      duration: 180,
      releaseDate: new Date("2023-07-21"),
      cast: JSON.stringify(["Cillian Murphy", "Emily Blunt", "Matt Damon"]),
      productionCompany: "Syncopy",
    },
    {
      title: "Spider-Man: Across the Spider-Verse",
      description:
        "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
      slug: slugify("Spider-Man: Across the Spider-Verse"),
      genre: "Animation",
      country: "USA",
      imdbRating: 8.6,
      duration: 140,
      releaseDate: new Date("2023-06-02"),
      cast: JSON.stringify(["Shameik Moore", "Hailee Steinfeld", "Brian Tyree Henry"]),
      productionCompany: "Columbia Pictures",
    },
    {
      title: "Barbie",
      description:
        "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
      slug: slugify("Barbie"),
      genre: "Comedy",
      country: "USA",
      imdbRating: 7.0,
      duration: 114,
      releaseDate: new Date("2023-07-21"),
      cast: JSON.stringify(["Margot Robbie", "Ryan Gosling", "America Ferrera"]),
      productionCompany: "Warner Bros. Pictures",
    },
  ];
  await db.insert(movies).values([
    {
      title: "Oppenheimer",
      description:
        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      slug: slugify("Oppenheimer"),
      genre: "Biography",
      country: "USA",
      imdbRating: 8.3,
      duration: 180,
      releaseDate: new Date("2023-07-21"),
      cast: JSON.stringify(["Cillian Murphy", "Emily Blunt", "Matt Damon"]),
      productionCompany: "Syncopy",
    },
    {
      title: "Spider-Man: Across the Spider-Verse",
      description:
        "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
      slug: slugify("Spider-Man: Across the Spider-Verse"),
      genre: "Animation",
      country: "USA",
      imdbRating: 8.6,
      duration: 140,
      releaseDate: new Date("2023-06-02"),
      cast: JSON.stringify(["Shameik Moore", "Hailee Steinfeld", "Brian Tyree Henry"]),
      productionCompany: "Columbia Pictures",
    },
    {
      title: "Barbie",
      description:
        "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
      slug: slugify("Barbie"),
      genre: "Comedy",
      country: "USA",
      imdbRating: 7.0,
      duration: 114,
      releaseDate: new Date("2023-07-21"),
      cast: JSON.stringify(["Margot Robbie", "Ryan Gosling", "America Ferrera"]),
      productionCompany: "Warner Bros. Pictures",
    },
  ]);

  console.log("Seeded database with movies!");
}

main();