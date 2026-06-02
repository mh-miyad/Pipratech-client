import SectionEditor from "@/components/admin/SectionEditor";
import { ADMIN_PAGES } from "@/components/admin/admin-content-config";

const config = ADMIN_PAGES.find((p) => p.slug === "homepage")!;
const section = config.sections.find((s) => s.id === "testimonials")!;

export const metadata = { title: "Testimonials | PIPRA Trading" };

export default function TestimonialsPage() {
  return <SectionEditor sectionKey="testimonials" sectionConfig={section} />;
}
