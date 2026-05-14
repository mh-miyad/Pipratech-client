import AdminContentEditor from "@/components/admin/AdminContentEditor";
import { getAdminPage } from "@/components/admin/admin-content-config";

export default function AdminProductsPage() {
  const config = getAdminPage("products");

  if (!config) {
    return null;
  }

  return <AdminContentEditor config={config} />;
}
