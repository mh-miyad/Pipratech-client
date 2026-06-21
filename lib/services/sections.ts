import { api, type ApiResponse } from "@/lib/api";

type BackendSectionItem = {
  id?: string;
  category?: string | null;
  categoryId?: string | null;
  type?: string | null;
  title?: string | null;
  highlight?: string | null;
  subtitle?: string | null;
  question?: string | null;
  answer?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  icon?: string | null;
  extra?: unknown;
  sortOrder?: number;
  isActive?: boolean;
};

type BackendSection = {
  id: string;
  tenantId?: string;
  key: string;
  slug?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  title?: string | null;
  highlight?: string | null;
  subtitle?: string | null;
  description?: string | null;
  bgImageUrl?: string | null;
  extra?: unknown;
  isActive?: boolean;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
  items?: BackendSectionItem[];
  categories?: any[];
};

export type SectionCategory = {
  id: string;
  sectionId: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
  description?: string | null;
  sortOrder: number;
  extra?: unknown;
  isActive: boolean;
};

export type SectionItem = {
  id?: string;
  title?: string | null;
  highlight?: string | null;
  subtitle?: string | null;
  question?: string | null;
  answer?: string | null;
  description?: string | null;
  image?: string | null;
  icon?: string | null;
  category?: string | null;
  categoryId?: string | null;
  extra?: unknown;
  sortOrder: number;
  isActive?: boolean;
  type?: string | null;
};

export type Section = {
  id: string;
  tenantId: string;
  key: string;
  slug?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  title: string | null;
  highlight: string | null;
  subtitle: string | null;
  description: string | null;
  bgImageUrl?: string | null;
  extra?: unknown;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  items: SectionItem[];
  categories?: SectionCategory[];
};

export type SectionListResponse = {
  data: Section[];
  meta?: { page: number; limit: number; total: number; totalPages: number };
};

export type CreateSectionPayload = {
  key: string;
  slug?: string;
  metaTitle?: string;
  metaDescription?: string;
  title?: string;
  highlight?: string;
  subtitle?: string;
  description?: string;
  bgImageUrl?: string;
  extra?: unknown;
  items?: Array<Omit<SectionItem, "id">>;
};

export type UpdateSectionPayload = Partial<CreateSectionPayload>;

export type CreateItemPayload = Omit<SectionItem, "id">;
export type UpdateItemPayload = Partial<CreateItemPayload>;

