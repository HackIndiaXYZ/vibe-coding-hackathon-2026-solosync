"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function NewGoalPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreateGoal() {
    if (!title.trim()) {
      toast.error("Please enter a goal title.");
      return;
    }

    setLoading(true);

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      toast.error("Please log in first.");
      router.push("/login");
      return;
    }

    // Insert goal and return inserted row
    const { data, error } = await supabase
      .from("goals")
      .insert({
        user_id: user.id,
        title,
        description,
        target_date: targetDate || null,
        status: "active",
      })
      .select()
      .single();

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }
toast.success("🎉 Goal created successfully!");

router.push("/dashboard");
router.refresh();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-12 text-white">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex rounded-full bg-cyan-500/10 px-4 py-1 text-sm text-cyan-300">
              🚀 Goal Creator
            </div>

            <h1 className="text-4xl font-extrabold">
              Create a New Goal
            </h1>

            <p className="mt-3 text-slate-400">
              Define your next objective and start tracking your progress.
            </p>
          </div>

          <div className="space-y-5">
            <input
              type="text"
              placeholder="Goal title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 p-4 text-white outline-none transition focus:border-cyan-400"
            />

            <textarea
              rows={5}
              placeholder="Describe your goal..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 p-4 text-white outline-none transition focus:border-cyan-400"
            />

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                📅 Target Date
              </label>

              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 p-4 text-white outline-none transition focus:border-cyan-400"
              />
            </div>

            <button
              onClick={handleCreateGoal}
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 font-bold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "⏳ Creating Goal..." : "🚀 Create Goal"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}