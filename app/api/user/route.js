import User from "../../../models/user";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
export async function GET(req) {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    // await connectMongoDB();
    const user = await User.find();
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
  }
}