import fs from "node:fs";

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

// will save both to file & data into db
export async function saveMeal(meal) {
  // we have to generate a slug for the meal based on the title -> install slugify package
  // npm unstall xss -> to prevent XSS attacks -> sanitize user input (we save user's instructions and output them later on the meal details page)
  // app/meals/[mealSlug]/page.js -> use dangerouslySetInnerHTML to output sanitized instructions
  meal.slug = slugify(meal.title, { lower: true });

  // to remove any harmful code from the user input instructions.
  // Instead of creating new const -> overwrite the existing property
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop(); // pop() will give the last element of the array -> file extension
  console.log("TEST extension: ", extension);
  const fileName = `${meal.slug}.${extension}`; // generating a unique file name for the image based on the meal slug
  console.log("TEST fileName: ", fileName);

  // to write into public folder
  const stream = fs.createWriteStream(`public/images/${fileName}`); // createWriteStream() will create a stream that allows us to write data into a certain file

  // we should convert our image into a so-called 'buffer' -> binary representation of the file
  const bufferedImage = await meal.image.arrayBuffer(); // arrayBuffer() -> built-in method that all File objects have
  // returns a promise that resolves with an ArrayBuffer representing the file's data

  // bufferedImage is of type ArrayBuffer -> but write() method wants a Buffer -> we have to convert it
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed!");
    }
  }); // write() wants a chunk a first arg
  // second arg is func that will be executed once the write operation is complete
  // 1) we saved image into this file -> public/images/${fileName}

  // 2) we want to save overall meal data into the database
  // overriding an image that stored in our meal object with a path of the image where we stored it
  // because we want to save in db only the path to the image, not the entire image file
  meal.image = `/images/${fileName}`; // public folder will be automatically served by Next.js

  //console.log("MEAL OBJECT:", meal);
  meal.creator_email = meal.email;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run(meal);
}
