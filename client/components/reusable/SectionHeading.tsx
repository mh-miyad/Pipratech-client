import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean;
  className?: string;
}

const SectionHeading = ({
  label,
  title,
  subtitle,
  align = "center",
  light = false,
  className,
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        align === "right" && "ml-auto text-right",
        className,
      )}
    >
      {label && (
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-brand-gold mb-3">
          {label}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight",
          light ? "text-white" : "text-brand-green",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg leading-relaxed",
            light ? "text-white/70" : "text-gray-500",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
