import SectionEditor from "@/components/admin/SectionEditor";
import { ADMIN_PAGES } from "@/components/admin/admin-content-config";

const config = ADMIN_PAGES.find((p) => p.slug === "homepage")!;
const section = config.sections.find((s) => s.id === "export-process")!;

export const metadata = { title: "Export Process | PIPRA Trading" };

export default function ExportProcessPage() {
  return <SectionEditor sectionKey="export-process" sectionConfig={section} />;
}
