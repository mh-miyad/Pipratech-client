export type AdminFieldType = "text" | "textarea" | "image" | "url" | "select";

export type AdminField = {
  name: string;
  label: string;
  type: AdminFieldType;
  placeholder?: string;
  options?: { label: string; value: string }[];
};

export type AdminRepeatable = {
  name: string;
  label: string;
  itemLabel: string;
  addLabel: string;
  fields: AdminField[];
  defaultItem?: Record<string, string>;
};

export type AdminSection = {
  id: string;
  title: string;
  description: string;
  fields: AdminField[];
  repeatables?: AdminRepeatable[];
};

export type AdminPageConfig = {
  slug: string;
  label: string;
  href: string;
  title: string;
  description: string;
  sections: AdminSection[];
};

const titleCopyImageFields: AdminField[] = [
  { name: "title", label: "Title", type: "text" },
  { name: "highlight", label: "Highlight Text", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "image", label: "Image Path", type: "image", placeholder: "/hero-img.png" },
];

const leftRightOptions = [
  { label: "Left", value: "left" },
  { label: "Right", value: "right" },
];

export const adminPages: AdminPageConfig[] = [
  {
    slug: "homepage",
    label: "Homepage",
    href: "/admin/homepage",
    title: "Homepage Content",
    description: "Control every visible homepage section from hero to FAQ.",
    sections: [
      {
        id: "hero",
        title: "Hero Section",
        description: "Main slider copy, buttons, badge, and background image.",
        fields: [
          { name: "line1", label: "Heading Line 1", type: "text" },
          { name: "line2", label: "Heading Line 2", type: "text" },
          { name: "accent", label: "Accent Word", type: "text" },
          { name: "sub", label: "Subtitle", type: "textarea" },
          { name: "primaryButton", label: "Primary Button", type: "text" },
          { name: "secondaryButton", label: "Secondary Button", type: "text" },
          { name: "whatsappUrl", label: "WhatsApp URL", type: "url" },
          { name: "badgeNumber", label: "Badge Number", type: "text" },
          { name: "badgeText", label: "Badge Text", type: "textarea" },
          { name: "image", label: "Background Image", type: "image" },
        ],
        repeatables: [
          {
            name: "slides",
            label: "Hero Slides",
            itemLabel: "Slide",
            addLabel: "Add Slide",
            fields: [
              { name: "line1", label: "Heading Line 1", type: "text" },
              { name: "line2", label: "Heading Line 2", type: "text" },
              { name: "accent", label: "Accent Word", type: "text" },
              { name: "sub", label: "Subtitle", type: "textarea" },
              { name: "image", label: "Background Image", type: "image", placeholder: "/hero-img.png" },
              { name: "contentPosition", label: "Content Position", type: "select", options: leftRightOptions },
            ],
          },
        ],
      },
      {
        id: "serving-worldwide",
        title: "Serving Worldwide",
        description: "Section title, intro copy, and exported country list.",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "highlight", label: "Highlight Text", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ],
        repeatables: [
          {
            name: "countries",
            label: "Countries",
            itemLabel: "Country",
            addLabel: "Add Country",
            fields: [
              { name: "name", label: "Country Name", type: "text" },
              { name: "flagCode", label: "Flag Code", type: "text", placeholder: "us" },
              { name: "lat", label: "Latitude", type: "text" },
              { name: "lng", label: "Longitude", type: "text" },
            ],
          },
        ],
      },
      {
        id: "product-catalogue",
        title: "Product Catalogue",
        description: "Homepage product grid cards and view-all call to action.",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "subtitle", label: "Subtitle", type: "text" },
          { name: "ctaText", label: "CTA Text", type: "text" },
        ],
        repeatables: [
          {
            name: "products",
            label: "Product Cards",
            itemLabel: "Product",
            addLabel: "Add Product",
            fields: [
              { name: "name", label: "Product Name", type: "text" },
              { name: "description", label: "Description", type: "textarea" },
              { name: "image", label: "Image Path", type: "image", placeholder: "/hero-img.png" },
              { name: "featured", label: "Featured", type: "text", placeholder: "yes or no" },
              { name: "imagePosition", label: "Image Position", type: "select", options: leftRightOptions },
            ],
          },
        ],
      },
      {
        id: "why-jute",
        title: "Why Choose Jute",
        description: "Image, long copy, and feature labels.",
        fields: [
          ...titleCopyImageFields,
          { name: "imagePosition", label: "Image Position", type: "select", options: leftRightOptions },
        ],
        repeatables: [
          {
            name: "features",
            label: "Feature Labels",
            itemLabel: "Feature",
            addLabel: "Add Feature",
            fields: [{ name: "label", label: "Label", type: "text" }],
          },
        ],
      },
      {
        id: "why-us",
        title: "Why Choose Us",
        description: "Trust points, value cards, and section text.",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ],
        repeatables: [
          {
            name: "cards",
            label: "Cards",
            itemLabel: "Card",
            addLabel: "Add Card",
            fields: [
              { name: "title", label: "Title", type: "text" },
              { name: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        id: "export-process",
        title: "Export Process",
        description: "Process steps from inquiry to delivery.",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ],
        repeatables: [
          {
            name: "steps",
            label: "Steps",
            itemLabel: "Step",
            addLabel: "Add Step",
            fields: [
              { name: "title", label: "Step Title", type: "text" },
              { name: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        id: "certifications",
        title: "Certifications & Trust",
        description: "Certificate names, trust copy, and quality metrics.",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ],
        repeatables: [
          {
            name: "certifications",
            label: "Certifications",
            itemLabel: "Certification",
            addLabel: "Add Certification",
            fields: [
              { name: "name", label: "Name", type: "text" },
              { name: "description", label: "Description", type: "textarea" },
            ],
          },
        ],
      },
      {
        id: "testimonials",
        title: "Testimonials",
        description: "Buyer quotes and author details.",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ],
        repeatables: [
          {
            name: "items",
            label: "Testimonials",
            itemLabel: "Testimonial",
            addLabel: "Add Testimonial",
            fields: [
              { name: "quote", label: "Quote", type: "textarea" },
              { name: "name", label: "Buyer Name", type: "text" },
              { name: "company", label: "Company", type: "text" },
              { name: "country", label: "Country", type: "text" },
            ],
          },
        ],
      },
      {
        id: "faq",
        title: "FAQ",
        description: "Homepage questions and answers.",
        fields: [
          { name: "title", label: "Title", type: "text" },
        ],
        repeatables: [
          {
            name: "items",
            label: "Questions & Answers",
            itemLabel: "FAQ",
            addLabel: "Add FAQ",
            fields: [
              { name: "question", label: "Question", type: "text" },
              { name: "answer", label: "Answer", type: "textarea" },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "sister-concerns",
    label: "Our Sister Concern",
    href: "/admin/sister-concerns",
    title: "Sister Concern Content",
    description: "Manage all sister concern blocks, membership text, and images.",
    sections: [
      {
        id: "page-hero",
        title: "Page Hero",
        description: "Top banner content for sister concern page.",
        fields: titleCopyImageFields,
      },
      {
        id: "concerns",
        title: "Concern List",
        description: "Company name, description, memberships, image, and layout side.",
        fields: [
        ],
        repeatables: [
          {
            name: "items",
            label: "Companies",
            itemLabel: "Company",
            addLabel: "Add Company",
            fields: [
              { name: "companyName", label: "Company Name", type: "text" },
              { name: "description", label: "Description", type: "textarea" },
              { name: "members", label: "Member Of", type: "textarea" },
              { name: "image", label: "Image Path", type: "image", placeholder: "/hero-img.png" },
              { name: "imageSide", label: "Image Side", type: "select", options: leftRightOptions },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "gallery",
    label: "Gallery",
    href: "/admin/gallery",
    title: "Gallery Content",
    description: "Manage gallery hero, image cards, captions, and ordering.",
    sections: [
      { id: "page-hero", title: "Page Hero", description: "Top gallery banner.", fields: titleCopyImageFields },
      {
        id: "gallery-grid",
        title: "Gallery Grid",
        description: "Image paths, alt text, categories, and captions.",
        fields: [
        ],
        repeatables: [
          {
            name: "images",
            label: "Images",
            itemLabel: "Image",
            addLabel: "Add Image",
            fields: [
              { name: "image", label: "Image Path", type: "image", placeholder: "/hero-img.png" },
              { name: "alt", label: "Alt Text", type: "text" },
              { name: "caption", label: "Caption", type: "text" },
              { name: "category", label: "Category", type: "text" },
            ],
          },
          {
            name: "categories",
            label: "Categories",
            itemLabel: "Category",
            addLabel: "Add Category",
            fields: [{ name: "name", label: "Category Name", type: "text" }],
          },
        ],
      },
    ],
  },
  {
    slug: "products",
    label: "Product",
    href: "/admin/products",
    title: "Product Content",
    description: "Manage product page hero, product cards, specs, and CTA text.",
    sections: [
      { id: "page-hero", title: "Page Hero", description: "Top product page banner.", fields: titleCopyImageFields },
      {
        id: "product-showcase",
        title: "Product Showcase",
        description: "Product names, descriptions, images, and specification text.",
        fields: [
          { name: "ctaText", label: "CTA Text", type: "text" },
          { name: "ctaUrl", label: "CTA URL", type: "url" },
        ],
        repeatables: [
          {
            name: "products",
            label: "Products",
            itemLabel: "Product",
            addLabel: "Add Product",
            fields: [
              { name: "name", label: "Product Name", type: "text" },
              { name: "description", label: "Description", type: "textarea" },
              { name: "image", label: "Image Path", type: "image", placeholder: "/hero-img.png" },
              { name: "specs", label: "Specifications", type: "textarea" },
              { name: "imagePosition", label: "Image Position", type: "select", options: leftRightOptions },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "about",
    label: "About Us",
    href: "/admin/about",
    title: "About Us Content",
    description: "Manage about hero, story sections, stats, and contact CTA.",
    sections: [
      { id: "page-hero", title: "Page Hero", description: "Top about page banner.", fields: titleCopyImageFields },
      {
        id: "story",
        title: "Story Sections",
        description: "Company story, mission, values, and supporting images.",
        fields: [
          { name: "storyTitle", label: "Story Title", type: "text" },
          { name: "storyCopy", label: "Story Copy", type: "textarea" },
          { name: "mission", label: "Mission", type: "textarea" },
          { name: "values", label: "Values", type: "textarea" },
          { name: "image", label: "Image Path", type: "image" },
          { name: "imagePosition", label: "Image Position", type: "select", options: leftRightOptions },
        ],
      },
      {
        id: "stats",
        title: "Stats",
        description: "Numbers shown across the about page.",
        fields: [
        ],
        repeatables: [
          {
            name: "items",
            label: "Stats",
            itemLabel: "Stat",
            addLabel: "Add Stat",
            fields: [
              { name: "value", label: "Value", type: "text", placeholder: "15+" },
              { name: "label", label: "Label", type: "text", placeholder: "Countries Served" },
            ],
          },
        ],
      },
    ],
  },
];

export function getAdminPage(slug: string) {
  return adminPages.find((page) => page.slug === slug);
}
