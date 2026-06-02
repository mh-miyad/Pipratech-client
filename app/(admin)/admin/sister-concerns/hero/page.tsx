import SectionEditor from "@/components/admin/SectionEditor";
import { ADMIN_PAGES } from "@/components/admin/admin-content-config";

const config = ADMIN_PAGES.find((p) => p.slug === "sister-concerns")!;
const section = config.sections.find((s) => s.id === "hero")!;

export const metadata = { title: "Sister Concerns Hero | PIPRA Trading" };

export default function SisterConcernsHeroPage() {
  return <SectionEditor sectionKey="sister-concerns-hero" sectionConfig={section} />;
}
