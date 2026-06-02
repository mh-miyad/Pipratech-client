import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ContactForm } from "@/components/contact-form";
import { brand } from "@/lib/company-data";
import { Clock, Mail, MapPin, MessageSquareText, Phone } from "lucide-react";

export const metadata = {
  title: "Contact Us - PIPRA Trading",
  description: "Contact PIPRA Trading for electrical product inquiries, variants, and supply support.",
};

const contactCards = [
  {
    icon: Phone,
    title: "Phone",
    value: brand.phone,
    note: "Direct product inquiry",
    href: brand.phoneHref,
  },
  {
    icon: Mail,
    title: "Email",
    value: brand.email,
    note: "Response within business day",
    href: brand.emailHref,
  },
  {
    icon: MapPin,
    title: "Address",
    value: brand.address,
    note: "Dhaka, Bangladesh",
    href: "https://www.google.com/maps?q=Kamrannirchar%2C%20Dhaka-1211",
  },
];

export default function Contact() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="relative overflow-hidden bg-[#1a3a52] px-5 pb-20 pt-36 text-white sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-linear-to-br from-[#1a3a52] via-[#1a3a52] to-[#dc2626]/40" />
        <div className="relative mx-auto max-w-[1440px]">
          <p className="text-sm font-normal text-[#dc2626]">Contact us</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-normal leading-tight md:text-6xl">
            Talk to us about product variants and supply needs
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
            Send product name, rating, quantity, or project details. We will help with availability, variant selection, and price guidance.
          </p>
        </div>
      </section>

      <section className="bg-[#f8f9fb] px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-5 md:grid-cols-3">
            {contactCards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group rounded-[8px] border border-[#e2e8f0] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-[#dc2626] text-white">
                  <card.icon className="size-5" />
                </span>
                <h2 className="mt-5 text-xl font-normal text-[#1a3a52]">{card.title}</h2>
                <p className="mt-2 break-words text-sm leading-6 text-gray-600">{card.value}</p>
                <p className="mt-3 text-xs font-normal text-[#dc2626]">{card.note}</p>
              </a>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <section className="rounded-[8px] border border-[#e2e8f0] bg-white p-6 md:p-8 dark:border-white/10 dark:bg-white/5">
              <p className="text-sm font-normal text-[#dc2626]">Send message</p>
              <h2 className="mt-2 text-3xl font-normal text-[#1a3a52] dark:text-white">Product inquiry form</h2>
              <ContactForm />
            </section>

            <aside className="space-y-5">
              <div className="rounded-[8px] bg-[#1a3a52] p-6 text-white md:p-8">
                <p className="text-sm font-normal text-[#dc2626]">Quick support</p>
                <h2 className="mt-2 text-3xl font-normal">Why contact us?</h2>
                <div className="mt-6 grid gap-3">
                  {[
                    "Product variant and rating inquiry",
                    "Bulk quantity and wholesale pricing",
                    "Electrical project supply support",
                    "Delivery and availability discussion",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-[8px] bg-white/8 p-4 text-sm text-white/78">
                      <MessageSquareText className="size-4 text-[#dc2626]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[8px] border border-[#e2e8f0] bg-white p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-full bg-[#dc2626] text-white">
                    <Clock className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-lg font-normal text-[#1a3a52]">Business Hours</h3>
                    <p className="text-sm text-gray-600">Saturday - Thursday, 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-10 overflow-hidden rounded-[8px] border border-[#e2e8f0] bg-white">
            <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
              <div className="p-6 md:p-8">
                <p className="text-sm font-normal text-[#dc2626]">Location</p>
                <h2 className="mt-2 text-3xl font-normal text-[#1a3a52]">Find PIPRA Trading</h2>
                <p className="mt-4 text-sm leading-7 text-gray-600">{brand.address}</p>
              </div>
              <iframe
                title="PIPRA Trading Google map"
                src="https://www.google.com/maps?q=Kamrannirchar%2C%20Dhaka-1211&output=embed"
                className="h-[360px] w-full lg:h-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
