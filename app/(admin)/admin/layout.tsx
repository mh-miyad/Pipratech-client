import type { Metadata } from "next";
import AdminShell from "@/components/admin/AdminShell";
import AdminAuthProvider from "@/components/admin/auth-provider";

export const metadata: Metadata = {
  title: "Admin | PIPRA Trading",
  description: "PIPRA Trading content management panel.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminShell>{children}</AdminShell>
    </AdminAuthProvider>
  );
}
