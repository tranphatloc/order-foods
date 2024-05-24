"use client";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ErrorMessage from "../components/message/error/page";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.error) {
        setError(<ErrorMessage message={"Invalid Credentials"} onClose={()=> setError(false)}/>);
        return;
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="mt-8">
      <h1 className="text-center  text-primary text-4xl font-semibold">
        Login
      </h1>
      {error && (
        <div className="my-4 text-center text-red-500 text-sm">{error}</div>
      )}
      <div className="block max-w-sm mx-auto">
        <input
          type="email"
          placeholder="email"
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" onClick={handleFormSubmit}>Login</button>
        <div className="my-4 text-center text-gray-500">
          Login with provider
        </div>
        <button
          onClick={() => signIn("google",{callbackUrl:"/"})}
          className="flex gap-4 justify-center"
        >
          <Image src={"/google.png"} alt={""} width={24} height={24} />
          Login with google
        </button>
      </div>
    </section>
  );
}
