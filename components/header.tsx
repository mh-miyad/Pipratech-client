'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 relative flex-shrink-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-05%20at%202.48.46%20AM-Id5mvn3NONZhGHWWtI2NEUfdf8qoSx.jpeg"
                alt="PIPRA Trading"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold text-lg md:text-xl text-[#1a3a52] hidden sm:inline">PIPRA Trading</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-gray-700 hover:text-[#dc2626] transition font-medium">
              About Us
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-[#dc2626] transition font-medium">
              Products
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-[#dc2626] transition font-medium">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#dc2626] transition font-medium">
              Contact
            </Link>
            <Link href="/contact" className="px-6 py-2 bg-[#dc2626] text-white rounded-lg font-semibold hover:bg-[#b91c1c] transition-all">
              Get Quote
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden mt-4 pb-4 space-y-4 flex flex-col">
            <Link href="/about" className="text-gray-700 hover:text-[#dc2626] transition font-medium">
              About Us
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-[#dc2626] transition font-medium">
              Products
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-[#dc2626] transition font-medium">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#dc2626] transition font-medium">
              Contact
            </Link>
            <Link href="/contact" className="w-full px-6 py-2 bg-[#dc2626] text-white rounded-lg font-semibold hover:bg-[#b91c1c] transition-all block text-center">
              Get Quote
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
