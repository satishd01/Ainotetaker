import mongoose from "mongoose";

let cached: typeof mongoose | null = null;

export async function connectDB() {
  if (cached) return cached;

  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not defined");

  const conn = await mongoose.connect(process.env.MONGODB_URI);
  cached = conn;
  return conn;
}
