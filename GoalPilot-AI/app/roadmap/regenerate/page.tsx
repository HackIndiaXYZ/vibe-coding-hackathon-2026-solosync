"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { generateRoadmap } from "@/lib/generateRoadmap";
import PageLoader from "@/components/ui/PageLoader";

function RegenerateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goalId = searchParams.get("id");

  useEffect(() => {
    async function regenerate() {
      if (!goalId) {
        router.replace("/dashboard");
        return;
      }

      // Fetch goal
      const { data: goal } = await supabase
        .from("goals")
        .select("title")
        .eq("id", goalId)
        .single();

      if (!goal) {
        router.replace("/dashboard");
        return;
      }

     

      // Generate fresh roadmap
      await generateRoadmap(goalId, goal.title, true);

      // Redirect to roadmap page
      router.replace(`/roadmap/${goalId}`);
    }

    regenerate();
  }, [goalId, router]);

  return <PageLoader message="Regenerating AI roadmap..." />;
}

export default function RegeneratePage() {
  return (
    <Suspense fallback={<PageLoader message="Loading..." />}>
      <RegenerateContent />
    </Suspense>
  );
}