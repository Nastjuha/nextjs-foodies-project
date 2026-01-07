"use server";

export async function shareMeal(formData) {
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
