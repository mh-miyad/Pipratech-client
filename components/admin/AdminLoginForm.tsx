"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useAuth } from "@/components/admin/auth-context";

export default function AdminLoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const result = await login(form);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.message || "Login failed. Please try again.");
    } else {
      router.replace("/admin/homepage");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1a3a52]">Email Address</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          placeholder="admin@pipratrading.com"
          className="h-11 w-full rounded-md border border-[#e2e8f0] bg-white px-4 text-sm outline-none transition-colors focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[#1a3a52]">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="Enter your password"
            className="h-11 w-full rounded-md border border-[#e2e8f0] bg-white px-4 pr-10 text-sm outline-none transition-colors focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1a3a52]"
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <Link href="/admin/auth/forgot-password" className="text-[#dc2626] hover:underline">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#dc2626] text-sm font-medium text-white transition-colors hover:bg-[#b91c1c] disabled:opacity-60"
      >
        {isSubmitting ? (
          "Signing in..."
        ) : (
          <>
            <LogIn className="size-4" />
            Sign In
          </>
        )}
      </button>
    </form>
  );
}
