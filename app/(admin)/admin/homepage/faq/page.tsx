import SectionEditor from "@/components/admin/SectionEditor";
import { ADMIN_PAGES } from "@/components/admin/admin-content-config";

const config = ADMIN_PAGES.find((p) => p.slug === "homepage")!;
const section = config.sections.find((s) => s.id === "faq")!;

export const metadata = { title: "FAQ | PIPRA Trading" };

export default function FaqPage() {
  return <SectionEditor sectionKey="faq" sectionConfig={section} />;
}
