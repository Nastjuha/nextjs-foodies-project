import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 style={{ color: "white", textAlign: "center" }}>
        Time to get started!!
      </h1>

      <p>
        <Link href="/meals">Meals Page</Link>
      </p>
      <p>
        <Link href="/meals/share">Meals Share Page</Link>
      </p>
      <p>
        <Link href="/community">Community Page</Link>
      </p>
      <p>
        <Link href="/meals/spaghetti">Meals Slug Page (spaghetti)</Link>
      </p>
    </main>
  );
}
