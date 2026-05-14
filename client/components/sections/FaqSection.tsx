import {
  DynamicAccordionSection,
  type DynamicAccordionItem,
} from "@/components/reusable/DynamicAccordionSection";

const FAQ_ITEMS: DynamicAccordionItem[] = [
  {
    title: "What is your MOQ?",
    content:
      "MOQ varies by product. For yarn and hessian, typically 5 metric tons. For sacks and bags, 10,000-20,000 units. For custom-branded retail bags, MOQ starts at 5,000 pieces. Contact us with your needs - we accommodate trial orders for serious buyers.",
  },
  {
    title: "Do you provide samples?",
    content:
      "Yes, we provide product samples before bulk production. Standard samples can be arranged quickly, while custom size, print, or branding samples require additional preparation time.",
  },
  {
    title: "What are your payment methods?",
    content:
      "We usually work with bank transfer and LC for export orders. Payment structure depends on order size, buyer history, and production requirements.",
  },
  {
    title: "How long is delivery time?",
    content:
      "Delivery time depends on quantity, customization, and destination. Most standard orders move from production to shipment within a planned export schedule after sample approval.",
  },
];

const FaqSection = () => {
  return (
    <DynamicAccordionSection
      id="faq"
      title="Frequently Asked"
      highlightedTitle="Questions"
      subtitle="Can't find what you're looking for? Our export team is one message away."
      items={FAQ_ITEMS}
    />
  );
};

export default FaqSection;
