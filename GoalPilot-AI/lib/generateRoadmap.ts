
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

export async function generateRoadmap(
  goalId: string,
  goalTitle: string,
  force: boolean = false
) {
  // Check if roadmap already exists
  const { data: existing } = await supabase
    .from("milestones")
    .select("id")
    .eq("goal_id", goalId);

  if (!force && existing && existing.length > 0) {
    toast.info("This goal already has a roadmap.");
    return;
  }

  // Delete old roadmap when regenerating
  if (force && existing && existing.length > 0) {
    const milestoneIds = existing.map((m) => m.id);

    const { error: deleteTasksError } = await supabase
      .from("tasks")
      .delete()
      .in("milestone_id", milestoneIds);

    if (deleteTasksError) {
      console.error(deleteTasksError);
    }

    const { error: deleteMilestonesError } = await supabase
      .from("milestones")
      .delete()
      .eq("goal_id", goalId);

    if (deleteMilestonesError) {
      console.error(deleteMilestonesError);
    }
  }

  // Generate roadmap from AI
  const response = await fetch("/api/generate-roadmap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      goal: goalTitle,
    }),
  });

  if (!response.ok) {
    toast.error("Failed to generate roadmap.");
    return;
  }

  const roadmap = await response.json();

  // Save milestones and tasks
  for (const milestone of roadmap.milestones) {
    const { data: insertedMilestone, error } = await supabase
      .from("milestones")
      .insert({
        goal_id: goalId,
        title: milestone.title,
        completed: false,
      })
      .select()
      .single();

    if (error || !insertedMilestone) continue;

    const tasks = milestone.tasks.map(
      (task: string, index: number) => ({
        milestone_id: insertedMilestone.id,
        title: task,
        completed: false,
        position: index,
      })
    );

    await supabase.from("tasks").insert(tasks);
  }

  toast.success("✅ AI roadmap generated successfully!");
}

