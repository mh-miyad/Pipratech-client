import AdminContentEditor from "@/components/admin/AdminContentEditor";
import { getAdminPage } from "@/components/admin/admin-content-config";

export default function AdminSisterConcernsPage() {
  const config = getAdminPage("sister-concerns");

  if (!config) {
    return null;
  }

  return <AdminContentEditor config={config} />;
}
