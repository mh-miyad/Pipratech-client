import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export type ProductItem = {
  id: string;
  name: string;
  category: "Jute Products" | "Diversified Jute Products";
  description: string;
  image: string;
};

type ProductCardProps = {
  product: ProductItem;
  variant?: "compact" | "featured" | "horizontal";
  activeCta?: boolean;
  className?: string;
};

function PhoneIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function ProductDescription({ text, limit }: { text: string; limit: number }) {
  const shortText = text.length > limit ? text.slice(0, limit).trim() : text;

  return (
    <>
      {shortText}
      {text.length > limit && (
        <>
          ...{" "}
          <Link href="/products" className="font-semibold text-brand-primary">
            See More
          </Link>
        </>
      )}
    </>
  );
}

export default function ProductCard({
  product,
  variant = "compact",
  activeCta = false,
  className,
}: ProductCardProps) {
  const isHorizontal = variant === "horizontal";
  const isFeatured = variant === "featured";
  const imageClass = isHorizontal
    ? "min-h-80 lg:min-h-[500px] lg:w-[500px] lg:shrink-0"
    : isFeatured
      ? "min-h-64 flex-1"
      : "h-[395px]";
  const descriptionLimit = isHorizontal ? 520 : isFeatured ? 130 : 125;

  return (
    <article
      className={cn(
        "pc-card group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-400 hover:border-btn-cream/50 hover:shadow-xl",
        isHorizontal ? "flex flex-col lg:flex-row" : "flex h-full flex-col",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden", imageClass)}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={
            isHorizontal
              ? "(min-width: 1024px) 500px, 100vw"
              : "(min-width: 1024px) 440px, 100vw"
          }
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col",
          isHorizontal ? "justify-center p-7 sm:p-10 lg:p-14" : "p-4",
        )}
      >
        <p
          className={cn(
            "font-normal text-btn-cream",
            isHorizontal ? "text-lg" : "text-sm",
          )}
        >
          {product.category}
        </p>
        <h3
          className={cn(
            "mt-3 font-semibold leading-tight text-brand-dark",
            isHorizontal ? "text-3xl" : "text-2xl",
          )}
        >
          {product.name}
        </h3>
        <p
          className={cn(
            "mt-5 flex-1 font-normal leading-relaxed text-brand-primary",
            isHorizontal ? "max-w-[710px] text-lg leading-7" : "text-sm",
          )}
        >
          <ProductDescription
            text={product.description}
            limit={descriptionLimit}
          />
        </p>
        <Link
          href="/contact"
          className={cn(
            "mt-5 inline-flex items-center justify-between gap-2 rounded-full px-6 py-2.5 text-xs font-normal transition-all duration-200 ease-linear",
            isHorizontal ? "w-full max-w-96 py-3 text-sm" : "w-full",
            activeCta
              ? "bg-btn-cream text-white hover:opacity-90"
              : "bg-btn-cream/10 text-black hover:bg-btn-cream hover:text-white hover:opacity-90",
          )}
        >
          Contact Us&nbsp; to learn more
          <PhoneIcon />
        </Link>
      </div>
    </article>
  );
}
