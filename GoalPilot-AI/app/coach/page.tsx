"use client";

import { useState } from "react";

export default function CoachPage() {
  const [question, setQuestion] = useState("");
  const [lastQuestion, setLastQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askCoach() {
    if (!question.trim()) return;

    const currentQuestion = question;

    setLastQuestion(currentQuestion); // Save what the user sent
    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentQuestion,
        }),
      });

      const data = await res.json();

      setAnswer(data.answer ?? "No response.");
      setQuestion(""); // Clear the input box
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col p-6 lg:p-10">
        {/* Header */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
            🤖 AI Productivity Assistant
          </div>

          <h1 className="mt-4 text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            GoalPilot Coach
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            Ask for learning plans, productivity advice, career guidance,
            or strategies to achieve your goals faster.
          </p>
        </div>

        {/* Conversation */}
        <div className="flex-1 rounded-3xl border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
          {answer ? (
            <div className="space-y-6">
              <div className="ml-auto max-w-2xl rounded-2xl bg-cyan-600 px-5 py-4 text-white">
                {lastQuestion}
              </div>

              <div className="max-w-3xl rounded-2xl border border-white/10 bg-slate-800 px-5 py-4 whitespace-pre-wrap">
                {answer}
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-center text-slate-500">
              💡 Start a conversation with your AI Coach.
            </div>
          )}
        </div>

        {/* Input */}
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
          <textarea
            rows={4}
            placeholder="Ask anything... e.g. Create a 90-day Python roadmap or help me stay productive."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-900 p-4 text-white outline-none transition focus:border-cyan-400"
          />

          <div className="mt-4 flex justify-end">
            <button
              onClick={askCoach}
              disabled={loading}
             className="w-full sm:w-auto rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "🤔 Thinking..." : "🚀 Ask AI Coach"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}