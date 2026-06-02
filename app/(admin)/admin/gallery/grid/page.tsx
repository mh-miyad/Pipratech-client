import SectionEditor from "@/components/admin/SectionEditor";
import { ADMIN_PAGES } from "@/components/admin/admin-content-config";

const config = ADMIN_PAGES.find((p) => p.slug === "gallery")!;
const section = config.sections.find((s) => s.id === "grid")!;

export const metadata = { title: "Gallery Grid | PIPRA Trading" };

export default function GalleryGridPage() {
  return <SectionEditor sectionKey="gallery-grid" sectionConfig={section} />;
}
