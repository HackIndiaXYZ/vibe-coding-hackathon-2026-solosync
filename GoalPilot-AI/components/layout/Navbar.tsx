"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState<string | null>(null);
  const hideUserBox =
  pathname === "/login" ||
  pathname === "/signup" ||
  pathname === "/confirm-email" ||
  pathname === "/email-verified";

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setEmail(user?.email ?? null);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setEmail(null);
    router.push("/");
    router.refresh();
  }
if (
  pathname === "/login" ||
  pathname === "/signup" ||
  pathname === "/confirm-email"
) {
  return null;
}
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-transform hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-lg font-bold text-white shadow-lg">
            🚀
          </div>

          <div>
            <h1 className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-2xl font-extrabold text-transparent">
              GoalPilot AI
            </h1>

            <p className="text-xs text-slate-500">
              Your AI Productivity OS
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
         <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur">
            <Link
              href="/"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              Home
            </Link>

            <Link
              href="/dashboard"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              Dashboard
            </Link>

            <Link
              href="/goals/new"
              className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-300"
            >
              New Goal
            </Link>

            {email ? (
              <Link
                href="/coach"
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                AI Coach
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* User Box */}
         {email && !hideUserBox && (
            <div className="hidden md:block rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">
              <p className="text-xs text-cyan-300">👋 Welcome</p>

              <p className="max-w-[220px] truncate text-sm font-semibold text-white">
                {email?.split("@")[0]}
              </p>

              <button
                onClick={handleLogout}
                className="mt-2 w-full rounded-lg bg-red-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-red-500"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}