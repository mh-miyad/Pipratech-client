import CategoriesEditor from "@/components/admin/CategoriesEditor";

export const metadata = { title: "Product Categories | PIPRA Trading" };

export default function CategoriesPage() {
  return <CategoriesEditor sectionKey="products" sectionTitle="Products" />;
}
