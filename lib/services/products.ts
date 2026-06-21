import { api, type ApiResponse } from "@/lib/api";
import {
  getSectionByKey,
  getPublicSectionByKey,
  type Section,
  type SectionItem,
} from "@/lib/services/sections";
import type { Product, ProductCategory, ProductSpec } from "@/types/product";

export const PRODUCTS_SECTION_KEY = "products";

const FALLBACK_PRODUCTS: Product[] = [];

type ProductExtra = {
  slug?: string;
  shortDescription?: string;
  images?: string[];
  coreAttributes?: string[];
  technicalSpecs?: ProductSpec[];
  applications?: string[];
  featured?: boolean;
};

type ImageField = {
  imageUrl?: string | null;
  icon?: string | null;
};

function asString(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return fallback;
}

function asBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  if (typeof value === "number") return value !== 0;
  return fallback;
}

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function readExtra(item: SectionItem | Record<string, unknown>): ProductExtra {
  const value = (item as { extra?: unknown }).extra;
  if (!value || typeof value !== "object") return {};
  return value as ProductExtra;
}

function readImages(item: SectionItem, fallback: string | null | undefined): string[] {
  const extra = readExtra(item);
  const fromExtra = asArray<string>(extra.images).filter(
    (img) => typeof img === "string" && img.length > 0,
  );
  if (fromExtra.length > 0) return fromExtra;
  if (fallback && fallback.length > 0) return [fallback];
  return [];
}

function readSpecs(item: SectionItem): ProductSpec[] {
  const extra = readExtra(item);
  const specs = (extra as any).technicalSpecifications || (extra as any).technicalSpecs;
  return asArray<any>(specs)
    .filter(
      (spec): spec is any =>
        Boolean(spec) && typeof spec === "object"
    )
    .map((spec) => {
      const label = spec.title || spec.label;
      const value = spec.subtitle || spec.value;
      return {
        label: asString(label),
        value: asString(value),
      };
    })
    .filter((spec) => spec.label && spec.value);
}

function readStringArray(value: unknown): string[] {
  return asArray<string>(value)
    .map((item) => asString(item).trim())
    .filter((item) => item.length > 0);
}

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeCategory(value: string | null | undefined): ProductCategory {
  return (value ?? "").trim();
}

function sectionItemToProduct(item: SectionItem, index: number): Product {
  const extra = readExtra(item);
  const title = asString(item.title).trim() || asString((item as any).name).trim() || `Product ${index + 1}`;
  const fallbackImage = (item as ImageField).imageUrl ?? null;
  const slug = asString(extra.slug).trim() || slugify(title) || `product-${index + 1}`;

  let categoryName = "";
  if (item.category) {
    if (typeof item.category === "object") {
      categoryName = (item.category as any).name || (item.category as any).slug || "";
    } else {
      categoryName = asString(item.category);
    }
  }
  if (!categoryName && item.subtitle) {
    categoryName = asString(item.subtitle);
  }

  const category = normalizeCategory(categoryName);
  const shortDescription =
    asString(extra.shortDescription).trim() || asString(item.description).trim().slice(0, 160);
  const description =
    asString(item.description).trim() || asString(extra.shortDescription).trim();

  return {
    id: asString(item.id, `product-${index + 1}`),
    slug,
    name: title,
    category,
    shortDescription,
    description,
    images: readImages(item, fallbackImage),
    coreAttributes: readStringArray(extra.coreAttributes),
    technicalSpecs: readSpecs(item),
    applications: readStringArray(extra.applications),
    featured: asBoolean(extra.featured),
  };
}

function hasContent(item: SectionItem): boolean {
  const title = asString(item.title).trim();
  const extra = readExtra(item);
  const hasImage = asArray<string>(extra.images).some((img) => typeof img === "string" && img.length > 0)
    || asString((item as any).imageUrl).trim().length > 0;
  return title.length > 0 || hasImage;
}

function sectionToProducts(section: Section | null | undefined): Product[] {
  if (!section || !Array.isArray(section.items)) return [];
  return section.items
    .filter(hasContent)
    .map((item, index) => sectionItemToProduct(item, index));
}

async function fetchProductsSection(): Promise<Section | null> {
  const fetcher = typeof window !== "undefined" ? getSectionByKey : getPublicSectionByKey;
  const res = await fetcher(PRODUCTS_SECTION_KEY);
  if (!res.success) {
    if (res.statusCode === 404) return null;
    return null;
  }
  return res.data;
}

