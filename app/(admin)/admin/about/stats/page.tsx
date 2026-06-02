import SectionEditor from "@/components/admin/SectionEditor";
import { ADMIN_PAGES } from "@/components/admin/admin-content-config";

const config = ADMIN_PAGES.find((p) => p.slug === "about")!;
const section = config.sections.find((s) => s.id === "stats")!;

export const metadata = { title: "About Stats | PIPRA Trading" };

export default function AboutStatsPage() {
  return <SectionEditor sectionKey="about-stats" sectionConfig={section} />;
}
