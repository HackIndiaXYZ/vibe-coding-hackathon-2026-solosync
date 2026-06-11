"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";
import PageLoader from "@/components/ui/PageLoader";

export default function EditGoalPage() {
const router = useRouter();
const params = useParams();

const goalId = params.id as string;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [status, setStatus] = useState<
    "active" | "completed" | "paused"
  >("active");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadGoal() {
      if (!goalId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("id", goalId)
        .single();

      if (error || !data) {
  toast.error("Goal not found.");
  router.push("/dashboard");
  return;
}

      setTitle(data.title ?? "");
      setDescription(data.description ?? "");
      setTargetDate(data.target_date ?? "");
      setStatus(data.status ?? "active");

      setLoading(false);
    }

    loadGoal();
  }, [goalId, router]);

  async function handleUpdate() {
    if (!goalId) return;

    setSaving(true);

    const { error } = await supabase
      .from("goals")
      .update({
        title,
        description,
        target_date: targetDate || null,
        status,
      })
      .eq("id", goalId);

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Goal updated successfully!");
    router.push("/dashboard");
  }

 if (loading) {
  return <PageLoader message="Loading goal details..." />;
}
return (
  <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-12 text-white">
    <div className="mx-auto max-w-2xl">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-full bg-amber-500/10 px-4 py-1 text-sm text-amber-300">
            ✏️ Goal Editor
          </div>

          <h1 className="text-4xl font-extrabold">
            Edit Your Goal
          </h1>

          <p className="mt-3 text-slate-400">
            Update your objective, timeline, and status while keeping your
            AI-powered roadmap aligned.
          </p>
        </div>

        <div className="space-y-5">
          <input
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400"
            placeholder="Goal title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            rows={5}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 p-4 text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400"
            placeholder="Describe your goal..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              📅 Target Date
            </label>

            <input
              type="date"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 p-4 text-white outline-none transition focus:border-cyan-400"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-400">
              📌 Status
            </label>

            <select
              className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 p-4 text-white outline-none transition focus:border-cyan-400"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as
                    | "active"
                    | "completed"
                    | "paused"
                )
              }
            >
              <option value="active">🟢 Active</option>
              <option value="completed">✅ Completed</option>
              <option value="paused">⏸️ Paused</option>
            </select>
          </div>

          <button
            onClick={handleUpdate}
            disabled={saving}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 font-bold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "⏳ Saving Changes..." : "💾 Save Changes"}
          </button>
        </div>
      </div>
    </div>
  </main>
);
}

