"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Products", href: "/products" },
  { label: "Our Sister Concerns", href: "/sister-concerns" },
  { label: "Gallery", href: "/gallery" },
];

// ─── Phone icon (matches the filled style in Figma) ──────────────────────────
const PhoneIcon = () => (
  <svg
    className="w-4.5 h-4.5 text-white"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
      clipRule="evenodd"
    />
  </svg>
);

// ─── Hamburger icon ────────────────────────────────────────────────────────────
const HamburgerIcon = ({ open }: { open: boolean }) => (
  <span className="flex flex-col justify-center gap-[5px] w-5">
    <span
      className={cn(
        "block h-[2px] bg-white rounded-full transition-all duration-300 ease-linear origin-left",
        open ? "rotate-45 w-full translate-x-px" : "w-full",
      )}
    />
    <span
      className={cn(
        "block h-[2px] bg-white rounded-full transition-all duration-300 ease-linear",
        open ? "opacity-0 -translate-x-2" : "w-3/4",
      )}
    />
    <span
      className={cn(
        "block h-[2px] bg-white rounded-full transition-all duration-300 ease-linear origin-left",
        open ? "-rotate-45 w-full translate-x-px" : "w-full",
      )}
    />
  </span>
);

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-2" : "py-5",
        )}
      >
        {/* scrolled backdrop bar */}
        <div
          className={cn(
            "absolute inset-0 transition-all duration-500",
            scrolled
              ? "bg-brand-dark/85 backdrop-blur-md shadow-lg"
              : "bg-transparent",
          )}
        />

        <div className="relative max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-6">
            {/* ── Logo ──────────────────────────────────────────────────── */}
            <Link
              href="/"
              className="shrink-0 transition-opacity duration-200 ease-linear hover:opacity-80 active:opacity-60 active:scale-95"
            >
              <Image
                src="/snl-logo.png"
                alt="SNL International — Jute Goods Exporter"
                width={130}
                height={52}
                className="object-contain w-auto h-10 md:h-12"
                priority
              />
            </Link>

            {/* ── Desktop Nav Pill ──────────────────────────────────────── */}
            <nav
              className="hidden lg:flex items-center gap-0.5 rounded-full bg-brand-neutral/72 px-2 py-1.5 backdrop-blur-md"
            >
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      // base
                      "relative px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap",
                      "transition-all duration-200 ease-linear",
                      // click feel
                      "active:scale-95 active:brightness-90",
                      // states
                      active
                        ? "bg-white text-brand-dark font-semibold shadow-sm"
                        : "text-white/85 hover:text-white hover:bg-white/15",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* ── Right: Contact + Hamburger ────────────────────────────── */}
            <div className="flex items-center gap-3">
              {/* Contact Us pill — desktop */}
              <Link
                href="/contact"
                className={cn(
                  "hidden md:flex items-center gap-2.5",
                  "pl-4 pr-1.5 py-1.5 rounded-full",
                  "text-white bg-brand-neutral text-sm font-medium whitespace-nowrap",
                  "transition-all duration-200 ease-linear",
                  "hover:brightness-110 active:scale-95 active:brightness-90 ",
                )}
              >
                Contact Us
                {/* dark circle with phone icon */}
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-dark shrink-0 transition-transform duration-200 ease-linear group-hover:rotate-12">
                  <PhoneIcon />
                </span>
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className={cn(
                  "lg:hidden flex items-center justify-center",
                  "w-10 h-10 rounded-full",
                  "bg-brand-neutral/72 backdrop-blur-md",
                  "transition-all duration-200 ease-linear active:scale-90",
                )}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <HamburgerIcon open={menuOpen} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE MENU ───────────────────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-brand-dark/60 backdrop-blur-sm",
          "transition-all duration-300 ease-linear",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        aria-hidden
      />

      {/* Drawer */}
      <div
        className={cn(
          "lg:hidden fixed top-0 right-0 bottom-0 z-40 w-72 max-w-[85vw]",
          "bg-brand-dark/95 backdrop-blur-xl",
          "flex flex-col pt-24 pb-10 px-6",
          "transition-transform duration-300 ease-linear",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Nav links */}
        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link, i) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "px-4 py-3.5 rounded-xl text-sm font-medium",
                  "border border-transparent",
                  "transition-all duration-200 ease-linear active:scale-95",
                  // staggered entrance via inline style
                  active
                    ? "bg-brand-gold/20 text-brand-gold border-brand-gold/30"
                    : "text-white/80 hover:text-white hover:bg-white/10",
                )}
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="my-6 h-px bg-white/10" />

        {/* Mobile Contact CTA */}
        <Link
          href="/contact"
          className={cn(
            "flex items-center justify-center gap-2.5",
            "px-5 py-3 rounded-full",
            "bg-brand-gold text-white text-sm font-semibold",
            "transition-all duration-200 ease-linear",
            "hover:bg-brand-gold-light active:scale-95",
          )}
        >
          <PhoneIcon />
          Contact Us
        </Link>

        {/* Bottom info */}
        <p className="mt-auto text-white/30 text-xs text-center">
          SNL International · Jute Goods Exporter
        </p>
      </div>
    </>
  );
}
