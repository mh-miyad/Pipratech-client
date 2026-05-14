import AdminContentEditor from "@/components/admin/AdminContentEditor";
import { getAdminPage } from "@/components/admin/admin-content-config";

export default function AdminGalleryPage() {
  const config = getAdminPage("gallery");

  if (!config) {
    return null;
  }

  return <AdminContentEditor config={config} />;
}
