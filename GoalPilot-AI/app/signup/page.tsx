
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useEffect } from "react";

export default function SignupPage() {
  const router = useRouter();
useEffect(() => {
  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      router.replace("/dashboard");
    }
  }

  checkUser();
}, [router]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignup() {
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

   const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: `${window.location.origin}/login?verified=true`,
  },
});

    setLoading(false);

   if (error) {
  toast.error(error.message);
  return;
}

// Email already exists (common Supabase behavior)
if (
  data.user &&
  Array.isArray(data.user.identities) &&
  data.user.identities.length === 0
) {
  toast.error("This email is already registered. Please sign in.");
  router.push("/login");
  return;
}

    toast.success("Account created successfully! 📧");

router.push(
  `/confirm-email?email=${encodeURIComponent(email)}`
);
  }
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#16a34a22,transparent_50%)]" />

      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600">
            <UserPlus className="h-7 w-7 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-slate-400">
            Join GoalPilot AI and start achieving your goals.
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            autoComplete="email"
            className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSignup()}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="new-password"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 pr-12 text-white outline-none transition focus:border-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSignup()}
            />

            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-green-400 hover:text-green-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
