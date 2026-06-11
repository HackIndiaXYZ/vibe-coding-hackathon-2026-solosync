"use client";

type PageLoaderProps = {
  message?: string;
};

export default function PageLoader({
  message = "Loading...",
}: PageLoaderProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />

        <h2 className="mt-6 text-2xl font-bold">
          GoalPilot AI
        </h2>

        <p className="mt-2 text-slate-400">
          {message}
        </p>
      </div>
    </main>
  );
}