const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://industry-portfolio.techelementbd.com";
const API_PREFIX = "/api/v1";
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || "7e96ad0e-30eb-4eac-9d27-06e0cf57b80d";

function getUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (typeof window !== "undefined") {
    return `${API_PREFIX}${p}`;
  }
  const base = BASE_URL.replace(/\/$/, "");
  return `${base}${API_PREFIX}${p}`;
}

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "tenant-id": TENANT_ID,
    "x-tenant-id": TENANT_ID,
  };

  const accessToken =
    typeof window !== "undefined" ? window.localStorage.getItem("pipra_access_token") : null;
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return headers;
}

export type ApiResponse<T = unknown> =
  | { success: true; data: T; message?: string; meta?: Record<string, unknown> }
  | { success: false; message: string; statusCode?: number; errors?: unknown };

async function parseResponse<T>(res: Response): Promise<ApiResponse<T>> {
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    return {
      success: false,
      message: json.message || res.statusText || "Request failed",
      statusCode: res.status,
      errors: json.errors,
    };
  }
  return json as ApiResponse<T>;
}

export async function refreshAccessToken(): Promise<string | null> {
  const refreshToken =
    typeof window !== "undefined" ? window.localStorage.getItem("pipra_refresh_token") : null;
  if (!refreshToken) return null;

  try {
    const res = await fetch(getUrl("/auth/refresh"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "tenant-id": TENANT_ID,
        "x-tenant-id": TENANT_ID,
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await res.json();
    if (data.success && data.data?.accessToken) {
      window.localStorage.setItem("pipra_access_token", data.data.accessToken);
      if (data.data.refreshToken) {
        window.localStorage.setItem("pipra_refresh_token", data.data.refreshToken);
      }
      return data.data.accessToken;
    }
  } catch {
    /* silent */
  }
  return null;
}

async function request<T>(method: string, path: string, body?: unknown, retry = true): Promise<ApiResponse<T>> {
  try {
    const fetchOpts: RequestInit = { method, headers: getHeaders() };
    if (body !== undefined) fetchOpts.body = JSON.stringify(body);

    const res = await fetch(getUrl(path), fetchOpts);

    if (res.status === 401 && retry) {
      const newToken = await refreshAccessToken();
      if (newToken) return request<T>(method, path, body, false);
    }

    return parseResponse<T>(res);
  } catch {
    return { success: false, message: "Network error. Please check your connection.", statusCode: 0 };
  }
}

export const api = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
  patch: <T>(path: string, body?: unknown) => request<T>("PATCH", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
};

export type MediaUploadResponse = { url: string; publicId: string };

export async function uploadMedia(file: File): Promise<ApiResponse<MediaUploadResponse>> {
  const formData = new FormData();
  formData.append("image", file);

  const headers: Record<string, string> = {
    "tenant-id": TENANT_ID,
    "x-tenant-id": TENANT_ID,
  };

  const accessToken =
    typeof window !== "undefined" ? window.localStorage.getItem("pipra_access_token") : null;
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  const mapResult = async (r: Response): Promise<ApiResponse<MediaUploadResponse>> => {
    const json = await r.json().catch(() => ({}));
    if (!r.ok) {
      return {
        success: false,
        message: json.message || r.statusText || "Request failed",
        statusCode: r.status,
        errors: json.errors,
      };
    }
    const backendData = json.data as { secure_url?: string; public_id?: string; url?: string; publicId?: string } | null;
    return {
      success: true,
      message: json.message,
      data: {
        url: backendData?.secure_url || backendData?.url || "",
        publicId: backendData?.public_id || backendData?.publicId || "",
      },
    };
  };

  try {
    let res = await fetch(getUrl("/media/upload"), { method: "POST", headers, body: formData });

    if (res.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        headers["Authorization"] = `Bearer ${newToken}`;
        res = await fetch(getUrl("/media/upload"), { method: "POST", headers, body: formData });
      }
    }

    return mapResult(res);
  } catch {
    return { success: false, message: "Network error.", statusCode: 0 };
  }
}

export type SafeUser = {
  id: string;
  tenantId: string;
  name: string;
  username: string | null;
  email: string;
  mobile: string | null;
  role: string;
  status: string;
  avatar: string | null;
  lastLoginAt: string | null;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TokenPair = { accessToken: string; refreshToken: string; expiresIn: string };
export type LoginPayload = { email: string; password: string };
export type LoginResponse = { user: SafeUser; tokens: TokenPair };
