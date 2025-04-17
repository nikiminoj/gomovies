import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { movies, series, type DB_MovieType } from "../../src/server/db/schema";

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
    {
      title: "The Batman",
      description:
        "Bruce Wayne investigates Gotham's corruption as Batman, uncovering deep-seated secrets and facing The Riddler.",
      slug: slugify("The Batman"),
      genre: "Action",
      country: "USA",
      imdbRating: 7.9,
      duration: 176,
      releaseDate: new Date("2022-03-04"),
      cast: JSON.stringify(["Robert Pattinson", "Zoë Kravitz", "Paul Dano"]),
      productionCompany: "Warner Bros. Pictures",
    },
    {
      title: "Dune: Part Two",
      description:
        "Paul Atreides unites with the Fremen to seek revenge against those who destroyed his family.",
      slug: slugify("Dune Part Two"),
      genre: "Sci-Fi",
      country: "USA",
      imdbRating: 8.4,
      duration: 165,
      releaseDate: new Date("2024-03-01"),
      cast: JSON.stringify(["Timothée Chalamet", "Zendaya", "Florence Pugh"]),
      productionCompany: "Legendary Pictures",
    },
    {
      title: "John Wick: Chapter 4",
      description:
        "John Wick faces his most lethal adversaries yet in the fight against the High Table.",
      slug: slugify("John Wick Chapter 4"),
      genre: "Action",
      country: "USA",
      imdbRating: 8.2,
      duration: 169,
      releaseDate: new Date("2023-03-24"),
      cast: JSON.stringify(["Keanu Reeves", "Donnie Yen", "Bill Skarsgård"]),
      productionCompany: "Lionsgate",
    },
    {
      title: "Avatar: The Way of Water",
      description:
        "Jake Sully and Neytiri fight to protect their family when new threats emerge on Pandora.",
      slug: slugify("Avatar The Way of Water"),
      genre: "Sci-Fi",
      country: "USA",
      imdbRating: 7.8,
      duration: 192,
      releaseDate: new Date("2022-12-16"),
      cast: JSON.stringify(["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"]),
      productionCompany: "20th Century Studios",
    },
    {
      title: "Mission: Impossible - Dead Reckoning Part One",
      description:
        "Ethan Hunt takes on his most dangerous mission yet, facing new enemies and old allies.",
      slug: slugify("Mission Impossible Dead Reckoning Part One"),
      genre: "Action",
      country: "USA",
      imdbRating: 7.7,
      duration: 163,
      releaseDate: new Date("2023-07-12"),
      cast: JSON.stringify(["Tom Cruise", "Hayley Atwell", "Simon Pegg"]),
      productionCompany: "Paramount Pictures",
    },
    {
      title: "Guardians of the Galaxy Vol. 3",
      description:
        "The Guardians embark on a mission to save one of their own, facing cosmic threats along the way.",
      slug: slugify("Guardians of the Galaxy Vol 3"),
      genre: "Superhero",
      country: "USA",
      imdbRating: 8.0,
      duration: 150,
      releaseDate: new Date("2023-05-05"),
      cast: JSON.stringify(["Chris Pratt", "Zoe Saldana", "Dave Bautista"]),
      productionCompany: "Marvel Studios",
    },
    {
      title: "Fast X",
      description:
        "Dom Toretto and his crew face their most personal and dangerous enemy yet.",
      slug: slugify("Fast X"),
      genre: "Action",
      country: "USA",
      imdbRating: 6.9,
      duration: 141,
      releaseDate: new Date("2023-05-19"),
      cast: JSON.stringify(["Vin Diesel", "Jason Momoa", "Michelle Rodriguez"]),
      productionCompany: "Universal Pictures",
    },
    {
      title: "Wonka",
      description:
        "A young Willy Wonka embarks on an adventure to become the world's greatest chocolatier.",
      slug: slugify("Wonka"),
      genre: "Fantasy",
      country: "UK",
      imdbRating: 7.5,
      duration: 120,
      releaseDate: new Date("2023-12-15"),
      cast: JSON.stringify(["Timothée Chalamet", "Olivia Colman", "Rowan Atkinson"]),
      productionCompany: "Warner Bros. Pictures",
    }
  ]);

  console.log("Seeded database with movies!");
  // ########################################################################################## //
  // ########################################################################################## //

  const insertedSeries = await db.insert(series)
    .values([
      { name: "Breaking Bad", description: "A high school chemistry teacher turned methamphetamine kingpin." },
      { name: "Stranger Things", description: "A group of kids uncover supernatural mysteries in their town." },
      { name: "The Witcher", description: "A monster hunter navigates a world filled with magic and war." },
      { name: "Game of Thrones", description: "Noble families vie for control in a medieval fantasy world." },
      { name: "The Mandalorian", description: "A lone bounty hunter travels the galaxy in search of his purpose." },
    ])
    .returning({ id: series.id, name: series.name });

  console.log("Inserted Series IDs:", insertedSeries);

  const episodesData = insertedSeries.flatMap((serie) => [
    {
      title: "Pilot",
      description: `Introduction to ${serie.name}.`,
      slug: slugify(`${serie.name} Pilot`),
      genre: "Drama",
      country: "USA",
      imdbRating: 8.0,
      duration: 50,
      releaseDate: new Date(),
      cast: JSON.stringify(["Actor A", "Actor B"]),
      productionCompany: "Studio Name",
      serieId: serie.id, // Maintain reference
    },
    {
      title: "Episode 2",
      description: `${serie.name} continues its story.`,
      slug: slugify(`${serie.name} Episode 2`),
      genre: "Drama",
      country: "USA",
      imdbRating: 8.3,
      duration: 52,
      releaseDate: new Date(),
      cast: JSON.stringify(["Actor A", "Actor C"]),
      productionCompany: "Studio Name",
      serieId: serie.id, // Maintain reference
    }
  ]);

  await db.insert(movies).values(episodesData);
}


main();