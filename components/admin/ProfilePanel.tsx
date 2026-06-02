"use client";

import { useState, useEffect } from "react";
import { Camera, Check, KeyRound, LogOut, ShieldAlert } from "lucide-react";
import { useAuth } from "@/components/admin/auth-context";
import type { SafeUser } from "@/lib/api";

export default function ProfilePanel() {
  const { state, changePassword, logoutAll } = useAuth();
  const user = state.status === "authenticated" ? state.user : null as SafeUser | null;

  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwStatus, setPwStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [pwMessage, setPwMessage] = useState("");

  const [logoutAllStatus, setLogoutAllStatus] = useState<"idle" | "loading">("idle");

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setPwStatus("loading");
    setPwMessage("");

    const result = await changePassword(pwForm);
    if (!result.success) {
      setPwStatus("error");
      setPwMessage(result.message || "Failed to change password.");
    } else {
      setPwStatus("success");
      setPwMessage("Password changed successfully.");
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }
  }

  async function handleLogoutAll() {
    setLogoutAllStatus("loading");
    await logoutAll();
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="size-8 animate-spin rounded-full border-2 border-[#dc2626] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-8">
      <div className="rounded-lg border border-[#e2e8f0] bg-white p-6">
        <h2 className="text-lg font-semibold text-[#1a3a52]">Profile Information</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Name</p>
            <p className="mt-1 text-sm font-medium text-[#1a3a52]">{user.name || "—"}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Email</p>
            <p className="mt-1 text-sm font-medium text-[#1a3a52]">{user.email}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Role</p>
            <p className="mt-1 text-sm font-medium text-[#1a3a52]">{user.role}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">Status</p>
            <p className="mt-1 text-sm font-medium text-[#1a3a52]">{user.status}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-[#e2e8f0] bg-white p-6">
        <h2 className="text-lg font-semibold text-[#1a3a52]">Change Password</h2>
        <form onSubmit={handleChangePassword} className="mt-5 space-y-4">
          {pwMessage && (
            <div className={`rounded-md px-4 py-3 text-sm ${pwStatus === "success" ? "border border-green-200 bg-green-50 text-green-600" : "border border-red-200 bg-red-50 text-red-600"}`}>
              {pwMessage}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1a3a52]">Current Password</label>
            <input
              type="password"
              required
              value={pwForm.currentPassword}
              onChange={(e) => setPwForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
              className="h-11 w-full rounded-md border border-[#e2e8f0] bg-white px-4 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1a3a52]">New Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={pwForm.newPassword}
                onChange={(e) => setPwForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                className="h-11 w-full rounded-md border border-[#e2e8f0] bg-white px-4 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1a3a52]">Confirm Password</label>
              <input
                type="password"
                required
                value={pwForm.confirmPassword}
                onChange={(e) => setPwForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                className="h-11 w-full rounded-md border border-[#e2e8f0] bg-white px-4 text-sm outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626]"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={pwStatus === "loading"}
            className="flex h-11 items-center gap-2 rounded-md bg-[#dc2626] px-5 text-sm font-medium text-white transition-colors hover:bg-[#b91c1c] disabled:opacity-60"
          >
            {pwStatus === "loading" ? "Updating..." : <><KeyRound className="size-4" /> Update Password</>}
          </button>
        </form>
      </div>

      <div className="rounded-lg border border-red-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
        <p className="mt-2 text-sm text-gray-500">Logout from all devices and sessions.</p>
        <button
          type="button"
          onClick={handleLogoutAll}
          disabled={logoutAllStatus === "loading"}
          className="mt-4 flex h-10 items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 text-sm font-medium text-red-600 transition-colors hover:bg-red-100 disabled:opacity-60"
        >
          {logoutAllStatus === "loading" ? "Logging out..." : <><LogOut className="size-4" /> Logout All Sessions</>}
        </button>
      </div>
    </div>
  );
}
