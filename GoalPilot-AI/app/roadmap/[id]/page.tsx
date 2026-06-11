"use client";
import PageLoader from "@/components/ui/PageLoader";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
type Goal = {
    id: string;
    title: string;
    description: string | null;
    target_date: string | null;
    status: string;
};

type Milestone = {
    id: string;
    goal_id: string;
    title: string;
    completed: boolean;
    due_date: string | null;
};

type Task = {
    id: string;
    milestone_id: string;
    title: string;
    completed: boolean;
    scheduled_for: string | null;
};

export default function RoadmapPage() {
    const params = useParams();
    const goalId = params.id as string;
    const router = useRouter();
    const [goal, setGoal] = useState<Goal | null>(null);
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadRoadmap() {
            if (!goalId) {
                setLoading(false);
                return;
            }

            const { data: goalData } = await supabase
                .from("goals")
                .select("*")
                .eq("id", goalId)
                .single();

            if (goalData) {
                setGoal(goalData);
            }

            const { data: milestoneData, error: milestoneError } = await supabase
                .from("milestones")
                .select("*")
                .eq("goal_id", goalId);

            console.log("Milestones:", milestoneData);
            console.log("Milestone error:", milestoneError);

            if (milestoneData) {
                setMilestones(milestoneData);

                const milestoneIds = milestoneData.map((m) => m.id);

                if (milestoneIds.length > 0) {
                    const { data: taskData } = await supabase
  .from("tasks")
  .select("*")
  .in("milestone_id", milestoneIds)
  .order("position", { ascending: true });
                    if (taskData) {
                        setTasks(taskData);
                    }
                }
            }

            setLoading(false);
        }

        loadRoadmap();
    }, [goalId]);

    const completedTasks = tasks.filter((t) => t.completed).length;
    const totalTasks = tasks.length;
    const progress =
        totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);

    if (loading) {
        return <PageLoader message="Loading your AI roadmap..." />;
    }

    if (!goal) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
                Goal not found.
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-950 p-8 text-white">
            <div className="mx-auto max-w-5xl">
                <h1 className="mb-2 text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    AI Execution Roadmap
                </h1>
                <button
                    onClick={() => router.push("/dashboard")}
                    className="mb-4 mt-4 rounded-xl bg-slate-800 px-4 py-2 text-white hover:bg-slate-700"
                >
                    ← Back to Dashboard
                </button>

                <p className="mb-8 text-slate-400">
                    Track milestones, complete tasks, and monitor your AI-powered journey.
                </p>

                <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                    <h2 className="text-2xl font-bold">
                        {goal.title}
                    </h2>

                    {goal.description && (
                        <p className="mt-3 text-slate-300">
                            {goal.description}
                        </p>
                    )}

                    {goal.target_date && (
                        <p className="mt-3 text-slate-400">
                            🎯 Target Date: {goal.target_date}
                        </p>
                    )}
                </div>

                {/* Progress */}
                <div className="mb-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-8">
                    <div className="mb-3 flex justify-between text-sm">
                        <span>Overall Progress</span>
                        <span>
                            {completedTasks} / {totalTasks} Tasks ({progress}%)
                        </span>
                    </div>

                    <div className="h-4 w-full overflow-hidden rounded-full bg-slate-800">
                        <div
                            className="h-4 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
                {progress === 100 && (
                    <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-center text-emerald-300">
                        🎉 Congratulations! You completed every task in this roadmap.
                    </div>
                )}

                <div className="space-y-6">
                    {milestones.length === 0 ? (
                        <div className="relative rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-8 text-center shadow-lg">
                            <h3 className="text-2xl font-bold text-white">
                                🚀 No roadmap found
                            </h3>

                            <p className="mt-3 text-slate-400">
                                This goal doesn't have an AI roadmap yet.
                            </p>

                            <p className="mt-2 text-cyan-300">
                                Go back to the Dashboard and click
                                <span className="font-semibold"> "✨ Generate AI Roadmap"</span>
                                to create one.
                            </p>

                            <button
                                onClick={() => router.push("/dashboard")}
                                className="mt-6 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-500"
                            >
                                ← Back to Dashboard
                            </button>
                        </div>
                    ) : (
                            milestones.map((milestone, index) => {
                            const milestoneTasks = tasks.filter(
  (task) => task.milestone_id === milestone.id
);
                    return (
                    <div
                        key={milestone.id}
                        className="relative rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-lg transition hover:border-cyan-500/30"
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold">
                                {index + 1}. {milestone.title}
                            </h3>
                            <p className="mt-2 text-sm text-slate-400">
                                {milestoneTasks.filter((t) => t.completed).length} /{" "}
                                {milestoneTasks.length} tasks completed
                            </p>

                            <span
                                className={`rounded-full px-3 py-1 text-sm ${milestone.completed
                                    ? "bg-green-600"
                                    : "bg-yellow-600"
                                    }`}
                            >
                                {milestone.completed
                                    ? "Completed"
                                    : "Pending"}
                            </span>
                        </div>

                        <div className="mt-4 space-y-3">
                            {milestoneTasks.length === 0 ? (
                                <p className="text-slate-400">
                                    No tasks available.
                                </p>
                            ) : (
                                milestoneTasks.map((task) => (
                                    <label
                                        key={task.id}
                                        className="flex cursor-pointer items-center gap-4 rounded-2xl border border-slate-700 bg-slate-800/70 p-4 transition hover:border-cyan-500"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={async () => {
                                                const newValue = !task.completed;

                                                // Update the task in Supabase
                                                const { error } = await supabase
  .from("tasks")
  .update({
    completed: newValue,
  })
  .eq("id", task.id);

if (error) {
  console.error("Task update failed:", error);
  alert(error.message);
  return;
}

                                                // Build the updated local task list
                                                const updatedTasks = tasks.map((t) =>
                                                    t.id === task.id
                                                        ? {
                                                            ...t,
                                                            completed: newValue,
                                                        }
                                                        : t
                                                );

                                                // Update local task state
                                                setTasks(updatedTasks);

                                                // Check whether all tasks for this milestone are completed
                                                const milestoneTasks = updatedTasks.filter(
                                                    (t) => t.milestone_id === milestone.id
                                                );

                                                const allCompleted =
                                                    milestoneTasks.length > 0 &&
                                                    milestoneTasks.every((t) => t.completed);

                                                // Update milestone in Supabase
                                               const { error: milestoneError } = await supabase
  .from("milestones")
  .update({
    completed: allCompleted,
  })
  .eq("id", milestone.id);

if (milestoneError) {
  console.error("Milestone update failed:", milestoneError);
}
                                                // Update local milestone state
                                                setMilestones((prev) =>
                                                    prev.map((m) =>
                                                        m.id === milestone.id
                                                            ? {
                                                                ...m,
                                                                completed: allCompleted,
                                                            }
                                                            : m
                                                    )
                                                );
                                            }}
                                        />
                                        <span
                                            className={
                                                task.completed
                                                    ? "text-emerald-400 line-through"
                                                    : "text-white"
                                            }
                                        >
                                            {task.title}
                                        </span>
                                    </label>
                                ))
                            )}
                        </div>
                    </div>
                    );
                        })
                    )}
                </div>
            </div>
        </main>
    );
}