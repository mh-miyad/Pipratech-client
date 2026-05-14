import type { Metadata } from "next";

import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "Admin | SNL International",
  description: "SNL International content management panel.",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminShell>{children}</AdminShell>;
}
