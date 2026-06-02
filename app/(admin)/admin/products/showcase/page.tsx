import SectionEditor from "@/components/admin/SectionEditor";
import { ADMIN_PAGES } from "@/components/admin/admin-content-config";

const config = ADMIN_PAGES.find((p) => p.slug === "products")!;
const section = config.sections.find((s) => s.id === "showcase")!;

export const metadata = { title: "Product Showcase | PIPRA Trading" };

export default function ProductsShowcasePage() {
  return <SectionEditor sectionKey="product-showcase" sectionConfig={section} />;
}