function slugFromKey(key: string) {
  return key.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function titleFromKey(key: string) {
  return key
    .trim()
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizeItem(item: BackendSectionItem, index = 0): SectionItem {
  return {
    id: item.id,
    title: item.title ?? null,
    highlight: item.highlight ?? null,
    subtitle: item.subtitle ?? null,
    question: item.question ?? null,
    answer: item.answer ?? null,
    description: item.description ?? null,
    image: item.imageUrl ?? null,
    icon: item.icon ?? null,
    category: item.category ?? null,
    categoryId: item.categoryId ?? null,
    extra: item.extra,
    sortOrder: item.sortOrder ?? index,
  };
}

function normalizeSection(section: BackendSection): Section {
  return {
    id: section.id,
    tenantId: section.tenantId ?? "",
    key: section.key,
    slug: section.slug ?? null,
    metaTitle: section.metaTitle ?? null,
    metaDescription: section.metaDescription ?? null,
    title: section.title ?? null,
    highlight: section.highlight ?? null,
    subtitle: section.subtitle ?? null,
    description: section.description ?? null,
    bgImageUrl: section.bgImageUrl ?? null,
    extra: section.extra,
    isActive: section.isActive ?? true,
    sortOrder: section.sortOrder ?? 0,
    createdAt: section.createdAt ?? "",
    updatedAt: section.updatedAt ?? "",
    items: Array.isArray(section.items)
      ? section.items.map((item, index) => normalizeItem(item, index))
      : [],
    categories: Array.isArray(section.categories)
      ? section.categories.map((c) => ({
          id: c.id,
          sectionId: c.sectionId,
          name: c.name,
          slug: c.slug,
          imageUrl: c.imageUrl ?? null,
          description: c.description ?? null,
          sortOrder: c.sortOrder ?? 0,
          extra: c.extra,
          isActive: c.isActive ?? true,
        }))
      : [],
  };
}

function mapItemPayload(item: CreateItemPayload | UpdateItemPayload, index = 0) {
  return {
    category: item.category?.trim() || undefined,
    categoryId: item.categoryId || undefined,
    title: item.title?.trim() || undefined,
    highlight: item.highlight?.trim() || undefined,
    subtitle: item.subtitle?.trim() || undefined,
    question: item.question?.trim() || undefined,
    answer: item.answer?.trim() || undefined,
    description: item.description?.trim() || undefined,
    imageUrl: item.image?.trim() || undefined,
    icon: item.icon?.trim() || undefined,
    extra: item.extra,
    sortOrder: Number(item.sortOrder) || index,
  };
}

function mapSectionPayload(payload: CreateSectionPayload | UpdateSectionPayload, fallbackTitle?: string) {
  const resolvedKey = payload.key?.trim() || "";
  const resolvedTitle = payload.title?.trim() || fallbackTitle || (resolvedKey ? titleFromKey(resolvedKey) : undefined);

  const mapped: Record<string, any> = {
    metaTitle: payload.metaTitle?.trim() || undefined,
    metaDescription: payload.metaDescription?.trim() || undefined,
    title: resolvedTitle,
    highlight: payload.highlight?.trim() || undefined,
    subtitle: payload.subtitle?.trim() || undefined,
    description: payload.description?.trim() || undefined,
    bgImageUrl: payload.bgImageUrl?.trim() || undefined,
    extra: payload.extra,
  };

  if (payload.key !== undefined) {
    mapped.key = payload.key.trim() || undefined;
  }

  if (payload.slug !== undefined) {
    mapped.slug = payload.slug.trim() || undefined;
  } else if (payload.key !== undefined) {
    mapped.slug = slugFromKey(payload.key) || undefined;
  }

  return mapped;
}

function success<TIn, TOut>(
  response: Extract<ApiResponse<TIn>, { success: true }>,
  data: TOut,
): ApiResponse<TOut> {
  return {
    success: true,
    data,
    message: response.message,
    meta: response.meta,
  };
}

export async function listSections(): Promise<ApiResponse<Section[] | SectionListResponse>> {
  const res = await api.get<BackendSection[] | { data: BackendSection[]; meta?: SectionListResponse["meta"] }>(
    "/cms/section?limit=100&sortBy=createdAt&sortOrder=desc",
  );
  if (!res.success) return res;

  if (Array.isArray(res.data)) {
    return success(res, res.data.map(normalizeSection));
  }

  return success(res, {
    data: (res.data.data ?? []).map(normalizeSection),
    meta: res.data.meta,
  });
}

export async function getSection(id: string): Promise<ApiResponse<Section>> {
  const res = await api.get<BackendSection>(`/cms/section/${id}`);
  if (!res.success) return res;
  return success(res, normalizeSection(res.data));
}

export async function getSectionByKey(key: string): Promise<ApiResponse<Section>> {
  const res = await api.get<BackendSection>(`/cms/section/key/${encodeURIComponent(key)}?limit=100`);
  if (!res.success) return res;
  return success(res, normalizeSection(res.data));
}

export async function getPublicSectionByKey(key: string): Promise<ApiResponse<Section>> {
  const res = await api.get<BackendSection>(`/public/section/key/${encodeURIComponent(key)}?limit=100`);
  if (!res.success) return res;
  return success(res, normalizeSection(res.data));
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function variantSuffix(key: string, base: string): number {
  if (key === base) return 0;
  const match = key.match(new RegExp(`^${escapeRegExp(base)}-(\\d+)$`));
  return match ? Number(match[1]) : -1;
}

export async function findSectionVariants(key: string): Promise<Section[]> {
  const list = await listSections();
  if (!list.success) return [];
  const sections = Array.isArray(list.data) ? list.data : list.data.data;
  const re = new RegExp(`^${escapeRegExp(key)}(-\\d+)?$`);
  return sections
    .filter((s) => re.test(s.key))
    .sort((a, b) => variantSuffix(b.key, key) - variantSuffix(a.key, key));
}

export async function resolveSectionByKey(key: string): Promise<ApiResponse<Section>> {
  const exact = await getSectionByKey(key);
  if (exact.success && exact.data?.id) return exact;

  const variants = await findSectionVariants(key);
  if (variants.length === 0) return exact;

  return getSectionByKey(variants[0].key);
}

export async function createSection(
  payload: CreateSectionPayload,
  fallbackTitle?: string,
): Promise<ApiResponse<Section>> {
  const sectionPayload = mapSectionPayload(payload, fallbackTitle);
  const res = await api.post<BackendSection>("/cms/section", sectionPayload);

  if (!res.success) {
    const isDuplicate =
      res.message?.toLowerCase().includes("duplicate") ||
      res.message?.toLowerCase().includes("already exist") ||
      res.message?.toLowerCase().includes("unique constraint");

    if (isDuplicate && sectionPayload.key) {
      const existing = await resolveSectionByKey(sectionPayload.key);
      if (existing.success && existing.data?.id) {
        const items = (payload.items ?? []).filter(Boolean);
        if (items.length > 0) {
          const createItemsRes = await api.post<{ count: number }>("/cms/section/items", {
            sectionId: existing.data.id,
            items: items.map((item, index) => mapItemPayload(item, index)),
          });
          if (!createItemsRes.success) return createItemsRes;
          return getSectionByKey(existing.data.key);
        }
        return existing;
      }
    }

    return res;
  }

  const section = normalizeSection(res.data);
  const items = (payload.items ?? []).filter(Boolean);

  if (!section.id || items.length === 0) {
    return success(res, section);
  }

  const createItemsRes = await api.post<{ count: number }>("/cms/section/items", {
    sectionId: section.id,
    items: items.map((item, index) => mapItemPayload(item, index)),
  });

  if (!createItemsRes.success) return createItemsRes;

  return getSectionByKey(section.key);
}

export async function updateSection(
  id: string,
  payload: UpdateSectionPayload,
  fallbackTitle?: string,
): Promise<ApiResponse<Section>> {
  const res = await api.patch<BackendSection>(
    `/cms/section/${id}`,
    mapSectionPayload(payload, fallbackTitle),
  );
  if (!res.success) return res;
  return success(res, normalizeSection(res.data));
}

export function deleteSection(id: string): Promise<ApiResponse<unknown>> {
  return api.delete<unknown>(`/cms/section/${id}`);
}

export async function listSectionItems(
  key: string,
  category?: string,
): Promise<ApiResponse<SectionItem[]>> {
  const res = await getSectionByKey(key);
  if (!res.success) return res;
  const items = category
    ? res.data.items.filter((item) => item.category === category)
    : res.data.items;
  return {
    success: true,
    data: items,
    message: res.message,
  };
}

export function createSectionItem(
  sectionId: string,
  payload: CreateItemPayload,
): Promise<ApiResponse<{ count: number }>> {
  return api.post<{ count: number }>("/cms/section/items", {
    sectionId,
    items: [mapItemPayload(payload)],
  });
}

export async function updateSectionItem(
  id: string,
  payload: UpdateItemPayload,
): Promise<ApiResponse<SectionItem>> {
  const res = await api.patch<BackendSectionItem>(`/cms/section/items/${id}`, mapItemPayload(payload));
  if (!res.success) return res;
  return success(res, normalizeItem(res.data));
}

export function deleteSectionItem(id: string): Promise<ApiResponse<unknown>> {
  return api.delete<unknown>(`/cms/section/items/${id}`);
}

export const KNOWN_SECTION_KEYS = [
  "faq",
  "testimonials",
  "why-choose-us",
  "export-process",
  "about-story",
  "about-stats",
  "product-showcase",
  "gallery-grid",
  "sister-concerns",
] as const;

export type CreateSectionCategoryPayload = {
  sectionId: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
};

export async function listSectionCategories(sectionId: string): Promise<ApiResponse<SectionCategory[]>> {
  const res = await api.get<SectionCategory[]>(
    `/cms/section/category?sectionId=${encodeURIComponent(sectionId)}&limit=100&sortBy=sortOrder&sortOrder=asc`
  );
  if (!res.success) return res;
  return success(res, res.data);
}

export async function createSectionCategory(payload: CreateSectionCategoryPayload): Promise<ApiResponse<SectionCategory>> {
  const res = await api.post<SectionCategory>("/cms/section/category", payload);
  if (!res.success) return res;
  return success(res, res.data);
}

export async function updateSectionCategory(
  id: string,
  payload: Partial<CreateSectionCategoryPayload>,
): Promise<ApiResponse<SectionCategory>> {
  const res = await api.patch<SectionCategory>(`/cms/section/category/${id}`, payload);
  if (!res.success) return res;
  return success(res, res.data);
}

export async function deleteSectionCategory(id: string): Promise<ApiResponse<unknown>> {
  return api.delete<unknown>(`/cms/section/category/${id}`);
}
