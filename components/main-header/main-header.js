// "use client"; // we want to add this as far down the component tree as possible
// to convert to a client component only needed part

import Link from "next/link";
import Image from "next/image";
// import { usePathname } from "next/navigation";

import MainHeaderBackground from "./main-header-background";
import logoImg from "@/assets/logo.png";
import classes from "./main-header.module.css";
import NavLink from "./nav-link";

export default function MainHeader() {
  // const path = usePathname(); // returns currently avtive path - path after the domain

  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>

            {/* <Link
                href="/meals"
                className={
                  path.startsWith("/meals") ? classes.active : undefined
                } // startsWith -  if we-re on a meals or any nested page
              >
                Browse Meals
              </Link> */}

            <li>
              <NavLink href="/community">Foodies Community</NavLink>
              {/* <Link
                href="/community"
                className={path === "/community" ? classes.active : undefined}
              > exact match - we don-t have nested pages here
                Foodies Community
              </Link> */}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
