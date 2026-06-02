import SectionEditor from "@/components/admin/SectionEditor";
import { ADMIN_PAGES } from "@/components/admin/admin-content-config";

const config = ADMIN_PAGES.find((p) => p.slug === "about")!;
const section = config.sections.find((s) => s.id === "hero")!;

export const metadata = { title: "About Hero | PIPRA Trading" };

export default function AboutHeroPage() {
  return <SectionEditor sectionKey="about-hero" sectionConfig={section} />;
}
