import { api, type ApiResponse } from "@/lib/api";

export type HeroBanner = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
  status?: string;
  sortOrder?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type CreateHeroPayload = Omit<HeroBanner, "id" | "createdAt" | "updatedAt">;
export type UpdateHeroPayload = Partial<CreateHeroPayload>;

export function fetchHeroBanners(): Promise<ApiResponse<HeroBanner[]>> {
  return api.get<HeroBanner[]>("/cms/hero");
}

export function createHeroBanner(data: CreateHeroPayload): Promise<ApiResponse<HeroBanner>> {
  return api.post<HeroBanner>("/cms/hero", data);
}

export function updateHeroBanner(id: string, data: UpdateHeroPayload): Promise<ApiResponse<HeroBanner>> {
  return api.patch<HeroBanner>(`/cms/hero/${id}`, data);
}

export function deleteHeroBanner(id: string): Promise<ApiResponse<void>> {
  return api.delete(`/cms/hero/${id}`);
}
