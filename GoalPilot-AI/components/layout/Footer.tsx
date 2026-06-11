
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-white/10 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-xl shadow-lg">
                🚀
              </div>

              <div>
                <h2 className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-2xl font-extrabold text-transparent">
                  GoalPilot AI
                </h2>

                <p className="text-sm text-slate-400">
                  Your AI Personal Operating System
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-slate-400 leading-7">
              Transform ambitious goals into structured roadmaps,
              milestones, and daily execution with the power of AI.
            </p>

            <div className="mt-4 inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
              🏆 Built for innovation & hackathons
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-start md:items-end">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="text-slate-400 transition hover:text-cyan-300"
              >
                Home
              </Link>

              <Link
                href="/dashboard"
                className="text-slate-400 transition hover:text-cyan-300"
              >
                Dashboard
              </Link>

              <Link
                href="/goals/new"
                className="text-slate-400 transition hover:text-cyan-300"
              >
                New Goal
              </Link>

              <Link
                href="/coach"
                className="text-slate-400 transition hover:text-cyan-300"
              >
                AI Coach
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          © {year} GoalPilot AI • Crafted with ❤️, AI, and Next.js.
        </div>
      </div>
    </footer>
  );
}

