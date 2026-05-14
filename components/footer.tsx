'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a3a52] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-05%20at%202.48.46%20AM-Id5mvn3NONZhGHWWtI2NEUfdf8qoSx.jpeg"
                  alt="PIPRA Trading"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl">PIPRA Trading</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Premium electrical equipment supplier and importer. Your trusted partner for quality MCBs and circuit breakers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#dc2626]">Navigation</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">About Us</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Our Products</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#dc2626]">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-[#dc2626] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Phone</p>
                  <a href="tel:01784310930" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                    +880 1784 310930
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[#dc2626] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Email</p>
                  <a href="mailto:pipratrading@gmail.com" className="text-gray-300 hover:text-white transition-colors text-sm font-medium break-all">
                    pipratrading@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Address & Social */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-[#dc2626]">Location & Social</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#dc2626] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Address</p>
                  <p className="text-gray-300 text-sm">
                    1, Afarababad<br />
                    Kamrannirchar, Dhaka-1211
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-xs text-gray-400 font-medium mb-3">Follow Us</p>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#dc2626]/20 hover:bg-[#dc2626] rounded-lg flex items-center justify-center transition-all text-[#dc2626] hover:text-white"
                    aria-label="Facebook"
                  >
                    <Facebook size={18} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#dc2626]/20 hover:bg-[#dc2626] rounded-lg flex items-center justify-center transition-all text-[#dc2626] hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="mailto:pipratrading@gmail.com"
                    className="w-10 h-10 bg-[#dc2626]/20 hover:bg-[#dc2626] rounded-lg flex items-center justify-center transition-all text-[#dc2626] hover:text-white"
                    aria-label="Email"
                  >
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />
      </div>

      {/* Bottom Footer */}
      <div className="bg-black/20 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; {currentYear} PIPRA Trading. All rights reserved.</p>
            <p>Professional Electrical Equipment Supplier | Licensed & Certified</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
