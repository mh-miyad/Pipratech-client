"use client";

import { AuthProvider } from "./auth-context";

export default function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
