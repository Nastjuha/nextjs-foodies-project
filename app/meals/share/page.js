import classes from "./page.module.css";

import ImagePicker from "@/components/meals/image-picker";

export default function ShareMealPage() {
  async function shareMeal(formData) {
    "use server";

    //object 'formData' contains all the submitted data from input fields ->  to handle the submitted data -> extract them
    const meal = {
      title: formData.get("title"), // get the data from the input field with the name='title'
      summary: formData.get("summary"),
      instructions: formData.get("instructions"),
      image: formData.get("image"), // see ImagePicker component how we handle the image upload and get the image file -> property
      creator: formData.get("name"),
      email: formData.get("email"),
    }; // form data object

    console.log(meal);
  }

  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        {/* value of action - server action f. Pattern that supported by Next.js and React that will ensure that when this form is 
        submitted, Next.js will behind the scenes create a request and send it to this Next.js server, that serving the website,
        so as the function shareMeal() gets triggered and we can handle the form submission there, but on the server. =>
        that function will execute on the server, NOT in the client. That f. will automatically recieve formData that was submitted.  */}
        <form className={classes.form} action={shareMeal}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
            ></textarea>
          </p>
          <ImagePicker label="Your image" name="image" />
          <p className={classes.actions}>
            <button type="submit">Share Meal</button>
          </p>
        </form>
      </main>
    </>
  );
}
