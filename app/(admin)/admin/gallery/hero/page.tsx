import SectionEditor from "@/components/admin/SectionEditor";
import { ADMIN_PAGES } from "@/components/admin/admin-content-config";

const config = ADMIN_PAGES.find((p) => p.slug === "gallery")!;
const section = config.sections.find((s) => s.id === "hero")!;

export const metadata = { title: "Gallery Hero | PIPRA Trading" };

export default function GalleryHeroPage() {
  return <SectionEditor sectionKey="gallery-hero" sectionConfig={section} />;
}
