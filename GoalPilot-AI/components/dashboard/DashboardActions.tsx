import Link from "next/link";

export default function DashboardActions() {
  return (
    <div className="flex flex-wrap gap-4">
      <Link
        href="/goals/new"
        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
      >
        + Create Goal
      </Link>

      <Link
        href="/coach"
        className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
      >
        🤖 AI Coach
      </Link>
    </div>
  );
}