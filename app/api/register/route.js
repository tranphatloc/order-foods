
import mongoose from "mongoose";
import User from "../../../models/user";
import { NextResponse } from "next/server";
// import { connectMongoDB } from "../../../lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    // await connectMongoDB();
    await mongoose.connect(process.env.MONGO_URL);
    await User.create({
      name,
      email,
      password: hashedPassword
    });

    return NextResponse.json({ message: "User" }, { status: 201 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        message: "an error occurred while registering the user.",
      },
      { status: 500 }
    );
  }
}
