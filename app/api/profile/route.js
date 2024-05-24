import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../app/api/auth/[...nextauth]/route";
import User from "../../../models/user";
import { NextResponse } from "next/server";
import { useSession } from "next-auth/react";

export async function PUT(req) {
  // const {data: session, update} = useSession()
  await mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  // console.log("data", data);

  const session = await getServerSession(authOptions);
  const email = session.user.email;

  await User.updateOne({ email }, data);

  return Response.json(true);
}

export async function GET() {
  await mongoose.connect(process.env.MONGO_URL);
  const session = await getServerSession(authOptions);
  const email = session.user.email;
  return Response.json(await User.findOne({ email }));
}
