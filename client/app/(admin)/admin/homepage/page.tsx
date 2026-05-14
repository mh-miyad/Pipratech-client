import AdminContentEditor from "@/components/admin/AdminContentEditor";
import { getAdminPage } from "@/components/admin/admin-content-config";

export default function AdminHomepagePage() {
  const config = getAdminPage("homepage");

  if (!config) {
    return null;
  }

  return <AdminContentEditor config={config} />;
}
