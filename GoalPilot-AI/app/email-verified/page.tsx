"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

export default function EmailVerifiedPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push("/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-xl rounded-3xl border border-green-500/20 bg-slate-900 p-10 text-center shadow-2xl">

        <div className="mb-6 flex justify-center">
          <CheckCircle2 className="h-20 w-20 text-green-400 animate-pulse" />
        </div>

        <h1 className="text-4xl font-bold text-white">
          🎉 Email Verified Successfully!
        </h1>

        <p className="mt-4 text-lg text-slate-300">
          Welcome to <span className="font-semibold text-cyan-400">GoalPilot AI</span>.
        </p>

        <p className="mt-2 text-slate-400">
          Your account has been verified successfully. You can now log in and
          start building AI-powered roadmaps, manage your goals, and chat with
          your AI coach.
        </p>

        <div className="mt-6 rounded-xl bg-slate-800 p-4 text-cyan-300">
          🔄 Redirecting to Login in{" "}
          <span className="font-bold text-white">{countdown}</span> seconds...
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/login"
            className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-500"
          >
            🔐 Continue to Login
          </Link>
        </div>
      </div>
    </main>
  );
}