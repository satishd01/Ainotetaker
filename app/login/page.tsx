"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validation";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";

type LoginData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginData) {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (res?.ok) return router.push("/dashboard");
    alert(res?.error || "Login failed");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Sign in</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold"
          >
            Sign in
          </button>
        </form>

        <p className="text-sm text-gray-300 mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
