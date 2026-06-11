export type UserRole = "SUPER_ADMIN" | "TENANT_ADMIN" | "MANAGER" | "EDITOR" | "VIEWER";
export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
export type TenantStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING_SETUP";
export type BannerStatus = "ACTIVE" | "INACTIVE" | "SCHEDULED";
export type ContactStatus = "NEW" | "READ" | "REPLIED" | "ARCHIVED";
export type ButtonType = "PRIMARY" | "SECONDARY";

export type SafeUser = {
  id: string;
  tenantId: string;
  name: string;
  username: string | null;
  email: string;
  mobile: string | null;
  role: UserRole;
  status: UserStatus;
  avatar: string | null;
  lastLoginAt: string | null;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
};

export type LoginResponse = {
  user: SafeUser;
  tokens: TokenPair;
};

export type HeroButton = {
  id: string;
  bannerId: string;
  label: string;
  url: string;
  type: ButtonType;
  icon: string | null;
  sortOrder: number;
};

export type HeroBanner = {
  id: string;
  tenantId: string;
  title: string;
  highlightTitle: string | null;
  description: string | null;
  imageUrl: string;
  mobileImageUrl: string | null;
  tagTitle: string | null;
  tagText: string | null;
  sortOrder: number;
  status: BannerStatus;
  startsAt: string | null;
  endsAt: string | null;
  createdAt: string;
  updatedAt: string;
  heroButtons: HeroButton[];
};

export type Category = {
  id: string;
  tenantId: string;
  parentId: string | null;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
  metaTitle: string | null;
  metaDesc: string | null;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
};
