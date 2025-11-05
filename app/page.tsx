"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-6">🧠 AI Note-Taking App</h1>

      {!session ? (
        <div className="flex gap-4">
          <Link
            href="/register"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80"
          >
            Register
          </Link>
          <button
            onClick={() => signIn()}
            className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            Login
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg">Welcome, {session.user?.name || session.user?.email} 🎉</p>
          <Link
            href="/notes"
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80"
          >
            Go to Notes Dashboard
          </Link>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground hover:bg-destructive/80"
          >
            Logout
          </button>
        </div>
      )}
    </main>
  );
}
