import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

// establish a connection to the SQLite database
const db = sql("meals.db");

// async -> then getMeals will rerurn a promise
export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate a 2 second delay

  //throw new Error("Loading meals failed");

  return db.prepare("SELECT * FROM meals").all();
  // .run() would be used if we were inserting or updating data
  // .all() is used if we're fetching data and we want to get back all rows that are fetched by that statement
  // .get() would be used if we were fetching a single row
}

export function getMealBySlug(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export function saveMeal(meal) {
  // we have to generate a slug for the meal based on the title -> install slugify package
  // npm unstall xss -> to prevent XSS attacks -> sanitize user input (we save user's instructions and output them later on the meal details page)
  // app/meals/[mealSlug]/page.js -> use dangerouslySetInnerHTML to output sanitized instructions
  meal.slug = slugify(meal.title, { lower: true });

  // to remove any harmful code from the user input instructions.
  // Instead of creating new const -> overwrite the existing property
  meal.instructions = xss(meal.instructions);
}
