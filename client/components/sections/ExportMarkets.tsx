import SectionHeading from "@/components/reusable/SectionHeading";

const MARKETS = [
  { flag: "🇺🇸", country: "United States", products: "Bags, Fabric" },
  { flag: "🇬🇧", country: "United Kingdom", products: "Totes, Crafts" },
  { flag: "🇩🇪", country: "Germany", products: "Geo Textile, Fabric" },
  { flag: "🇦🇪", country: "UAE", products: "Bags, Ropes" },
  { flag: "🇨🇦", country: "Canada", products: "Shopping Bags" },
  { flag: "🇦🇺", country: "Australia", products: "Eco Bags, Crafts" },
  { flag: "🇫🇷", country: "France", products: "Fashion Bags" },
  { flag: "🇳🇱", country: "Netherlands", products: "Geo Textile" },
  { flag: "🇯🇵", country: "Japan", products: "Crafts, Fabric" },
  { flag: "🇮🇹", country: "Italy", products: "Fashion Bags" },
  { flag: "🇪🇸", country: "Spain", products: "Bags, Ropes" },
  { flag: "🇧🇪", country: "Belgium", products: "Geo Textile" },
  { flag: "🇸🇪", country: "Sweden", products: "Eco Products" },
  { flag: "🇩🇰", country: "Denmark", products: "Bags, Yarn" },
  { flag: "🇨🇭", country: "Switzerland", products: "Premium Bags" },
];

const ExportMarkets = () => {
  return (
    <section className="bg-brand-green py-20 md:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
      </div>

      <div className="relative max-w-360 mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeading
          label="Global Reach"
          title="Where We Export"
          subtitle="SNL International proudly supplies premium jute products to importers across 15+ countries on 5 continents."
          light
        />

        {/* Country Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {MARKETS.map((market) => (
            <div
              key={market.country}
              className="group bg-white/10 hover:bg-brand-gold/20 border border-white/10 hover:border-brand-gold/40 rounded-xl p-4 text-center transition-all duration-300"
            >
              <span className="text-3xl block mb-2" aria-hidden="true">
                {market.flag}
              </span>
              <p className="text-white font-semibold text-sm leading-snug">
                {market.country}
              </p>
              <p className="text-white/50 text-xs mt-1 group-hover:text-white/70 transition-colors">
                {market.products}
              </p>
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <p className="text-white/70 text-sm">
            Don&apos;t see your country?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-white text-sm font-semibold rounded-md transition-colors"
          >
            We ship worldwide — Contact Us
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExportMarkets;
