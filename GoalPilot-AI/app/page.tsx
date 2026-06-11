"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

const features = [
  {
    icon: "🧠",
    title: "AI Roadmaps",
    description:
      "Convert ambitious goals into clear milestones and actionable tasks.",
  },
  {
    icon: "🎯",
    title: "Smart Goal Planning",
    description:
      "Break down complex objectives into manageable execution steps.",
  },
  {
    icon: "💬",
    title: "AI Coach",
    description:
      "Get productivity guidance and stay accountable every day.",
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    description:
      "Visualize momentum with milestones and completion tracking.",
  },
  {
    icon: "⚡",
    title: "Adaptive Tasks",
    description:
      "Generate tasks dynamically as your roadmap evolves.",
  },
  {
    icon: "🚀",
    title: "Personal Operating System",
    description:
      "Manage goals, planning, and execution from one workspace.",
  },
];

export default function HomePage() {
  const [email, setEmail] = useState<string | null>(null);

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
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_45%)]" />

      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">
          ✨ AI Productivity Platform
        </div>

        <h1 className="mt-8 text-5xl font-extrabold md:text-7xl">
          {email
            ? `Welcome Back, ${email.split("@")[0]} 👋`
            : "GoalPilot AI"}
        </h1>

        <p className="mt-4 text-2xl text-slate-300">
          {email
            ? "Your goals are waiting. Let's build momentum today. 🚀"
            : "Your AI Personal Operating System"}
        </p>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400">
          Plan smarter, execute faster, and achieve ambitious goals with
          AI-generated roadmaps, milestones, coaching, and adaptive task
          management.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {email ? (
            <>
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-6 py-4 text-left shadow-lg">
                <p className="text-sm text-cyan-300">
                  👋 Welcome Back
                </p>

                <p className="font-bold text-white">
                  {email.split("@")[0]}
                </p>
              </div>

              <Link
                href="/dashboard"
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition hover:scale-105"
              >
                📊 Go to Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:scale-105 hover:bg-cyan-400"
              >
                🚀 Get Started
              </Link>

              <Link
                href="/login"
                className="rounded-xl border border-slate-700 px-6 py-3 font-semibold transition hover:bg-slate-900"
              >
                🔐 Login
              </Link>
            </>
          )}
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-3xl font-bold text-cyan-300">10K+</div>
            <div className="mt-2 text-slate-400">Goals Planned</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-3xl font-bold text-cyan-300">24/7</div>
            <div className="mt-2 text-slate-400">AI Coach</div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-3xl font-bold text-cyan-300">95%</div>
            <div className="mt-2 text-slate-400">Execution Focus</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="text-center text-3xl font-bold">
          Everything You Need in One Place
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-cyan-400/40"
            >
              <div className="text-4xl">{feature.icon}</div>

              <h3 className="mt-4 text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-2 text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Link
        href="/coach"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 font-bold text-white shadow-2xl transition hover:scale-110"
      >
        💬 Chat with AI
      </Link>
    </main>
  );
}
