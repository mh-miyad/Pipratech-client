"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { api, type SafeUser, type LoginPayload, type LoginResponse } from "@/lib/api";

type AuthState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "authenticated"; user: SafeUser }
  | { status: "unauthenticated" };

type ActionResult = { success: boolean; message?: string };

type ChangePasswordPayload = { currentPassword: string; newPassword: string; confirmPassword: string };
type ResetPasswordPayload = { token: string; password: string; confirmPassword: string };

type AuthContextValue = {
  state: AuthState;
  login: (payload: LoginPayload) => Promise<ActionResult>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<ActionResult>;
  forgotPassword: (email: string) => Promise<ActionResult>;
  resetPassword: (payload: ResetPasswordPayload) => Promise<ActionResult>;
  changePassword: (payload: ChangePasswordPayload) => Promise<ActionResult>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

const PUBLIC_PATHS = ["/admin/auth", "/admin/auth/forgot-password", "/admin/auth/reset-password"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<AuthState>({ status: "idle" });

  useEffect(() => {
    const token = window.localStorage.getItem("pipra_access_token");
    if (!token) {
      setState({ status: "unauthenticated" });
      return;
    }

    api.get<SafeUser>("/auth/me").then((res) => {
      if (res.success) {
        setState({ status: "authenticated", user: res.data });
      } else {
        window.localStorage.removeItem("pipra_access_token");
        window.localStorage.removeItem("pipra_refresh_token");
        setState({ status: "unauthenticated" });
      }
    });
  }, []);

  useEffect(() => {
    if (state.status === "idle") return;
    const isPublic = PUBLIC_PATHS.includes(pathname);

    if (state.status === "unauthenticated" && !isPublic) {
      router.replace("/admin/auth");
    }
    if (state.status === "authenticated" && isPublic) {
      router.replace("/admin/homepage");
    }
  }, [state.status, pathname, router]);

  async function login(payload: LoginPayload): Promise<ActionResult> {
    setState({ status: "loading" });
    const res = await api.post<LoginResponse>("/auth/login", payload);

    if (!res.success) {
      setState({ status: "unauthenticated" });
      return { success: false, message: res.message };
    }

    const { user, tokens } = res.data;

    if (user.role === "SUPER_ADMIN") {
      setState({ status: "unauthenticated" });
      return { success: false, message: "Please use the SaaS admin panel." };
    }

    window.localStorage.setItem("pipra_access_token", tokens.accessToken);
    window.localStorage.setItem("pipra_refresh_token", tokens.refreshToken);
    setState({ status: "authenticated", user });
    return { success: true };
  }

  async function logout() {
    await api.post("/auth/logout");
    window.localStorage.removeItem("pipra_access_token");
    window.localStorage.removeItem("pipra_refresh_token");
    setState({ status: "unauthenticated" });
  }

  async function logoutAll(): Promise<ActionResult> {
    const res = await api.post("/auth/logout-all");
    window.localStorage.removeItem("pipra_access_token");
    window.localStorage.removeItem("pipra_refresh_token");
    setState({ status: "unauthenticated" });
    if (!res.success) return { success: false, message: res.message };
    return { success: true };
  }

  async function forgotPassword(email: string): Promise<ActionResult> {
    const res = await api.post("/auth/forgot-password", { email });
    if (!res.success) return { success: false, message: res.message };
    return { success: true, message: res.message };
  }

  async function resetPassword(payload: ResetPasswordPayload): Promise<ActionResult> {
    const res = await api.post("/auth/reset-password", payload);
    if (!res.success) return { success: false, message: res.message };
    return { success: true, message: res.message };
  }

  async function changePassword(payload: ChangePasswordPayload): Promise<ActionResult> {
    const res = await api.patch("/auth/change-password", payload);
    if (!res.success) return { success: false, message: res.message };
    return { success: true, message: res.message };
  }

  const isLoading = state.status === "idle" || state.status === "loading";

  return (
    <AuthContext.Provider value={{ state, login, logout, logoutAll, forgotPassword, resetPassword, changePassword, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
