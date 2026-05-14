"use client";

import { brand } from "@/lib/company-data";
import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Product", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Our Sister Concern", href: "/sister-concerns" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-[#1a3a52] text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-[1.25fr_0.8fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-16 w-28 overflow-hidden rounded-full bg-white/95 px-3">
                <Image src={brand.logo} alt={brand.name} fill className="object-contain p-2" />
              </span>
              <div>
                <p className="text-lg font-medium">{brand.name}</p>
                <p className="text-xs font-normal text-white/55">Premium Electrical Solutions</p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm font-normal leading-7 text-white/65">
              Importer and supplier of MCB, circuit breaker, and electrical protection products for Bangladesh market buyers.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-[#dc2626]">Navigation</p>
            <div className="mt-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-normal text-white/65 transition-colors hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-[#dc2626]">Contact</p>
            <div className="mt-5 space-y-4">
              <a href={brand.phoneHref} className="flex items-center gap-3 text-sm text-white/70 hover:text-white">
                <Phone className="size-4 text-[#dc2626]" />
                {brand.phone}
              </a>
              <a href={brand.emailHref} className="flex items-center gap-3 break-all text-sm text-white/70 hover:text-white">
                <Mail className="size-4 shrink-0 text-[#dc2626]" />
                {brand.email}
              </a>
              <p className="flex items-start gap-3 text-sm leading-6 text-white/70">
                <MapPin className="mt-1 size-4 shrink-0 text-[#dc2626]" />
                {brand.address}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-[#dc2626]">Social</p>
            <div className="mt-5 flex gap-3">
              {[
                { label: "Facebook", icon: Facebook, href: "https://facebook.com" },
                { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
                { label: "Email", icon: Mail, href: brand.emailHref },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={item.label}
                  className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#dc2626]"
                >
                  <item.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs font-normal text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <p>Company profile, product catalogue, and inquiry website.</p>
        </div>
      </div>
    </footer>
  );
}
