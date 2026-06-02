import { api, type ApiResponse } from "@/lib/api";

export type FooterLink = {
  title: string;
  url: string;
};

export type FooterData = {
  id?: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  socialLinks?: FooterLink[];
  quickLinks?: FooterLink[];
  copyright?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

export function fetchFooter(): Promise<ApiResponse<FooterData[]>> {
  return api.get<FooterData[]>("/cms/footer");
}

export function createFooter(data: FooterData): Promise<ApiResponse<FooterData>> {
  return api.post<FooterData>("/cms/footer", data);
}

export function updateFooter(id: string, data: Partial<FooterData>): Promise<ApiResponse<FooterData>> {
  return api.patch<FooterData>(`/cms/footer/${id}`, data);
}

export function deleteFooter(id: string): Promise<ApiResponse<void>> {
  return api.delete(`/cms/footer/${id}`);
}
