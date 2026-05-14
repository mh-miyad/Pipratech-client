'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Award, Truck, CheckCircle, Zap, Phone, Mail, MapPin, Facebook, Linkedin, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a52]/5 via-transparent to-[#dc2626]/5 -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <div className="inline-block px-3 py-1 md:px-4 md:py-2 rounded-full bg-[#dc2626]/10 text-[#dc2626] text-xs md:text-sm font-semibold">
                  Premium Electrical Solutions
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1a3a52] leading-tight">
                  Quality <span className="text-[#dc2626]">Electrical</span> Equipment
                </h1>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                  PIPRA Trading is your trusted supplier of premium MCBs, circuit breakers, and electrical equipment. Certified, reliable, and built to last.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                <Link href="/products" className="px-6 md:px-8 py-3 md:py-4 bg-[#1a3a52] text-white rounded-lg font-semibold hover:bg-[#0f2438] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm md:text-base">
                  Explore Products
                  <ArrowRight size={20} />
                </Link>
                <Link href="/contact" className="px-6 md:px-8 py-3 md:py-4 border-2 border-[#1a3a52] text-[#1a3a52] rounded-lg font-semibold hover:bg-[#1a3a52]/5 transition-all duration-300 flex items-center justify-center text-sm md:text-base">
                  Contact Us
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-gray-200">
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-[#dc2626]">100%</p>
                  <p className="text-xs md:text-sm text-gray-600">Licensed</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-[#dc2626]">1000+</p>
                  <p className="text-xs md:text-sm text-gray-600">Customers</p>
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-[#dc2626]">24/7</p>
                  <p className="text-xs md:text-sm text-gray-600">Support</p>
                </div>
              </div>
            </div>

            {/* Right Image - Hidden on mobile */}
            <div className="relative hidden md:block h-64 sm:h-80 md:h-96 lg:h-full min-h-64 mt-8 md:mt-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a52] to-[#dc2626] rounded-2xl opacity-10 -z-10 transform rotate-3" />
              <div className="bg-gradient-to-br from-[#f1f5f9] to-[#e8ebf0] rounded-2xl p-6 md:p-8 h-full flex items-center justify-center shadow-xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-05%20at%202.48.46%20AM-Id5mvn3NONZhGHWWtI2NEUfdf8qoSx.jpeg"
                  alt="PIPRA Trading Logo"
                  width={300}
                  height={300}
                  className="object-contain max-w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a3a52] mb-4 md:mb-6">About PIPRA Trading</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Since 2021, we&apos;ve been a trusted supplier of high-quality electrical equipment and components. Our commitment to excellence drives everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 md:space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#dc2626] text-white flex items-center justify-center">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a3a52] mb-2">Licensed & Certified</h3>
                  <p className="text-gray-600">Professional and trustworthy electrical equipment supplier</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#dc2626] text-white flex items-center justify-center">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a3a52] mb-2">Premium Quality</h3>
                  <p className="text-gray-600">All products meet international standards and certifications</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#dc2626] text-white flex items-center justify-center">
                  <Truck size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a3a52] mb-2">Reliable Delivery</h3>
                  <p className="text-gray-600">Fast and secure delivery across Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0237.JPG-kOwEUdQ7tbsX3hlm6UOhlxeMfMsgMM.jpeg"
                  alt="Md. Sajjad Hossain Tanmoy - Founder & CEO"
                  width={200}
                  height={200}
                  className="rounded-xl mx-auto object-cover mb-4"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#1a3a52] mb-1">Md. Sajjad Hossain Tanmoy</h3>
                <p className="text-[#dc2626] font-semibold mb-4">Founder & CEO</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  With a passion for quality and customer satisfaction, Md. Sajjad Hossain Tanmoy founded PIPRA Trading to provide businesses with reliable electrical solutions they can trust.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a52] mb-4">Our Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Premium quality MCBs and circuit breakers designed for residential, commercial, and industrial applications
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0956%20%281%29.PNG-UjHFT9CyRNYAuWVO9YGtxny4RJPLQJ.png',
                name: 'Single Pole MCB',
                desc: 'Single pole miniature circuit breaker'
              },
              {
                img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0957%20%281%29.WEBP-miExDZF50gWwQ0JJLYEOfLVbuvGPCs.webp',
                name: 'Three Pole MCB',
                desc: 'Industrial grade three pole circuit breaker'
              },
              {
                img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0959%20%281%29.PNG-ipCHV0ErYOdw69JVP2zZy0sEfqRijz.png',
                name: 'Advanced MCB Series',
                desc: 'Latest technology advanced protection'
              },
              {
                img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0958.JPG%20%281%29-lHrNYd0CxlnG1E6bhhB36uuhfCN7ti.jpeg',
                name: 'Two Pole MCB',
                desc: 'Dual pole circuit breaker solutions'
              },
              {
                img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0960%20%281%29.PNG-VhxYTjFcz3ZxwQwISlmvtx59DaWLQy.png',
                name: 'Compact MCB Array',
                desc: 'Space-efficient multi-circuit protection'
              },
              {
                img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0961.JPG%20%281%29-5uhjLqdPPuoaqyNJjjNmqWcgiCZJWm.jpeg',
                name: 'Standard Circuit Breaker',
                desc: 'Reliable standard grade protection'
              },
            ].map((product, i) => (
              <Link key={i} href="/contact" className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block">
                <div className="aspect-video bg-white relative overflow-hidden">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1a3a52] mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.desc}</p>
                  <div className="mt-4 flex items-center text-[#dc2626] font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                    Learn More <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a52] mb-4">Why Choose PIPRA Trading?</h2>
            <p className="text-lg text-gray-600">Industry-leading service and support</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: CheckCircle, title: 'Licensed & Certified', desc: 'Official trade license verified' },
              { icon: Award, title: 'Premium Quality', desc: 'International standards' },
              { icon: Truck, title: 'Fast Delivery', desc: 'Reliable nationwide shipping' },
              { icon: Zap, title: 'Expert Support', desc: '24/7 customer assistance' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-white rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-full bg-[#dc2626]/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-[#dc2626]" size={28} />
                </div>
                <h3 className="text-lg font-bold text-[#1a3a52] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1a3a52] mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-600">We&apos;re here to help with your electrical equipment needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#dc2626] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#1a3a52] mb-2">Phone</h3>
              <p className="text-[#dc2626] font-semibold text-lg">+880 1784 310930</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#dc2626] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#1a3a52] mb-2">Email</h3>
              <p className="text-[#dc2626] font-semibold">pipratrading@gmail.com</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#dc2626] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#1a3a52] mb-2">Address</h3>
              <p className="text-gray-600 text-sm">1, Afarababad, Kamrannirchar, Dhaka-1211</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#1a3a52] to-[#2a5070] rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Contact us today for product inquiries, bulk orders, or to become a valued customer of PIPRA Trading
            </p>
            <Link href="/contact" className="px-8 py-4 bg-[#dc2626] text-white rounded-lg font-semibold hover:bg-[#b91c1c] transition-all duration-300 inline-block text-center">
              Contact Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
