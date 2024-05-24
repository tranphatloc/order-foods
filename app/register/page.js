"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import ErrorMessage from "../components/message/error/page";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    if (!name || !email || !password) {
      setError(<ErrorMessage message={"All fields are necessary."} onClose={()=> setError(false)}/>);
      return;
    }
    try {
      const resUserEXists = await fetch("/api/userExist", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const { user } = await resUserEXists.json();
      if (user) {
        setError(<ErrorMessage message={"User already exists"} onClose={()=> setError(false)}/>);
        return;
      }

      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        router.push("/login");
      } else {
        console.log("user registration failed");
      }
    } catch (error) {
      console.log("error during registration: ", error);
    }
  }
  return (
    <section className="mt-8">
      <h1 className="text-center  text-primary text-4xl font-semibold">
        Register
      </h1>
      {error && (
        <div className="my-4 text-center text-red-500 text-sm">{error}</div>
      )}
      <div className="block max-w-sm mx-auto">
        {/* <form className="block max-w-sm mx-auto" onSubmit={handleFormSubmit}> */}
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        ></input>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" onClick={handleFormSubmit}>
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          Login with provider
        </div>
        <button
          className="flex gap-4 justify-center"
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Image src={"/google.png"} alt={""} width={24} height={24} />
          Login with google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?{" "}
          <Link className="underline" href={"/login"}>
            Login here &raquo;
          </Link>
        </div>
        {/* </form> */}
      </div>
    </section>
  );
}
