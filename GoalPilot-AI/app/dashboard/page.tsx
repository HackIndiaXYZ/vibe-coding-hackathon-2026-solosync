
"use client";

import { useEffect, useState } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import { supabase } from "@/lib/supabase/client";
import GoalCard from "@/components/dashboard/GoalCard";
import StatsCard from "@/components/dashboard/StatsCard";


type Goal = {
  id: string;
  title: string;
  description: string | null;
  target_date: string | null;
  status: "active" | "completed" | "paused";
};

export default function DashboardPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    async function loadGoals() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }
      if (user.email) {
        setUserEmail(user.email);
      }

      const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setGoals(data as Goal[]);
      }

      setLoading(false);
    }

    loadGoals();
  }, []);

  const activeGoals = goals.filter(
    (g) => g.status === "active"
  ).length;

  const completedGoals = goals.filter(
    (g) => g.status === "completed"
  ).length;

  const filteredGoals = goals.filter((goal) =>
    goal.title.toLowerCase().includes(search.toLowerCase())
  );
  const username = userEmail
    ? userEmail.split("@")[0]
    : "Explorer";

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "☀️ Good Morning"
      : hour < 18
        ? "🌤️ Good Afternoon"
        : "🌙 Good Evening";
  return (
    <AuthGuard>
      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-10">
          {/* Hero Header */}
          {/* Hero Header */}
          <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div>
              <div className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
                🚀 Welcome Back
              </div>

             <h1 className="mt-4 text-3xl md:text-5xl font-extrabold">
                {greeting}, {username} 👋
              </h1>

              <p className="mt-3 max-w-2xl text-slate-400">
                Let's make progress today and achieve something amazing.
              </p>
            </div>
          </div>

          {/* Statistics */}
          <section className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatsCard
              label="🎯 Active Goals"
              value={activeGoals}
            />

            <StatsCard
              label="✅ Completed"
              value={completedGoals}
            />

            <StatsCard
              label="📊 Total Goals"
              value={goals.length}
            />
          </section>

          {/* Search */}
          <div className="mb-10">
            <input
              type="text"
              placeholder="Search goals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          {/* Goals */}
          {loading ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-slate-400">
              Loading your goals...
            </div>
          ) : filteredGoals.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/50 p-16 text-center">
              <div className="text-6xl">🚀</div>

              <h2 className="mt-6 text-2xl font-bold">
                No Goals Yet
              </h2>

              <p className="mt-3 text-slate-400">
                Create your first AI-powered goal and start building
                momentum today.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  id={goal.id}
                  title={goal.title}
                  description={goal.description}
                  targetDate={goal.target_date}
                  status={goal.status}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </AuthGuard>
  );
}

