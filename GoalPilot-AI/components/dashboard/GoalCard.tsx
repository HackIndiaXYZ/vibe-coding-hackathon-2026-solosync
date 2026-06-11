
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { generateRoadmap } from "@/lib/generateRoadmap";
import DeleteGoalButton from "./DeleteGoalButton";

type GoalCardProps = {
  id: string;
  title: string;
  description?: string | null;
  targetDate?: string | null;
  status: "active" | "completed" | "paused";
};

export default function GoalCard({
  id,
  title,
  description,
  targetDate,
  status,
}: GoalCardProps) {
  const router = useRouter();
  const [generating, setGenerating] = useState(false);

  const statusStyles: Record<GoalCardProps["status"], string> = {
    active: "bg-blue-600",
    completed: "bg-green-600",
    paused: "bg-yellow-600",
  };

  async function handleGenerateRoadmap() {
    try {
      setGenerating(true);

      await generateRoadmap(id, title);

      toast.success("✅ Roadmap generated successfully!");

      router.push(`/roadmap/${id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate roadmap.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleRegenerateRoadmap() {
    try {
      setGenerating(true);

      router.push(`/roadmap/regenerate?id=${id}`);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-cyan-500/10">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-bold text-white">{title}</h3>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white ${statusStyles[status]}`}
            >
              {status}
            </span>
          </div>

          {description && (
            <p className="mt-4 leading-7 text-slate-300">
              {description}
            </p>
          )}

          {targetDate && (
            <div className="mt-5 inline-flex rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
              🎯 Target Date: {targetDate}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          onClick={handleGenerateRoadmap}
          disabled={generating}
          className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:scale-105 disabled:opacity-50"
        >
          {generating ? "⏳ Generating..." : "✨ Generate AI Roadmap"}
        </button>

        <button
          onClick={handleRegenerateRoadmap}
          disabled={generating}
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-indigo-500 disabled:opacity-50"
        >
          🔄 Regenerate
        </button>

        <button
          onClick={() => router.push(`/roadmap/${id}`)}
          className="rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-cyan-500"
        >
          📍 View Roadmap
        </button>

        <button
          onClick={() => router.push(`/goals/edit/${id}`)}
          className="rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-amber-500"
        >
          ✏️ Edit
        </button>

        <DeleteGoalButton goalId={id} />
      </div>
    </article>
  );
}
