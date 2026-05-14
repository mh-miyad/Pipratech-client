import Image from "next/image";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Products", href: "/products" },
  { label: "Contact Us", href: "/contact" },
  { label: "Gallery", href: "/gallery" },
  { label: "Company", href: "/sister-concerns" },
];

const PHONES = [
  "(+8802) 47110171",
  "(+8802) 47110171",
  "(+8802) 47110171",
];

const EMAILS = [
  { label: "snljute@gmail.com", href: "mailto:snljute@gmail.com" },
  { label: "jutex@gmail.com", href: "mailto:jutex@gmail.com" },
];

const BOTTOM_LINKS = [
  { label: "Privacy", href: "/about" },
  { label: "Terms", href: "/contact" },
  { label: "Quality Policy", href: "/products" },
];

// ─── Icon helpers ──────────────────────────────────────────────────────────────

const PhoneIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
  </svg>
);

const MapIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.083 3.99-5.21 3.99-9.327 0-4.862-3.865-8-8.26-8-4.397 0-8.26 3.138-8.26 8 0 4.116 2.047 7.243 3.991 9.326a19.58 19.58 0 002.682 2.283 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" />
  </svg>
);

// Social icons
const SocialIcons = [
  {
    label: "Facebook",
    href: "#",
    path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    fill: false,
  },
  {
    label: "Instagram",
    href: "#",
    path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z",
    fill: false,
  },
  {
    label: "WhatsApp",
    href: "#",
    // WhatsApp SVG path
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z",
    fill: true,
  },
  {
    label: "Location",
    href: "#",
    path: "M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.083 3.99-5.21 3.99-9.327 0-4.862-3.865-8-8.26-8-4.397 0-8.26 3.138-8.26 8 0 4.116 2.047 7.243 3.991 9.326a19.58 19.58 0 002.682 2.283 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z",
    fill: true,
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

const Footer = () => {
  return (
    <footer className="bg-brand-green text-white">
      {/* ── Main grid ──────────────────────────────────────────────────────── */}
      <div className="max-w-360 mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-10 md:pt-16 md:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1.3fr] gap-10 lg:gap-8">

          {/* ── Col 1: Brand ───────────────────────────────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/snl-logo.png"
                alt="SNL International"
                width={120}
                height={48}
                className="object-contain w-auto h-10"
              />
            </Link>

            {/* Trademark notice */}
            <p className="text-white/50 text-xs leading-relaxed max-w-xs">
              This is a trademark authorized website of SNL International,
              Bangladesh. Any kind of copyright infringement will cause taking
              legal actions against the person or group of persons.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {SocialIcons.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center text-white/55 hover:text-white hover:border-white/60 transition-all duration-200 ease-linear active:scale-90"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill={s.fill ? "currentColor" : "none"}
                    stroke={s.fill ? "none" : "currentColor"}
                    strokeWidth={s.fill ? undefined : 1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ─────────────────────────────────────────── */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/55 hover:text-white text-sm transition-colors duration-200 ease-linear"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Contact Information ─────────────────────────────────── */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 tracking-wide">
              Contact Information
            </h3>
            <ul className="space-y-3">
              {PHONES.map((phone, i) => (
                <li key={i}>
                  <a
                    href={`tel:${phone.replace(/\s|\(|\)/g, "")}`}
                    className="flex items-center gap-2.5 text-white/55 hover:text-white text-sm transition-colors duration-200 ease-linear"
                  >
                    <PhoneIcon />
                    {phone}
                  </a>
                </li>
              ))}
              {EMAILS.map((email) => (
                <li key={email.label}>
                  <a
                    href={email.href}
                    className="flex items-center gap-2.5 text-white/55 hover:text-white text-sm transition-colors duration-200 ease-linear"
                  >
                    <MailIcon />
                    {email.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Office Information ──────────────────────────────────── */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 tracking-wide">
              Office Information
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5 text-white/55 text-sm leading-relaxed">
                <MapIcon />
                <span>
                  3 R.K Mission Road<br />
                  Lily Pond Center, Level 22<br />
                  Motijheel, Dhaka-1203<br />
                  Bangladesh
                </span>
              </li>
              <li className="flex items-start gap-2.5 text-white/55 text-sm leading-relaxed">
                <ClockIcon />
                <span>
                  Saturday – Thursday: 10:00 Am<br />
                  BDT – 05:00 PM (BDT)
                </span>
              </li>
            </ul>

            {/* Contact Us button */}
            <Link
              href="/contact"
              className="inline-flex items-center mt-6 px-5 py-2.5 rounded-md bg-brand-neutral/75 text-sm font-medium text-white/90 transition-all duration-200 ease-linear hover:brightness-110 active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* ── Divider ────────────────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-360 mx-auto px-5 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs">
            © SNL International, {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-1">
            {BOTTOM_LINKS.map((item, i) => (
              <span key={item.label} className="flex items-center gap-1">
                {i !== 0 && <span className="text-white/20 text-xs">|</span>}
                <Link
                  href={item.href}
                  className="text-white/40 hover:text-white/70 text-xs transition-colors duration-200 ease-linear px-1"
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
