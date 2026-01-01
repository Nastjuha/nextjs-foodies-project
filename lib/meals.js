import sql from "better-sqlite3";

// establish a connection to the SQLite database
const db = sql("meals.db");

// async -> then getMeals will rerurn a promise
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate a 2 second delay

  return db.prepare("SELECT * FROM meals").all();
  // .run() would be used if we were inserting or updating data
  // .all() is used if we're fetching data and we want to get back all rows that are fetched by that statement
  // .get() would be used if we were fetching a single row
}
