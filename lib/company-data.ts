import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Building2,
  Cable,
  CircuitBoard,
  Factory,
  Globe2,
  ShieldCheck,
  Truck,
} from "lucide-react";

export const brand = {
  name: "PIPRA Trading",
  phone: "+880 1784 310930",
  phoneHref: "tel:01784310930",
  email: "pipratrading@gmail.com",
  emailHref: "mailto:pipratrading@gmail.com",
  address: "1, Afarababad, Kamrannirchar, Dhaka-1211",
  logo: "/logo.png",
};

export type ProductVariant = {
  name: string;
  rating: string;
  price: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  variants: ProductVariant[];
};

export const products: Product[] = [
  {
    id: "single-pole-mcb",
    name: "Single Pole MCB",
    category: "Circuit Protection",
    description: "Compact single pole miniature circuit breaker for homes, retail shops, and light commercial panels.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0956%20%281%29.PNG-UjHFT9CyRNYAuWVO9YGtxny4RJPLQJ.png",
    variants: [
      { name: "C6", rating: "6A", price: "Price varies by quantity" },
      { name: "C10", rating: "10A", price: "Price varies by quantity" },
      { name: "C20", rating: "20A", price: "Price varies by quantity" },
    ],
  },
  {
    id: "three-pole-mcb",
    name: "Three Pole MCB",
    category: "Industrial Protection",
    description: "Three phase circuit protection for machinery, distribution boards, and industrial installations.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0957%20%281%29.WEBP-miExDZF50gWwQ0JJLYEOfLVbuvGPCs.webp",
    variants: [
      { name: "C16", rating: "16A", price: "Price varies by quantity" },
      { name: "C32", rating: "32A", price: "Price varies by quantity" },
      { name: "C63", rating: "63A", price: "Price varies by quantity" },
    ],
  },
  {
    id: "advanced-mcb-series",
    name: "Advanced MCB Series",
    category: "Premium Series",
    description: "Advanced protection range for buyers needing consistent performance and certified components.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0959%20%281%29.PNG-ipCHV0ErYOdw69JVP2zZy0sEfqRijz.png",
    variants: [
      { name: "1P", rating: "6A-32A", price: "Price varies by variant" },
      { name: "2P", rating: "10A-40A", price: "Price varies by variant" },
      { name: "3P", rating: "16A-63A", price: "Price varies by variant" },
    ],
  },
  {
    id: "two-pole-mcb",
    name: "Two Pole MCB",
    category: "Circuit Protection",
    description: "Dual pole protection for residential and commercial electrical distribution systems.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0958.JPG%20%281%29-lHrNYd0CxlnG1E6bhhB36uuhfCN7ti.jpeg",
    variants: [
      { name: "C10", rating: "10A", price: "Price varies by quantity" },
      { name: "C25", rating: "25A", price: "Price varies by quantity" },
      { name: "C40", rating: "40A", price: "Price varies by quantity" },
    ],
  },
  {
    id: "compact-mcb-array",
    name: "Compact MCB Array",
    category: "Panel Accessories",
    description: "Space saving modular protection setup for projects where panel layout and reliability matter.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0960%20%281%29.PNG-VhxYTjFcz3ZxwQwISlmvtx59DaWLQy.png",
    variants: [
      { name: "4 module", rating: "Mixed", price: "Project based pricing" },
      { name: "8 module", rating: "Mixed", price: "Project based pricing" },
      { name: "12 module", rating: "Mixed", price: "Project based pricing" },
    ],
  },
  {
    id: "standard-circuit-breaker",
    name: "Standard Circuit Breaker",
    category: "Standard Series",
    description: "Reliable everyday protection for maintenance, replacement, and new installation work.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0961.JPG%20%281%29-5uhjLqdPPuoaqyNJjjNmqWcgiCZJWm.jpeg",
    variants: [
      { name: "Standard", rating: "10A-32A", price: "Price varies by model" },
      { name: "Heavy", rating: "40A-63A", price: "Price varies by model" },
    ],
  },
];

export const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=2200&q=80",
    eyebrow: "Premium Electrical Supplier",
    title: "Reliable electrical products for serious projects",
    description: "PIPRA Trading supplies certified MCBs, breakers, and panel protection products for residential, commercial, and industrial buyers.",
  },
  {
    image: "https://images.unsplash.com/photo-1621905252472-943afaa20e20?auto=format&fit=crop&w=2200&q=80",
    eyebrow: "Product Variants Available",
    title: "One product, multiple ratings and price ranges",
    description: "Upload and manage product variants by rating, model, and project price. No cart flow, only clean product presentation and inquiry.",
  },
  {
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2200&q=80",
    eyebrow: "Bangladesh Market Ready",
    title: "Importer and supplier with responsive support",
    description: "From sample discussion to bulk supply, the focus stays on quality, availability, and clear communication.",
  },
];

export const trustItems: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: BadgeCheck, title: "Licensed Supply", text: "Professional sourcing and verified company presence." },
  { icon: ShieldCheck, title: "Safety Focus", text: "Products selected for electrical protection and dependable use." },
  { icon: Truck, title: "Fast Coordination", text: "Clear support for product inquiry, quantity, and delivery planning." },
  { icon: Cable, title: "Variant Ready", text: "Ratings and prices presented by variant, not as a shopping cart." },
];

export const sisterConcerns = [
  {
    name: "PIPRA Trading",
    role: "Electrical equipment supplier",
    text: "Core company focused on MCB, circuit breaker, and electrical protection supply.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0956%20%281%29.PNG-UjHFT9CyRNYAuWVO9YGtxny4RJPLQJ.png",
  },
  {
    name: "PIPRA Projects",
    role: "Project sourcing support",
    text: "Supports commercial buyers with sourcing, variant planning, and order coordination.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0957%20%281%29.WEBP-miExDZF50gWwQ0JJLYEOfLVbuvGPCs.webp",
  },
  {
    name: "PIPRA Distribution",
    role: "Local supply network",
    text: "Handles product availability, delivery coordination, and partner communication.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0960%20%281%29.PNG-VhxYTjFcz3ZxwQwISlmvtx59DaWLQy.png",
  },
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1621905252472-943afaa20e20?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1581092919535-7146ff1a590b?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1200&q=80",
];

export const stats = [
  { value: "2021", label: "Started" },
  { value: "1000+", label: "Customers" },
  { value: "24/7", label: "Support" },
  { value: "6+", label: "Product Lines" },
];

export const companyHighlights = [
  { icon: Building2, label: "Company introduction website" },
  { icon: Factory, label: "Industrial and commercial focus" },
  { icon: Globe2, label: "Importer and supplier network" },
  { icon: CircuitBoard, label: "Electrical protection products" },
];
