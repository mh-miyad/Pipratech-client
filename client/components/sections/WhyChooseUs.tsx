import {
  DynamicAccordionSection,
  type DynamicAccordionItem,
} from "@/components/reusable/DynamicAccordionSection";

const WHY_CHOOSE_ITEMS: DynamicAccordionItem[] = [
  {
    title: "Export Quality Products",
    content:
      "Three decades of export experience, owned manufacturing, and a commitment to ethical, sustainable practices. All our products undergo rigorous quality inspection before export, meeting ISO and OEKO-TEX international standards.",
  },
  {
    title: "Competitive Wholesale Pricing",
    content:
      "Direct manufacturer pricing with no middlemen. We offer transparent, competitive rates with volume discounts for long-term supply agreements and bulk orders across all product categories.",
  },
  {
    title: "Custom Manufacturing Available",
    content:
      "Full OEM and ODM capabilities. Customise sizes, colours, prints, weaves, and packaging to match your exact brand requirements and target market specifications.",
  },
  {
    title: "Fast & Reliable Shipping",
    content:
      "Timely sea and air freight options with complete documentation support - LC, B/L, certificate of origin, phytosanitary certificates, and customs clearance assistance.",
  },
  {
    title: "24/7 Customer Support",
    content:
      "A dedicated account manager guides you from enquiry to delivery. Multilingual support available for clients across Europe, the Middle East, North America, and Asia.",
  },
];

export default function WhyChooseUs() {
  return (
    <DynamicAccordionSection
      id="why-us"
      title="Why Choose"
      highlightedTitle="Us"
      subtitle="Three decades of export experience, owned manufacturing, and a commitment to ethical, sustainable practices."
      items={WHY_CHOOSE_ITEMS}
    />
  );
}
