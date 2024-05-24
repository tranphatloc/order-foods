"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session, status, update } = useSession();
  // console.log("useSession Hook: ", session);
  let userName = session?.user.name;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  return (
    <>
      <header className="flex items-center justify-between">
        <nav className="flex items-center gap-8 font-semibold text-gray-500 ">
          <Link className=" text-primary font-semibold text-2xl" href={""}>
            TL PIZZA
          </Link>
          <Link href={"/"}>Home</Link>
          <Link href={""}>Menu</Link>
          <Link href={""}>About</Link>
          <Link href={""}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 font-semibold text-gray-500">
          {status === "authenticated" && (
            <>
              <Link href={"/profile"} className="whitespace-nowrap">
                Hi {userName}
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-primary rounded-full text-white px-8 py-2"
              >
                Logout
              </button>
            </>
          )}
          {status !== "authenticated" && (
            <>
              <Link href={"/login"}>Login</Link>
              <Link
                className="bg-primary rounded-full text-white px-8 py-2"
                href={"/register"}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
