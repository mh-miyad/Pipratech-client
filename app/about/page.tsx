import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Award, Truck, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'About Us - PIPRA Trading',
  description: 'Learn about PIPRA Trading, our founder Md. Sajjad Hossain Tanmoy, and our commitment to quality electrical equipment.',
};

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 md:space-y-4 mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1a3a52]">
              About <span className="text-[#dc2626]">PIPRA Trading</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Your trusted partner in premium electrical equipment since 2021
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a52]">About PIPRA Trading</h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                PIPRA Trading is a leading importer and supplier of premium electrical equipment and components in Bangladesh. Founded in 2021, we have built a strong reputation for delivering high-quality products and exceptional customer service.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                Our expertise spans electrical distribution, circuit protection, and comprehensive solutions for residential, commercial, and industrial applications. We partner with leading international manufacturers to ensure every product meets the highest standards.
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                With over 1000 satisfied customers and growing, we remain committed to innovation, reliability, and customer success. Our professional team works tirelessly to understand your needs and provide tailored electrical solutions.
              </p>
              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-3xl font-bold text-[#dc2626]">5+</p>
                  <p className="text-gray-600 text-sm">Years Experience</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-3xl font-bold text-[#dc2626]">1000+</p>
                  <p className="text-gray-600 text-sm">Happy Clients</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#1a3a52] to-[#dc2626] rounded-2xl p-1 shadow-2xl">
                <div className="bg-white rounded-xl p-8 h-full flex flex-col items-center justify-center">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-04-05%20at%202.48.46%20AM-Id5mvn3NONZhGHWWtI2NEUfdf8qoSx.jpeg"
                    alt="PIPRA Trading Company"
                    width={350}
                    height={350}
                    className="object-contain max-w-full"
                  />
                  <p className="text-center text-gray-600 text-sm mt-6 font-semibold">Premium Electrical Solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a3a52] mb-4">Our Founder & CEO</h2>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-12 text-center">
            <div className="mb-6 md:mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0237.JPG-kOwEUdQ7tbsX3hlm6UOhlxeMfMsgMM.jpeg"
                alt="Md. Saad Hasan Roy"
                width={200}
                height={200}
                className="rounded-xl mx-auto object-cover mb-6 max-w-full"
              />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#1a3a52] mb-2">Md. Saad Hasan Roy</h3>
            <p className="text-lg md:text-xl text-[#dc2626] font-semibold mb-4 md:mb-6">Founder & CEO</p>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-4 md:mb-6 px-2">
              With a passion for quality and customer satisfaction, Md. Saad Hasan Roy founded PIPRA Trading to provide businesses with reliable electrical solutions they can trust. Under his leadership, the company has grown to become a trusted name in the electrical equipment industry.
            </p>
            <div className="border-t border-gray-200 pt-6">
              <p className="text-gray-500 text-sm">
                Dedicated to innovation, quality, and customer success in the electrical equipment sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a3a52] mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600">Committed to excellence in everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-[#dc2626] text-white flex items-center justify-center mb-4">
                <CheckCircle size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#1a3a52] mb-3">Licensed & Certified</h3>
              <p className="text-gray-600">
                Professional and trustworthy supplier of quality electrical equipment and components.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-[#dc2626] text-white flex items-center justify-center mb-4">
                <Award size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#1a3a52] mb-3">Premium Quality</h3>
              <p className="text-gray-600">
                All products meet international standards. We source only the best equipment from trusted manufacturers.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-[#dc2626] text-white flex items-center justify-center mb-4">
                <Truck size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#1a3a52] mb-3">Reliable Service</h3>
              <p className="text-gray-600">
                Fast delivery, professional support, and customer-first approach. We're here to help you succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
