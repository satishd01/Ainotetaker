import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { connectDB } from "./dbConnect";
import User, { IUser } from "@/models/User";
import bcrypt from "bcrypt";

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

        // Explicitly type user
        const user: IUser | null = await User.findOne({ email: credentials?.email });
        if (!user) throw new Error("No user found");

        const valid = await bcrypt.compare(credentials!.password, user.password);
        if (!valid) throw new Error("Invalid password");

        // Explicit type cast fixes TS18046
return {
  id: (user._id as any).toString(),
  name: user.name,
  email: user.email,
};
      }
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = (user as { id: string }).id;
      return token;
    },
    async session({ session, token }) {
      (session.user as any) = { id: token.id };
      return session;
    },
  },
};

export default authOptions;
