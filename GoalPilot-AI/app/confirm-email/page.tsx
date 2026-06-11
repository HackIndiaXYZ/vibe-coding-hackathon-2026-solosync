"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ConfirmEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-cyan-500/20 bg-white/5 p-10 text-center backdrop-blur-xl">
        <div className="mb-6 text-6xl">📧</div>

        <h1 className="text-4xl font-bold">
          Confirm Your Email
        </h1>

        <p className="mt-4 text-slate-300">
          We've sent a verification link to:
        </p>

        <p className="mt-2 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-cyan-300">
          {email ?? "your email address"}
        </p>

        <p className="mt-6 text-slate-400">
          Please open your inbox and click the verification link.
          After confirming your email, return here and sign in to
          access your GoalPilot AI dashboard.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/login"
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            🔐 Go to Login
          </Link>

          <Link
            href="/signup"
            className="rounded-xl border border-slate-700 px-6 py-3 font-semibold transition hover:bg-slate-800"
          >
            ← Back
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function ConfirmEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
          Loading...
        </main>
      }
    >
      <ConfirmEmailContent />
    </Suspense>
  );
}