"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BadgeInfo,
  Building2,
  GalleryHorizontalEnd,
  Home,
  LogOut,
  Menu,
  PackageOpen,
  PanelLeftClose,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { adminPages } from "@/components/admin/admin-content-config";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const AUTH_KEY = "snl-admin-authenticated";
const iconMap = {
  homepage: Home,
  "sister-concerns": Building2,
  gallery: GalleryHorizontalEnd,
  products: PackageOpen,
  about: BadgeInfo,
};

export function isAdminAuthenticated() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(AUTH_KEY) === "true";
}

export function setAdminAuthenticated(value: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  if (value) {
    window.localStorage.setItem(AUTH_KEY, "true");
  } else {
    window.localStorage.removeItem(AUTH_KEY);
  }
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const isAuthRoute = pathname === "/admin/auth";

  const pageTitle = useMemo(() => {
    return adminPages.find((page) => pathname === page.href)?.label ?? "Admin";
  }, [pathname]);

  useEffect(() => {
    if (!isAuthRoute && !isAdminAuthenticated()) {
      router.replace("/admin/auth");
    }
  }, [isAuthRoute, router]);

  if (isAuthRoute) {
    return <>{children}</>;
  }

  const logout = () => {
    setAdminAuthenticated(false);
    router.replace("/admin/auth");
  };

  return (
    <div className="min-h-svh bg-rustic-background text-foreground">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r bg-white transition-transform duration-200 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Link href="/admin/homepage" className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-neutral">
              SNL Admin
            </p>
            <p className="truncate text-sm font-semibold text-brand-primary">
              Content Control
            </p>
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <PanelLeftClose />
          </Button>
        </div>
        <Separator />
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {adminPages.map((page) => {
            const Icon = iconMap[page.slug as keyof typeof iconMap];
            const active = pathname === page.href;

            return (
              <Link
                key={page.slug}
                href={page.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-primary text-white"
                    : "text-brand-primary hover:bg-brand-primary-light",
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="truncate">{page.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="border-t p-3">
          <Button
            type="button"
            variant="outline"
            className="h-9 w-full justify-start gap-2"
            onClick={logout}
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
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white/90 px-4 backdrop-blur md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu />
            </Button>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-brand-primary">
                {pageTitle}
              </p>
              <p className="text-xs text-muted-foreground">Dummy auth panel</p>
            </div>
          </div>
          <Link href="/" className="text-xs font-semibold text-brand-neutral hover:text-brand-primary">
            View site
          </Link>
        </header>
        <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
