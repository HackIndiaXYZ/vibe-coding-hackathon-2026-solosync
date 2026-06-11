
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);

      await supabase.auth.signOut();

      toast.success("Logged out successfully 👋");

      router.push("/login");
      router.refresh();
    } catch {
      toast.error("Failed to log out.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 px-5 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "⏳ Logging out..." : "🚪 Logout"}
    </button>
  );
}

