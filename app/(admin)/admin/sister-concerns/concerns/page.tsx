import SectionEditor from "@/components/admin/SectionEditor";
import { ADMIN_PAGES } from "@/components/admin/admin-content-config";

const config = ADMIN_PAGES.find((p) => p.slug === "sister-concerns")!;
const section = config.sections.find((s) => s.id === "concerns")!;

export const metadata = { title: "Sister Concerns List | PIPRA Trading" };

export default function SisterConcernsListPage() {
  return <SectionEditor sectionKey="sister-concerns" sectionConfig={section} />;
}
