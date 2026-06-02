import SectionEditor from "@/components/admin/SectionEditor";
import { ADMIN_PAGES } from "@/components/admin/admin-content-config";

const config = ADMIN_PAGES.find((p) => p.slug === "homepage")!;
const section = config.sections.find((s) => s.id === "why-choose-us")!;

export const metadata = { title: "Why Choose Us | PIPRA Trading" };

export default function WhyChooseUsPage() {
  return <SectionEditor sectionKey="why-choose-us" sectionConfig={section} />;
}
