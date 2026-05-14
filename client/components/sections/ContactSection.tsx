import Image from "next/image";

const PHONES = ["(+8802) 47110171", "(+8802) 47110171", "(+8802) 47110171"];
const EMAILS = ["snljute@gmail.com", "jutex@gmail.com"];

const FIELDS = [
  { label: "First Name*", placeholder: "Enter Full Name", half: true },
  { label: "Last Name*", placeholder: "Enter Full Name", half: true },
  { label: "Email*", placeholder: "Enter Email" },
  { label: "Email*", placeholder: "Enter Email" },
  { label: "Subject", placeholder: "Your Subject" },
];

function ContactIcon({ type }: { type: "phone" | "mail" | "map" | "clock" }) {
  const paths = {
    phone:
      "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
    mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
    map: "M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z M12 13a3 3 0 100-6 3 3 0 000 6z",
    clock: "M12 8v5l3 3 M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  };

  return (
    <svg
      className="mt-0.5 h-3.5 w-3.5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[type]} />
    </svg>
  );
}

function TextInput({
  label,
  placeholder,
  half,
}: {
  label: string;
  placeholder: string;
  half?: boolean;
}) {
  return (
    <label className={half ? "block" : "block sm:col-span-2"}>
      <span className="block text-sm font-semibold text-black">{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        className="mt-6 w-full border-0 border-b border-[#B8B8B8] bg-transparent pb-3 text-sm text-brand-primary outline-none placeholder:text-[11px] placeholder:text-brand-primary/70 focus:border-btn-cream"
      />
    </label>
  );
}

export default function ContactSection() {
  return (
    <section className="bg-white">
      <div className="grid w-full grid-cols-1 lg:grid-cols-[0.9fr_1.15fr]">
        <aside className="relative min-h-[680px] overflow-hidden px-8 py-20 text-white sm:px-16 lg:px-32 lg:py-28">
          <Image
            src="/hero-img.png"
            alt="Contact SNL International"
            fill
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/72" />
          <div className="relative z-10 mx-auto max-w-sm">
            <h2 className="text-3xl font-normal leading-tight">
              Contact Information
            </h2>

            <div className="mt-16 space-y-20 text-sm font-normal leading-relaxed text-white">
              <div className="space-y-4">
                {PHONES.map((phone, index) => (
                  <a
                    key={`${phone}-${index}`}
                    href={`tel:${phone.replace(/\D/g, "")}`}
                    className="flex items-center gap-3 transition-colors duration-200 hover:text-btn-cream"
                  >
                    <ContactIcon type="phone" />
                    {phone}
                  </a>
                ))}
              </div>

              <div className="space-y-4">
                {EMAILS.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 transition-colors duration-200 hover:text-btn-cream"
                  >
                    <ContactIcon type="mail" />
                    {email}
                  </a>
                ))}
              </div>

              <div className="flex items-start gap-3">
                <ContactIcon type="map" />
                <p>
                  3 R.K Mission Road
                  <br />
                  Lily Pond Center, Level 22
                  <br />
                  Motijheel, Dhaka-1203
                  <br />
                  Bangladesh
                </p>
              </div>

              <div className="flex items-start gap-3">
                <ContactIcon type="clock" />
                <p>
                  Saturday - Thursday: 10:00 Am
                  <br />
                  BDT - 05:00 PM (BDT)
                </p>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-h-[680px] items-center bg-white px-8 py-16 sm:px-16 lg:px-20">
          <form className="w-full max-w-[580px]">
            <div className="grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2">
              {FIELDS.map((field) => (
                <TextInput
                  key={`${field.label}-${field.placeholder}-${field.half}`}
                  label={field.label}
                  placeholder={field.placeholder}
                  half={field.half}
                />
              ))}

              <label className="block sm:col-span-2">
                <span className="block text-sm font-semibold text-black">
                  Your Message*
                </span>
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="mt-6 w-full resize-none border-0 border-b border-[#B8B8B8] bg-transparent pb-3 text-sm text-brand-primary outline-none placeholder:text-[11px] placeholder:text-brand-primary/70 focus:border-btn-cream"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-14 rounded-full bg-btn-cream px-8 py-3 text-sm font-semibold text-black transition-opacity duration-200 hover:opacity-90 active:scale-95"
            >
              Request a Quote
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
