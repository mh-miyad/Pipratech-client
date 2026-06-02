"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, KeyRound } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/admin/auth-context";

function ResetPasswordFormInner() {
  const { resetPassword } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  if (!token) {
    return (
      <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
        Invalid reset link. Missing token.
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    const result = await resetPassword({ token, ...form });
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message || "Reset failed.");
    } else {
      setMessage("Password reset successful! Redirecting...");
      setTimeout(() => router.replace("/admin/auth"), 2000);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
      {message && <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">{message}</div>}

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1a3a52]">New Password</label>
        <input
          type="password"
          required
          minLength={8}
          value={form.password}
          onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          placeholder="Min 8 characters"
          className="h-11 w-full rounded-md border border-[#e2e8f0] bg-white px-4 text-sm outline-none transition-colors focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1a3a52]">Confirm Password</label>
        <input
          type="password"
          required
          value={form.confirmPassword}
          onChange={(e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
          placeholder="Re-enter password"
          className="h-11 w-full rounded-md border border-[#e2e8f0] bg-white px-4 text-sm outline-none transition-colors focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#dc2626] text-sm font-medium text-white transition-colors hover:bg-[#b91c1c] disabled:opacity-60"
      >
        {isSubmitting ? "Resetting..." : <><KeyRound className="size-4" /> Reset Password</>}
      </button>

      <div className="text-center">
        <Link href="/admin/auth" className="inline-flex items-center gap-1.5 text-sm text-[#1a3a52] hover:text-[#dc2626]">
          <ArrowLeft className="size-3.5" />
          Back to login
        </Link>
      </div>
    </form>
  );
}

export default function ResetPasswordForm() {
  return (
    <Suspense>
      <ResetPasswordFormInner />
    </Suspense>
  );
}
