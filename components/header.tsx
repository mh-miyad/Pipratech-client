"use client";

import { brand } from "@/lib/company-data";
import { cn } from "@/lib/utils";
import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Product", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Our Sister Concern", href: "/sister-concerns" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2" : "py-4 md:py-5",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500",
            scrolled
              ? "bg-[#1a3a52]/92 shadow-lg backdrop-blur-md"
              : "bg-transparent",
          )}
        />
        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="flex min-w-0 items-center gap-3 rounded-full transition-opacity hover:opacity-90"
              aria-label="PIPRA Trading home"
            >
              <span className="relative flex h-14 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/95 px-3 shadow-sm">
                <Image src={brand.logo} alt={brand.name} fill className="object-contain p-2" priority />
              </span>
              <span className="hidden min-w-0 text-white sm:block">
                <span className="block text-base font-medium leading-none">{brand.name}</span>
                <span className="mt-1 block text-[11px] font-normal text-white/65">Electrical Equipment Supplier</span>
              </span>
            </Link>

            <nav className="hidden items-center rounded-full bg-white/12 p-1.5 backdrop-blur-md lg:flex">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-normal text-white/82 transition-all duration-200",
                      active ? "bg-white text-[#1a3a52] shadow-sm" : "hover:bg-white/12 hover:text-white",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="hidden items-center gap-2 rounded-full bg-[#dc2626] py-1.5 pl-5 pr-1.5 text-sm font-normal text-white transition-all duration-200 hover:bg-[#b91c1c] active:scale-95 md:flex"
              >
                Contact Us
                <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
                  <Phone className="size-4" />
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="flex size-11 items-center justify-center rounded-full bg-[#dc2626] text-white transition-all active:scale-95 lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <button
        type="button"
        aria-label="Close mobile menu"
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-[#1a3a52]/70 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        className={cn(
          "fixed bottom-0 right-0 top-0 z-50 flex w-80 max-w-[86vw] flex-col bg-[#1a3a52] px-6 pb-8 pt-24 text-white shadow-2xl transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-normal transition-colors",
                  active ? "bg-white text-[#1a3a52]" : "text-white/75 hover:bg-white/10 hover:text-white",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/contact"
          className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#dc2626] px-5 py-3 text-sm font-normal text-white"
        >
          <Phone className="size-4" />
          Contact Us
        </Link>
        <p className="mt-auto text-center text-xs text-white/45">{brand.name}</p>
      </aside>
    </>
  );
}
