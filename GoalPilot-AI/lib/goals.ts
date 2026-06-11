import { supabase } from "@/lib/supabase/client";

export type Goal = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  target_date: string | null;
  status: "active" | "completed" | "paused";
  created_at: string;
};

/**
 * Fetch all goals for a given user.
 */
export async function getGoalsForUser(userId: string) {
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as Goal[];
}