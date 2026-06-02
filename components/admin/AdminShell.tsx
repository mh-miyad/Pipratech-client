"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BadgeInfo, Building2, GalleryHorizontalEnd, Home, LogOut, Menu,
  PackageOpen, PanelLeftClose, PanelBottom, UserCircle, ChevronDown,
} from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { useAuth } from "@/components/admin/auth-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Subpage = { label: string; href: string };

type MenuItem = {
  slug: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  subpages?: Subpage[];
};

const menuStructure: MenuItem[] = [
  {
    slug: "homepage",
    label: "Homepage",
    icon: Home,
    href: "/admin/homepage",
    subpages: [
      { label: "Hero Banners", href: "/admin/homepage/hero" },
      { label: "FAQ", href: "/admin/homepage/faq" },
      { label: "Testimonials", href: "/admin/homepage/testimonials" },
      { label: "Why Choose Us", href: "/admin/homepage/why-choose-us" },
      { label: "Export Process", href: "/admin/homepage/export-process" },
    ],
  },
  {
    slug: "sister-concerns",
    label: "Sister Concern",
    icon: Building2,
    href: "/admin/sister-concerns",
    subpages: [
      { label: "Page Hero", href: "/admin/sister-concerns/hero" },
      { label: "Concern List", href: "/admin/sister-concerns/concerns" },
    ],
  },
  {
    slug: "gallery",
    label: "Gallery",
    icon: GalleryHorizontalEnd,
    href: "/admin/gallery",
    subpages: [
      { label: "Page Hero", href: "/admin/gallery/hero" },
      { label: "Gallery Grid", href: "/admin/gallery/grid" },
    ],
  },
  {
    slug: "products",
    label: "Products",
    icon: PackageOpen,
    href: "/admin/products",
    subpages: [
      { label: "Page Hero", href: "/admin/products/hero" },
      { label: "Product Showcase", href: "/admin/products/showcase" },
    ],
  },
  {
    slug: "about",
    label: "About Us",
    icon: BadgeInfo,
    href: "/admin/about",
    subpages: [
      { label: "Page Hero", href: "/admin/about/hero" },
      { label: "Story Sections", href: "/admin/about/story" },
      { label: "Stats", href: "/admin/about/stats" },
    ],
  },
  {
    slug: "footer",
    label: "Footer",
    icon: PanelBottom,
    href: "/admin/footer",
  },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { state, logout, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const isAuthRoute = pathname.startsWith("/admin/auth");

  useEffect(() => {
    menuStructure.forEach((item) => {
      if (item.subpages && (pathname === item.href || pathname.startsWith(item.href + "/"))) {
        setExpanded((prev) => ({ ...prev, [item.slug]: true }));
      }
    });
  }, [pathname]);

  const toggleExpand = (slug: string) => {
    setExpanded((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const pageTitle = useMemo(() => {
    if (pathname === "/admin/profile") return "Account & Security";
    const mainPage = menuStructure.find((item) => item.href === pathname);
    if (mainPage) return mainPage.label;
    for (const item of menuStructure) {
      if (item.subpages) {
        const sub = item.subpages.find((sub) => sub.href === pathname);
        if (sub) return `${item.label} · ${sub.label}`;
      }
    }
    return "Admin";
  }, [pathname]);

  const user = state.status === "authenticated" ? state.user : null;

  if (isAuthRoute) return <>{children}</>;

  if (isLoading || state.status !== "authenticated") {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#f8f9fb]">
        <div className="space-y-3 text-center">
          <div className="mx-auto size-8 animate-spin rounded-full border-2 border-[#dc2626] border-t-transparent" />
          <p className="text-sm text-gray-500">Authenticating...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-[#f8f9fb] text-[#1a3a52]">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-[#e2e8f0] bg-white transition-transform duration-200 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-[#e2e8f0] px-5">
          <Link href="/admin/homepage" className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-500">PIPRA Admin</p>
            <p className="truncate text-sm font-semibold text-[#1a3a52]">Content Control</p>
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden text-[#1a3a52]"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <PanelLeftClose />
          </Button>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto p-4">
          {menuStructure.map((item) => {
            const Icon = item.icon;
            const hasSubpages = !!item.subpages;
            const isGroupActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const isMenuExpanded = !!expanded[item.slug];

            return (
              <div key={item.slug} className="space-y-1">
                {hasSubpages ? (
                  <Link
                    href={item.href}
                    onClick={() => {
                      toggleExpand(item.slug);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors text-[#1a3a52] hover:bg-[#1a3a52]/5",
                      isGroupActive && "font-semibold bg-[#1a3a52]/5",
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon className="size-4 shrink-0 text-[#1a3a52]/70" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    <ChevronDown
                      className={cn("size-4 shrink-0 text-[#1a3a52]/50 transition-transform duration-200", isMenuExpanded && "rotate-180")}
                    />
                  </Link>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors text-[#1a3a52] hover:bg-[#1a3a52]/5",
                      pathname === item.href && "bg-[#dc2626] text-white hover:bg-[#dc2626]/90",
                    )}
                  >
                    <Icon className={cn("size-4 shrink-0", pathname === item.href ? "text-white" : "text-[#1a3a52]/70")} />
                    <span className="truncate">{item.label}</span>
                  </Link>
                )}

                {hasSubpages && isMenuExpanded && (
                  <div className="relative ml-5 space-y-1 border-l border-[#dc2626]/15 py-1 pl-3">
                    {item.subpages?.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center rounded-md px-3 py-2 text-xs font-medium transition-colors text-[#1a3a52]/65 hover:text-[#1a3a52] hover:bg-[#1a3a52]/5",
                            isSubActive && "bg-[#dc2626]/8 text-[#dc2626] font-bold border-l-2 border-[#dc2626] -ml-[13px] pl-[11px]",
                          )}
                        >
                          <span className="truncate">{sub.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="space-y-3 border-t border-[#e2e8f0] bg-[#f8f9fb] p-4">
          {user && (
            <div className="px-3">
              <p className="truncate text-xs font-semibold text-[#1a3a52]">{user.name || user.email}</p>
              <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-gray-500">{user.role}</p>
            </div>
          )}
          <Link
            href="/admin/profile"
            onClick={() => setIsOpen(false)}
            className={cn(
              "flex h-9 w-full items-center justify-start gap-2 rounded-md px-3 text-sm font-medium transition-colors",
              pathname === "/admin/profile" ? "bg-[#dc2626] text-white" : "text-[#1a3a52] hover:bg-[#1a3a52]/5",
            )}
          >
            <UserCircle className="size-4" />
            Account & Security
          </Link>
          <Button
            type="button"
            variant="outline"
            className="h-9 w-full justify-start gap-2 border-[#e2e8f0] text-[#1a3a52] hover:bg-[#1a3a52]/5"
            onClick={() => logout()}
          >
            <LogOut className="size-4" />
            Logout
          </Button>
        </div>
      </aside>

      {isOpen && (
        <button
          type="button"
          aria-label="Close admin menu"
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#e2e8f0] bg-white/95 px-4 backdrop-blur md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="lg:hidden border-[#e2e8f0] text-[#1a3a52]"
              onClick={() => setIsOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu />
            </Button>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#1a3a52]">{pageTitle}</p>
              <p className="mt-0.5 text-[10px] font-medium text-gray-500">
                {user ? `${user.name || user.email} · Tenant Dashboard` : "PIPRA admin panel"}
              </p>
            </div>
          </div>
          <Link href="/" className="text-xs font-semibold text-gray-500 transition-colors hover:text-[#dc2626]">
            View site
          </Link>
        </header>
        <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
