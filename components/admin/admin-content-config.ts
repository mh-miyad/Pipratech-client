export type AdminFieldType = "text" | "textarea" | "image" | "url" | "select";
export type AdminField = { name: string; label: string; type: AdminFieldType; placeholder?: string; options?: string[] };
export type AdminRepeatable = { name: string; label: string; itemLabel: string; addLabel: string; fields: AdminField[]; defaultItem?: Record<string, string> };
export type AdminSection = { id: string; title: string; description: string; fields: AdminField[]; repeatables?: AdminRepeatable[] };
export type AdminPageConfig = { slug: string; label: string; href: string; title: string; description: string; sections: AdminSection[] };

export const ADMIN_PAGES: AdminPageConfig[] = [
  {
    slug: "homepage",
    label: "Homepage",
    href: "/admin/homepage",
    title: "Homepage Content",
    description: "Manage homepage hero banners and sections.",
    sections: [
      {
        id: "hero",
        title: "Hero Banners",
        description: "Manage hero banner slides on the homepage.",
        fields: [
          { name: "title", label: "Title", type: "text", placeholder: "Hero slide heading" },
          { name: "subtitle", label: "Subtitle", type: "textarea", placeholder: "Short description text" },
          { name: "image", label: "Background Image", type: "image", placeholder: "Upload or paste image URL" },
          { name: "buttonText", label: "Button Text", type: "text", placeholder: "e.g. View Products" },
          { name: "buttonLink", label: "Button Link", type: "url", placeholder: "e.g. /products" },
        ],
      },
      {
        id: "faq",
        title: "FAQ Section",
        description: "Manage frequently asked questions.",
        fields: [
          { name: "title", label: "Question", type: "text", placeholder: "FAQ question" },
          { name: "description", label: "Answer", type: "textarea", placeholder: "FAQ answer" },
        ],
      },
      {
        id: "testimonials",
        title: "Testimonials",
        description: "Manage client testimonials and reviews.",
        fields: [
          { name: "title", label: "Client Name", type: "text", placeholder: "e.g. John Doe" },
          { name: "description", label: "Testimonial Text", type: "textarea", placeholder: "What they said..." },
          { name: "image", label: "Avatar (optional)", type: "image", placeholder: "Client photo URL" },
        ],
      },
      {
        id: "why-choose-us",
        title: "Why Choose Us",
        description: "Manage trust and advantage items.",
        fields: [
          { name: "title", label: "Title", type: "text", placeholder: "e.g. Licensed Supply" },
          { name: "description", label: "Description", type: "textarea", placeholder: "Feature description" },
          { name: "image", label: "Icon URL (optional)", type: "image", placeholder: "Icon image URL" },
        ],
      },
      {
        id: "export-process",
        title: "Export Process",
        description: "Manage export/process step items.",
        fields: [
          { name: "title", label: "Step Title", type: "text", placeholder: "e.g. Inquiry" },
          { name: "description", label: "Step Description", type: "textarea", placeholder: "Process step details" },
        ],
      },
    ],
  },
  {
    slug: "sister-concerns",
    label: "Sister Concern",
    href: "/admin/sister-concerns",
    title: "Sister Concern Content",
    description: "Manage sister concern page hero and company blocks.",
    sections: [
      {
        id: "hero",
        title: "Page Hero",
        description: "Hero section of the sister concerns page.",
        fields: [
          { name: "title", label: "Heading", type: "text", placeholder: "Page heading" },
          { name: "description", label: "Subtitle", type: "textarea", placeholder: "Page subtitle" },
        ],
      },
      {
        id: "concerns",
        title: "Concern Companies",
        description: "Manage sister concern company blocks.",
        fields: [
          { name: "title", label: "Company Name", type: "text", placeholder: "e.g. PIPRA Projects" },
          { name: "description", label: "Description", type: "textarea", placeholder: "Company description" },
          { name: "image", label: "Company Image", type: "image", placeholder: "Upload or paste image URL" },
        ],
      },
    ],
  },
  {
    slug: "gallery",
    label: "Gallery",
    href: "/admin/gallery",
    title: "Gallery Content",
    description: "Manage gallery page hero and image grid.",
    sections: [
      {
        id: "hero",
        title: "Page Hero",
        description: "Hero section of the gallery page.",
        fields: [
          { name: "title", label: "Heading", type: "text", placeholder: "Page heading" },
          { name: "description", label: "Subtitle", type: "textarea", placeholder: "Page subtitle" },
        ],
      },
      {
        id: "grid",
        title: "Gallery Images",
        description: "Manage gallery images in the grid.",
        fields: [
          { name: "title", label: "Image Caption", type: "text", placeholder: "Image title" },
          { name: "image", label: "Image", type: "image", placeholder: "Upload or paste image URL" },
        ],
      },
    ],
  },
  {
    slug: "products",
    label: "Products",
    href: "/admin/products",
    title: "Products Content",
    description: "Manage products page hero and product showcase.",
    sections: [
      {
        id: "hero",
        title: "Page Hero",
        description: "Hero section of the products page.",
        fields: [
          { name: "title", label: "Heading", type: "text", placeholder: "Page heading" },
          { name: "description", label: "Subtitle", type: "textarea", placeholder: "Page subtitle" },
        ],
      },
      {
        id: "showcase",
        title: "Product Showcase",
        description: "Manage product display items.",
        fields: [
          { name: "title", label: "Product Name", type: "text", placeholder: "e.g. Single Pole MCB" },
          { name: "description", label: "Description", type: "textarea", placeholder: "Product description" },
          { name: "image", label: "Product Image", type: "image", placeholder: "Upload or paste image URL" },
        ],
      },
    ],
  },
  {
    slug: "about",
    label: "About Us",
    href: "/admin/about",
    title: "About Us Content",
    description: "Manage about page hero, story and stats.",
    sections: [
      {
        id: "hero",
        title: "Page Hero",
        description: "Hero section of the about page.",
        fields: [
          { name: "title", label: "Heading", type: "text", placeholder: "Page heading" },
          { name: "description", label: "Subtitle", type: "textarea", placeholder: "Page subtitle" },
        ],
      },
      {
        id: "story",
        title: "Story Sections",
        description: "Manage about page story/company info sections.",
        fields: [
          { name: "title", label: "Section Title", type: "text", placeholder: "Section heading" },
          { name: "description", label: "Content", type: "textarea", placeholder: "Section content" },
          { name: "image", label: "Image (optional)", type: "image", placeholder: "Upload or paste image URL" },
        ],
      },
      {
        id: "stats",
        title: "Stats",
        description: "Manage company statistics display.",
        fields: [
          { name: "title", label: "Stat Label", type: "text", placeholder: "e.g. Customers" },
          { name: "description", label: "Stat Value", type: "text", placeholder: "e.g. 1000+" },
        ],
      },
    ],
  },
];
