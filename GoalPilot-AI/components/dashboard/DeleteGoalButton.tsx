
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";

type Props = {
  goalId: string;
};

export default function DeleteGoalButton({ goalId }: Props) {
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  async function handleDelete() {
    // First click asks for confirmation
    if (!confirmDelete) {
      setConfirmDelete(true);

      toast.warning("⚠️ Click Delete again within 5 seconds to confirm.");

      setTimeout(() => {
        setConfirmDelete(false);
      }, 5000);

      return;
    }
    try {
      setLoading(true);

      // Delete tasks belonging to this goal
      const { data: milestones } = await supabase
        .from("milestones")
        .select("id")
        .eq("goal_id", goalId);

      if (milestones && milestones.length > 0) {
        const milestoneIds = milestones.map((m) => m.id);

        await supabase
          .from("tasks")
          .delete()
          .in("milestone_id", milestoneIds);

        await supabase
          .from("milestones")
          .delete()
          .eq("goal_id", goalId);
      }

      // Delete the goal
      const { error } = await supabase
        .from("goals")
        .delete()
        .eq("id", goalId);

      if (error) {
        toast.error("Failed to delete goal.");
        return;
      }

      toast.success("Goal deleted successfully.");

      window.location.reload();
    } catch {
      toast.error("Something went wrong while deleting.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className={`rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${confirmDelete
          ? "bg-red-700 animate-pulse hover:bg-red-800"
          : "bg-gradient-to-r from-red-500 to-rose-600 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
        }`}
    >
      {loading
        ? "⏳ Deleting..."
        : confirmDelete
          ? "⚠️ Click Again to Confirm"
          : "🗑️ Delete Goal"}
    </button>
  );
}

