// app/dashboard/page.tsx
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/nextAuthOptions";
import { redirect } from "next/navigation";
import NotesList from "@/components/NotesList";
import { Button } from "@/components/ui/button";

type SessionUser = { id: string; name?: string; email: string };

export default async function DashboardPage() {
  const session = (await getServerSession(authOptions)) as { user: SessionUser } | null;
  if (!session) redirect("/login");

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto mt-10 bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">🧠 AI Note Dashboard</h1>
            <p className="text-sm text-gray-400">
              Signed in as <span className="font-medium text-indigo-400">{session.user.email}</span>
            </p>
          </div>
          <Button
            variant="secondary"
            className="bg-indigo-600 hover:bg-indigo-700 text-white transition-all"
            onClick={() => (window.location.href = "/api/auth/signout")}
          >
            Logout
          </Button>
        </div>

        <div className="mt-8">
          <NotesList userId={session.user.id} />
        </div>
      </div>
    </main>
  );
}
