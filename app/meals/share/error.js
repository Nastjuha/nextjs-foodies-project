"use client";
// because NextJS ensures we can catch any error, including that ones on client side, so after the pages were rendered on the server

export default function Error() {
  return (
    <main className="error">
      <h1>An error occured!</h1>
      <p>Failed to create meal.</p>
    </main>
  );
}