async function getApiProducts(): Promise<Product[]> {
  try {
    const section = await fetchProductsSection();
    return sectionToProducts(section);
  } catch {
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const section = await fetchProductsSection();
    const fromApi = sectionToProducts(section);
    if (fromApi.length > 0) return fromApi;
  } catch {
    // fall through to fallback
  }
  return FALLBACK_PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const fromApi = await getApiProducts();
  const match = fromApi.find((p) => p.slug === slug);
  if (match) return match;
  return FALLBACK_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export type AdminProductPayload = {
  name: string;
  slug?: string;
  category: ProductCategory;
  shortDescription?: string;
  description?: string;
  images: string[];
  coreAttributes?: string[];
  technicalSpecs?: ProductSpec[];
  applications?: string[];
  featured?: boolean;
  sortOrder?: number;
  isActive?: boolean;
};

function productToAdmin(product: Product): AdminProductPayload {
  return {
    name: product.name,
    slug: product.slug,
    category: product.category,
    shortDescription: product.shortDescription,
    description: product.description,
    images: product.images,
    coreAttributes: product.coreAttributes,
    technicalSpecs: product.technicalSpecs,
    applications: product.applications,
    featured: product.featured,
  };
}

export async function listAdminProducts(): Promise<ApiResponse<Product[]>> {
  const products = await getApiProducts();
  return { success: true, data: products };
}

export async function createAdminProduct(
  product: AdminProductPayload,
): Promise<ApiResponse<Product>> {
  let existing = await fetchProductsSection();
  if (!existing) {
    const createRes = await api.post<Section>("/cms/section", {
      key: PRODUCTS_SECTION_KEY,
      slug: PRODUCTS_SECTION_KEY,
      title: "Products",
      isActive: true,
    });
    if (!createRes.success) return createRes as any;
    existing = createRes.data;
  }

  const slug = product.slug?.trim() || slugify(product.name);

  const extra = {
    slug,
    shortDescription: product.shortDescription?.trim() ?? "",
    images: product.images,
    coreAttributes: product.coreAttributes ?? [],
    technicalSpecifications: (product.technicalSpecs ?? []).map((s) => ({
      title: s.label,
      subtitle: s.value,
    })),
    applications: product.applications ?? [],
    featured: product.featured ?? false,
  };

  const payload = {
    title: product.name.trim(),
    subtitle: product.category,
    description: product.description?.trim() ?? "",
    image: product.images[0] || undefined,
    type: "product",
    sortOrder: existing.items?.length || 0,
    isActive: true,
    extra,
  };

  const res = await api.post<{ count: number }>("/cms/section/items", {
    sectionId: existing.id,
    items: [payload],
  });

  if (!res.success) return res as any;
  const products = await getApiProducts();
  return { success: true, data: products.find((p) => p.slug === slug)! };
}

export async function updateAdminProduct(
  id: string,
  product: AdminProductPayload,
): Promise<ApiResponse<Product>> {
  const existing = await fetchProductsSection();
  if (!existing) return { success: false, message: "Products section not found", statusCode: 404 };

  const existingItem = existing.items.find(
    (i) => i.id === id || (i.extra as any)?.slug === id || slugify(i.title || "") === id
  );
  if (!existingItem) return { success: false, message: "Product not found", statusCode: 404 };

  const slug = product.slug?.trim() || slugify(product.name);

  const extra = {
    slug,
    shortDescription: product.shortDescription?.trim() ?? "",
    images: product.images,
    coreAttributes: product.coreAttributes ?? [],
    technicalSpecifications: (product.technicalSpecs ?? []).map((s) => ({
      title: s.label,
      subtitle: s.value,
    })),
    applications: product.applications ?? [],
    featured: product.featured ?? false,
  };

  const payload = {
    title: product.name.trim(),
    subtitle: product.category,
    description: product.description?.trim() ?? "",
    image: product.images[0] || undefined,
    type: "product",
    sortOrder: existingItem.sortOrder,
    isActive: true,
    extra,
  };

  const res = await api.patch(`/cms/section/items/${existingItem.id}`, payload);
  if (!res.success) return res as any;

  const products = await getApiProducts();
  return { success: true, data: products.find((p) => p.id === existingItem.id)! };
}

export async function deleteAdminProduct(id: string): Promise<ApiResponse<unknown>> {
  const existing = await fetchProductsSection();
  if (!existing) return { success: false, message: "Products section not found", statusCode: 404 };

  const existingItem = existing.items.find(
    (i) => i.id === id || (i.extra as any)?.slug === id || slugify(i.title || "") === id
  );
  if (!existingItem) return { success: false, message: "Product not found", statusCode: 404 };

  return api.delete(`/cms/section/items/${existingItem.id}`);
}

export function defaultAdminProduct(): Product {
  return {
    id: "",
    slug: "",
    name: "",
    category: "",
    shortDescription: "",
    description: "",
    images: [],
    coreAttributes: [],
    technicalSpecs: [],
    applications: [],
    featured: false,
  };
}

export { productToAdmin };
