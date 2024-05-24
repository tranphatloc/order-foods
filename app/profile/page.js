"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import ErrorMessage from "../components/message/success/page";
import SuccessMessage from "../components/message/success/page";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  const [userName, setUserName] = useState("");
  const [img, setImg] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  // console.log("session:", session);

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session?.user.name);
      setImg(session?.user.image);
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setAddress(data.address);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
        });
      });
    }
  }, [session, status]);
  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("api/profile", {
        method: "PUT",
        body: JSON.stringify({
          name: userName,
          image: img,
          phone,
          address,
          postalCode,
          city,
          country,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        resolve();
      } else reject();
    });

    toast.promise(savingPromise, {
      loading: "saving",
      success: "Profile saved!",
      error: "Error",
    });
  }

  async function handleFileChange(e) {
    const files = e.target.files;
    if (files?.length === 1) {
      const data = new FormData();

      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setImg(link);
          });
        }
        throw new Error("Error!");
      });

      // const uploadPromise = new Promise(async(resole, reject) => {
      //   const response = await fetch("/api/upload", {
      //     method: "POST",
      //     body: data,
      //   });
      //   if(response.ok){
      //     const link = await response.json();
      //     setImg(link);
      //     resole();
      //   }
      //   else
      //   reject();
      // })
      await toast.promise(uploadPromise, {
        loading: "uploading...",
        success: "upload complete!",
        error: "Error",
      });
    }
  }

  if (status === "loading") {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    return router.push("/login");
  }

  return (
    <section>
      <h1 className="text-center  text-primary text-4xl font-semibold">
        Profile
      </h1>
      <div className="max-w-lg mx-auto">
        <div className="flex gap-4">
          <div>
            <div className="max-w-[120px] p-2">
              {img && (
                <Image
                  className="mb-2"
                  alt="avatar"
                  src={img}
                  width={240}
                  height={240}
                />
              )}

              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="border border-gray-300 rounded-lg px-2 py-1 text-center block cursor-pointer">
                  Edit
                </span>
              </label>
            </div>
          </div>

          <div className="grow">
            <label>Name</label>
            <input
              type="text"
              placeholder="name"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <label>Email</label>
            <input
              type="email"
              value={session.user.email}
              disabled={true}
              placeholder="email"
            />

            <label>Phone</label>
            <input
              type="phone"
              placeholder="phone"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
            <label>Address</label>
            <input
              type="text"
              placeholder="address"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
            />
            <div className="flex gap-4">
              <div>
                <label>Postal Code</label>
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </div>
              <div>
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
              </div>
            </div>
            <label>Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
            />
            <div className="pt-4">
              <button
                className="bg-primary text-white text-center"
                onClick={async (e) => {
                  update({
                    name: userName,
                    image: img,
                    // phone: phone,
                    // address: address,
                    // postalCode: postalCode,
                    // city: city,
                    // country: country,
                  });
                  await handleProfileInfoUpdate(e);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
