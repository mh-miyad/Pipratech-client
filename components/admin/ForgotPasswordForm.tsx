"use client";

import { useState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/admin/auth-context";

export default function ForgotPasswordForm() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    const result = await forgotPassword(email);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message || "Failed to send reset email.");
    } else {
      setMessage(result.message || "If that email exists, we sent a reset link.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}
      {message && <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">{message}</div>}

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1a3a52]">Email Address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@pipratrading.com"
          className="h-11 w-full rounded-md border border-[#e2e8f0] bg-white px-4 text-sm outline-none transition-colors focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#dc2626] text-sm font-medium text-white transition-colors hover:bg-[#b91c1c] disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : <><Mail className="size-4" /> Send Reset Link</>}
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
