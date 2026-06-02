import SectionEditor from "@/components/admin/SectionEditor";
import { ADMIN_PAGES } from "@/components/admin/admin-content-config";

const config = ADMIN_PAGES.find((p) => p.slug === "about")!;
const section = config.sections.find((s) => s.id === "story")!;

export const metadata = { title: "About Story | PIPRA Trading" };

export default function AboutStoryPage() {
  return <SectionEditor sectionKey="about-story" sectionConfig={section} />;
}
