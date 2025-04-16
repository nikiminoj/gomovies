import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import {movies} from "../../src/server/db/schema";

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await seed(db, { movies });
}

main();