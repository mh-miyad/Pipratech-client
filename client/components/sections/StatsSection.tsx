import { cn } from "@/lib/utils";

const STATS = [
  { value: "15+", label: "Countries Reached", desc: "Active export destinations" },
  { value: "500+", label: "Product Varieties", desc: "Jute items in our catalogue" },
  { value: "20+", label: "Years Experience", desc: "Trusted since 2003" },
  { value: "1000+", label: "Happy Clients", desc: "Importers worldwide" },
];

const StatsSection = () => {
  return (
    <section className="bg-brand-green relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(45deg,#fff,#fff_1px,transparent_1px,transparent_10px)]" />

      <div className="relative max-w-360 mx-auto px-4 sm:px-6 lg:px-10 py-16 md:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                "bg-brand-green flex flex-col items-center text-center py-10 px-6",
                i !== 0 && "lg:border-l lg:border-white/10",
              )}
            >
              <span className="text-4xl md:text-5xl xl:text-6xl font-bold text-brand-gold leading-none">
                {stat.value}
              </span>
              <span className="mt-3 text-sm md:text-base font-semibold text-white">
                {stat.label}
              </span>
              <span className="mt-1 text-xs text-white/50">{stat.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
