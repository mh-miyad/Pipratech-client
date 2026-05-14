import Link from "next/link";

const CtaSection = () => {
  return (
    <section className="bg-brand-green relative overflow-hidden py-20 md:py-24">
      {/* Decorative circles */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-gold/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5 blur-3xl" />

      <div className="relative max-w-360 mx-auto px-4 sm:px-6 lg:px-10 text-center">
        {/* Label */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-10 bg-brand-gold/60" />
          <span className="text-brand-gold text-xs font-semibold tracking-[0.2em] uppercase">
            Start Your Order Today
          </span>
          <div className="h-px w-10 bg-brand-gold/60" />
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto">
          Ready to Import Premium{" "}
          <span className="text-brand-gold">Jute Products?</span>
        </h2>
        <p className="mt-5 text-white/70 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Get in touch with our export team today. We&apos;ll respond within 24 hours
          with a customised quote tailored to your requirements.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-gold hover:bg-brand-gold-light text-white font-bold rounded-md text-base transition-all duration-200 shadow-lg shadow-brand-gold/30"
          >
            Request a Free Quote
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/40 hover:border-white text-white font-semibold rounded-md text-base transition-all duration-200 hover:bg-white/10"
          >
            View Product Catalogue
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/50 text-xs">
          {[
            "✓ No minimum commitment",
            "✓ Sample orders available",
            "✓ 24h response time",
            "✓ Free shipping quotation",
          ].map((item) => (
            <span key={item} className="font-medium">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
