const BASE_URL = typeof window !== "undefined" ? "" : (process.env.NEXT_PUBLIC_BACKEND_URL || "https://industry-portfolio.techelementbd.com").replace(/\/$/, "");
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || "7e96ad0e-30eb-4eac-9d27-06e0cf57b80d";

function publicHeaders(): HeadersInit {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  if (TENANT_ID) {
    h["tenant-id"] = TENANT_ID;
    h["x-tenant-id"] = TENANT_ID;
  }
  return h;
}

async function publicGet<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/v1${path}`, {
      headers: publicHeaders(),
      next: { revalidate: process.env.NODE_ENV === "development" ? 0 : 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success ? (json.data as T) : null;
  } catch {
    return null;
  }
}

export type HeroButton = {
  id: string;
  label: string;
  url: string;
  type: "PRIMARY" | "SECONDARY";
  icon: string | null;
  sortOrder: number;
};

export type ApiBanner = {
  id: string;
  title: string;
  highlightTitle: string | null;
  description: string | null;
  imageUrl: string;
  mobileImageUrl: string | null;
  tagTitle: string | null;
  tagText: string | null;
  sortOrder: number;
  heroButtons: HeroButton[];
};

export async function fetchHeroBanners(): Promise<ApiBanner[]> {
  const data = await publicGet<ApiBanner[]>("/public/hero-banner");
  return data ?? [];
}

type PublicSectionItemResponse = {
  id: string;
  title: string | null;
  highlight: string | null;
  subtitle: string | null;
  question: string | null;
  answer: string | null;
  description: string | null;
  imageUrl?: string | null;
  icon: string | null;
  category?: string | null;
  extra: unknown;
  sortOrder: number;
};

type PublicSectionResponse = {
  id: string;
  key: string;
  slug?: string | null;
  title: string | null;
  highlight: string | null;
  subtitle: string | null;
  description: string | null;
  bgImageUrl?: string | null;
  extra?: unknown;
  sortOrder?: number;
  items?: PublicSectionItemResponse[];
  categories?: any[];
};

export type ApiSectionCategory = {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
  description?: string | null;
  sortOrder: number;
  extra?: unknown;
};

export type ApiSectionItem = {
  id: string;
  title: string | null;
  highlight: string | null;
  subtitle: string | null;
  question: string | null;
  answer: string | null;
  description: string | null;
  image: string | null;
  icon: string | null;
  category?: string | null;
  extra: unknown;
  sortOrder: number;
};

export type ApiSection = {
  id: string;
  key: string;
  slug?: string | null;
  title: string | null;
  highlight: string | null;
  subtitle: string | null;
  description: string | null;
  bgImageUrl?: string | null;
  extra?: unknown;
  sortOrder: number;
  items: ApiSectionItem[];
  categories?: ApiSectionCategory[];
};

function normalizeSectionItem(item: PublicSectionItemResponse): ApiSectionItem {
  let categoryName: string | null = null;
  if (item.category) {
    if (typeof item.category === "object") {
      categoryName = (item.category as any).name || (item.category as any).slug || null;
    } else {
      categoryName = item.category;
    }
  }

  return {
    id: item.id,
    title: item.title,
    highlight: item.highlight,
    subtitle: item.subtitle,
    question: item.question,
    answer: item.answer,
    description: item.description,
    image: item.imageUrl ?? null,
    icon: item.icon,
    category: categoryName ?? null,
    extra: item.extra,
    sortOrder: item.sortOrder,
  };
}

function normalizeSection(section: PublicSectionResponse): ApiSection {
  return {
    id: section.id,
    key: section.key,
    slug: section.slug ?? null,
    title: section.title,
    highlight: section.highlight,
    subtitle: section.subtitle,
    description: section.description,
    bgImageUrl: section.bgImageUrl ?? null,
    extra: section.extra,
    sortOrder: section.sortOrder ?? 0,
    items: Array.isArray(section.items) ? section.items.map(normalizeSectionItem) : [],
    categories: Array.isArray(section.categories)
      ? section.categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          imageUrl: c.imageUrl ?? null,
          description: c.description ?? null,
          sortOrder: c.sortOrder ?? 0,
          extra: c.extra,
        }))
      : [],
  };
}

export async function fetchSection(key: string): Promise<ApiSection | null> {
  const data = await publicGet<PublicSectionResponse>(`/public/section/key/${encodeURIComponent(key)}?limit=100`);
  return data ? normalizeSection(data) : null;
}

export async function fetchSections(key?: string): Promise<ApiSection[]> {
  if (!key) return [];
  const section = await fetchSection(key);
  return section ? [section] : [];
}

export type ApiFooterExtra = {
  tagline?: string;
  logoUrl?: string;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  contactButtonLabel?: string;
  contactButtonUrl?: string;
  copyright?: string;
  buttonText?: string;
  buttonLink?: string;
  quickLinks?: Array<{ title: string; link: string }>;
  contacts?: Array<{ type: "PHONE" | "EMAIL"; value: string; label?: string | null; sortOrder?: number }>;
  socials?: Array<{ platform: string; url: string; icon?: string | null; sortOrder?: number }>;
  copyrightText?: string;
};

export type ApiFooter = {
  id: string;
  logoUrl: string | null;
  tagline: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  hours: string | null;
  contactButtonLabel: string | null;
  contactButtonUrl: string | null;
  copyright: string | null;
  extra: ApiFooterExtra;
};

export async function fetchFooter(): Promise<ApiFooter | null> {
  const section = await fetchSection("footer");
  if (!section) return null;
  const sExtra = (section.extra ?? {}) as ApiFooterExtra;
  // Admin FooterEditor saves the footer as the first section item (address in subtitle,
  // description in description, phone/email/copyright in item.extra). Merge it over the
  // section-level extra so admin edits are reflected on the public site.
  const item = section.items?.[0];
  const iExtra = (item?.extra ?? {}) as ApiFooterExtra;
  return {
    id: section.id,
    logoUrl: sExtra.logoUrl ?? section.bgImageUrl ?? null,
    tagline: item?.description ?? sExtra.tagline ?? section.description ?? null,
    address: item?.subtitle ?? iExtra.address ?? sExtra.address ?? null,
    phone: iExtra.phone ?? sExtra.phone ?? null,
    email: iExtra.email ?? sExtra.email ?? null,
    hours: sExtra.hours ?? null,
    contactButtonLabel: sExtra.contactButtonLabel ?? sExtra.buttonText ?? null,
    contactButtonUrl: sExtra.contactButtonUrl ?? sExtra.buttonLink ?? null,
    copyright: iExtra.copyright ?? sExtra.copyright ?? sExtra.copyrightText ?? null,
    extra: sExtra,
  };
}

export type ApiSetting = {
  id: string;
  siteTitle: string;
  metaDesc: string | null;
  logoUrl: string | null;
  faviconUrl: string | null;
  slogan: string | null;
  primaryTextColor: string | null;
  backgroundColor: string | null;
  brandPrimary: string | null;
  accent1: string | null;
  accent2: string | null;
  googleAnalyticsId: string | null;
  facebookPixelId: string | null;
  maintenanceMode: boolean;
};

export async function fetchSetting(): Promise<ApiSetting | null> {
  return publicGet<ApiSetting>("/public/setting");
}
