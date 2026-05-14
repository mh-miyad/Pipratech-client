import Image from "next/image";
import Link from "next/link";

interface PageHeroProps {
  /** Full title string, e.g. "Three Generations Growing the World's Golden Fiber" */
  title: string;
  /** Exact substring to colour gold — must match part of title */
  highlight?: string;
  /** Breadcrumb label shown above the title */
  breadcrumb?: string;
  /** Optional override background image URL */
  image?: string;
}

const DEFAULT_IMAGE =
  "https://snlbd.com/static/media/banner-3.7bb85c0e9dd9b7271b36.JPG";

/**
 * Inner-page hero banner shared across About, Products, Gallery, etc.
 * — Bold title with optional gold highlight word(s)
 * — Left gold vertical bar that stretches exactly to the title height
 * — Dark gradient overlay matching the Figma design
 */
const PageHero = ({
  title,
  highlight,
  breadcrumb,
  image = DEFAULT_IMAGE,
}: PageHeroProps) => {
  // Split title around the highlight so we can colour it gold
  const parts = highlight
    ? title.split(new RegExp(`(${highlight})`, "i"))
    : [title];

  return (
    <section className="relative flex h-150 items-center overflow-hidden">
      {/* ── Background image ──────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark left-heavy gradient, matching Figma */}
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/30" />
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto w-full max-w-360 px-5 pt-20 sm:px-8 md:pt-24 lg:px-12">
        {/* Breadcrumb */}
        {breadcrumb && (
          <nav className="flex items-center gap-2 mb-6 text-xs text-white/40">
            <Link
              href="/"
              className="hover:text-white/70 transition-colors duration-150 ease-linear"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-white/60">{breadcrumb}</span>
          </nav>
        )}

        {/*
          Left gold bar + title in a flex row.
          `items-stretch` (flex default) makes the bar div grow to the
          exact height of the h1 automatically — no fixed height needed.
        */}
        <div className="flex items-stretch gap-5">
          {/* Gold vertical bar — stretches to match h1 height */}
          <div className="w-0.75 bg-brand-gold rounded-full shrink-0" />

          {/* Title */}
          <h1 className="max-w-4xl text-[2.4rem] font-normal leading-[1.15] tracking-tight text-white sm:text-5xl md:text-[3.25rem] lg:text-[3.5rem]">
            {parts.map((part, i) =>
              highlight &&
              part.toLowerCase() === highlight.toLowerCase() ? (
                <span key={i} className="text-brand-gold">
                  {part}
                </span>
              ) : (
                <span key={i}>{part}</span>
              ),
            )}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
