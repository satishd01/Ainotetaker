"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validation";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

type RegisterData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });
  const [serverErr, setServerErr] = useState<string | null>(null);

  async function onSubmit(data: RegisterData) {
    setServerErr(null);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) return setServerErr(json.error || "Registration failed");
    router.push("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-white mb-1">Name</label>
            <input
              {...register("name")}
              className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your Name"
            />
            <p className="text-sm text-red-500 mt-1">{errors.name?.message as string}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-1">Email</label>
            <input
              {...register("email")}
              className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
            <p className="text-sm text-red-500 mt-1">{errors.email?.message as string}</p>
          </div>

          <div className="flex flex-col">
            <label className="text-white mb-1">Password</label>
            <input
              type="password"
              {...register("password")}
              className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="********"
            />
            <p className="text-sm text-red-500 mt-1">{errors.password?.message as string}</p>
          </div>

          {serverErr && <p className="text-sm text-red-500 mt-2">{serverErr}</p>}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-gray-300 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-400 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
