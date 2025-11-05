import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import User, { IUser } from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body: { name: string; email: string; password: string } = await req.json();

  await connectDB();

  const existingUser = await User.findOne({ email: body.email });
  if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const newUser = new User({ ...body, password: hashedPassword }) as IUser;
  await newUser.save();

  return NextResponse.json({ message: "User created successfully" });
}
