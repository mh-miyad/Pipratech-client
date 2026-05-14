"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type AccordionProps = React.ComponentProps<"div"> & {
  defaultValue?: string;
};

const AccordionContext = React.createContext<{
  openValue?: string;
  setOpenValue: (value: string) => void;
} | null>(null);

function Accordion({ defaultValue, className, ...props }: AccordionProps) {
  const [openValue, setOpenValue] = React.useState(defaultValue);

  return (
    <AccordionContext.Provider
      value={{
        openValue,
        setOpenValue: (value) =>
          setOpenValue((current) => (current === value ? undefined : value)),
      }}
    >
      <div data-slot="accordion" className={cn("space-y-3", className)} {...props} />
    </AccordionContext.Provider>
  );
}

function AccordionItem({
  value,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { value: string }) {
  return (
    <div
      data-slot="accordion-item"
      data-value={value}
      className={cn("rounded-lg border bg-card", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function AccordionTrigger({
  value,
  className,
  children,
  ...props
}: React.ComponentProps<"button"> & { value: string }) {
  const context = React.useContext(AccordionContext);
  const isOpen = context?.openValue === value;

  return (
    <button
      data-slot="accordion-trigger"
      type="button"
      onClick={() => context?.setOpenValue(value)}
      className={cn(
        "flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold transition-colors hover:bg-muted/60",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn("size-4 shrink-0 transition-transform", isOpen && "rotate-180")}
      />
    </button>
  );
}

function AccordionContent({
  value,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { value: string }) {
  const context = React.useContext(AccordionContext);
  const isOpen = context?.openValue === value;

  if (!isOpen) {
    return null;
  }

  return (
    <div
      data-slot="accordion-content"
      className={cn("border-t px-5 py-5", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
