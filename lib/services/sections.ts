import { api, type ApiResponse } from "@/lib/api";

export type SectionItem = {
  id?: string;
  title: string;
  description?: string;
  image?: string;
  link?: string;
  sortOrder?: number;
  [key: string]: unknown;
};

export type Section = {
  id: string;
  key: string;
  title?: string;
  description?: string;
  items?: SectionItem[];
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

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

export function fetchSections(): Promise<ApiResponse<Section[]>> {
  return api.get<Section[]>("/cms/sections");
}

export function fetchSectionByKey(key: string): Promise<ApiResponse<Section>> {
  return api.get<Section>(`/cms/sections/${key}`);
}

export function createSection(data: { key: string; title?: string; description?: string }): Promise<ApiResponse<Section>> {
  return api.post<Section>("/cms/sections", data);
}

export function updateSection(key: string, data: { title?: string; description?: string }): Promise<ApiResponse<Section>> {
  return api.patch<Section>(`/cms/sections/${key}`, data);
}

export function fetchSectionItems(key: string): Promise<ApiResponse<SectionItem[]>> {
  return api.get<SectionItem[]>(`/cms/sections/${key}/items`);
}

export function createSectionItem(key: string, data: SectionItem): Promise<ApiResponse<SectionItem>> {
  return api.post<SectionItem>(`/cms/sections/${key}/items`, data);
}

export function updateSectionItem(key: string, itemId: string, data: Partial<SectionItem>): Promise<ApiResponse<SectionItem>> {
  return api.patch<SectionItem>(`/cms/sections/${key}/items/${itemId}`, data);
}

export function deleteSectionItem(key: string, itemId: string): Promise<ApiResponse<void>> {
  return api.delete(`/cms/sections/${key}/items/${itemId}`);
}
