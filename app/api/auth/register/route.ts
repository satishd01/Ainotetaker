// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcrypt";
import { registerSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.parse(body);

    await connectDB();
    const exists = await User.findOne({ email: parsed.email });
    if (exists) return NextResponse.json({ error: "Email already registered" }, { status: 400 });

    const hash = await bcrypt.hash(parsed.password, 10);
    const user = await User.create({ name: parsed.name, email: parsed.email, password: hash });

    return NextResponse.json({ ok: true, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err: any) {
    if (err?.issues) return NextResponse.json({ error: err.issues }, { status: 422 });
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
