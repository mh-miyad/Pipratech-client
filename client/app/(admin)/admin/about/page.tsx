import AdminContentEditor from "@/components/admin/AdminContentEditor";
import { getAdminPage } from "@/components/admin/admin-content-config";

export default function AdminAboutPage() {
  const config = getAdminPage("about");

  if (!config) {
    return null;
  }

  return <AdminContentEditor config={config} />;
}
