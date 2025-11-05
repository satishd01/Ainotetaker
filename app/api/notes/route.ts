// app/api/notes/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Note from "@/models/Note";
import { noteSchema } from "@/lib/validation";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/nextAuthOptions"; // we'll create a small wrapper below

// helper to attach NextAuth options (we extract them so server session can use)
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") || "";
    await connectDB();

    // optional: user-limited - allow query param userId or session
    if (q) {
      const notes = await Note.find({ title: { $regex: q, $options: "i" } }).sort({ updatedAt: -1 });
      return NextResponse.json({ notes });
    }

    const notes = await Note.find().sort({ updatedAt: -1 });
    return NextResponse.json({ notes });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = noteSchema.parse(body);
    await connectDB();
    const created = await Note.create({ ...parsed, userId: body.userId });
    return NextResponse.json({ note: created });
  } catch (err: any) {
    if (err?.issues) return NextResponse.json({ error: err.issues }, { status: 422 });
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, content, tags } = body;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await connectDB();
    const updated = await Note.findByIdAndUpdate(id, { title, content, tags }, { new: true });
    return NextResponse.json({ note: updated });
  } catch (err:any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await connectDB();
    await Note.findByIdAndDelete(id);
    return NextResponse.json({ ok: true });
  } catch (err:any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
