import 'dotenv/config';
import { createInterface } from 'readline';
import { db } from '../src/server/db/index';
import { sql } from 'drizzle-orm' 
import * as schema from '../src/server/db/schema';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function runQuery(query: string) {
  try {
    const result = await db.execute(sql`query`);
    console.log(result);
  } catch (error) {
    console.error('Error executing query:', error);
  }
}

async function main() {
  console.log('Drizzle ORM Console');
  console.log('Enter SQL queries to execute, or type "exit" to quit.');

  while (true) {
    const query: string = await new Promise((resolve) => {
      rl.question('> ', resolve);
    });

    if (query.toLowerCase() === 'exit') {
      break;
    }

    if (query.trim() !== '') {
      await runQuery(query);
    }
  }

  rl.close();
}

main();