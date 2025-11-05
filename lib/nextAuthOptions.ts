// lib/nextAuthOptions.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { connectDB } from "./dbConnect";
import User, { IUser } from "@/models/User";
import bcrypt from "bcrypt";

// Define a proper type for session user
interface SessionUser {
  id: string;
  name: string;
  email: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        // Type-safe user fetching
        const user = (await User.findOne({ email: credentials?.email })) as
          | (IUser & { _id: any })
          | null;

        if (!user) throw new Error("No user found");

        const valid = await bcrypt.compare(credentials!.password, user.password);
        if (!valid) throw new Error("Invalid password");

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        } as SessionUser;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as SessionUser).id;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).user = { id: token.id } as SessionUser;
      return session;
    },
  },
};

export default authOptions;
