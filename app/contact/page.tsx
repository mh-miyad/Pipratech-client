import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export const metadata = {
  title: 'Contact Us - PIPRA Trading',
  description: 'Get in touch with PIPRA Trading. We are here to help with your electrical equipment needs.',
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 md:space-y-4 mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1a3a52]">
              Get In <span className="text-[#dc2626]">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              We&apos;re here to help with your electrical equipment needs
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <div className="bg-white rounded-xl p-6 md:p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#dc2626] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#1a3a52] mb-2">Phone</h3>
              <p className="text-[#dc2626] font-semibold">+880 1784 310930</p>
              <p className="text-gray-600 text-xs md:text-sm mt-2">Available 24/7</p>
            </div>

            <div className="bg-white rounded-xl p-6 md:p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#dc2626] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#1a3a52] mb-2">Email</h3>
              <p className="text-[#dc2626] font-semibold text-sm md:text-base break-all">pipratrading@gmail.com</p>
              <p className="text-gray-600 text-xs md:text-sm mt-2">Response within 24 hours</p>
            </div>

            <div className="bg-white rounded-xl p-6 md:p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#dc2626] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={28} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#1a3a52] mb-2">Address</h3>
              <p className="text-gray-600 text-sm md:text-base">1, Afarababad<br />Kamrannirchar, Dhaka-1211</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1a3a52] mb-6 md:mb-8">Send us a Message</h2>
              <form className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-4 py-2 md:py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#dc2626] text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#dc2626]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#dc2626]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Subject</label>
                  <input
                    type="text"
                    placeholder="Enter message subject"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#dc2626]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Message</label>
                  <textarea
                    placeholder="Enter your message here..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#dc2626] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-[#dc2626] text-white rounded-lg font-semibold hover:bg-[#b91c1c] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send size={20} />
                </button>
              </form>
            </div>

            {/* Company Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#1a3a52] mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <p><span className="font-semibold">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                  <p><span className="font-semibold">Saturday:</span> 10:00 AM - 4:00 PM</p>
                  <p><span className="font-semibold">Sunday:</span> Closed</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1a3a52] to-[#2a5070] rounded-xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Why Contact Us?</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full" />
                    Product Inquiries
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full" />
                    Bulk Orders
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full" />
                    Wholesale Pricing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full" />
                    Technical Support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full" />
                    Partnership Opportunities
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-[#1a3a52] mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  <a href="tel:01784310930" className="flex items-center gap-3 p-4 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                    <Phone className="text-[#dc2626]" size={24} />
                    <span className="font-semibold text-gray-700">+880 1784 310930</span>
                  </a>
                  <a href="mailto:pipratrading@gmail.com" className="flex items-center gap-3 p-4 bg-white rounded-lg hover:bg-gray-100 transition-colors">
                    <Mail className="text-[#dc2626]" size={24} />
                    <span className="font-semibold text-gray-700">pipratrading@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
