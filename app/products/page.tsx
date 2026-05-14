import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Our Products - PIPRA Trading',
  description: 'Browse our range of premium MCBs and circuit breakers for residential, commercial, and industrial applications.',
};

const products = [
  {
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0956%20%281%29.PNG-UjHFT9CyRNYAuWVO9YGtxny4RJPLQJ.png',
    name: 'Single Pole MCB',
    desc: 'Single pole miniature circuit breaker for residential applications',
    specs: ['C6-C20 Rating', 'Compact Design', 'Reliable Protection']
  },
  {
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0957%20%281%29.WEBP-miExDZF50gWwQ0JJLYEOfLVbuvGPCs.webp',
    name: 'Three Pole MCB',
    desc: 'Industrial grade three pole circuit breaker for heavy loads',
    specs: ['C10-C63 Rating', 'Industrial Grade', '10kA Breaking']
  },
  {
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0959%20%281%29.PNG-ipCHV0ErYOdw69JVP2zZy0sEfqRijz.png',
    name: 'Advanced MCB Series',
    desc: 'Latest technology advanced protection mechanisms',
    specs: ['Smart Features', 'Energy Efficient', 'Certified Safe']
  },
  {
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0958.JPG%20%281%29-lHrNYd0CxlnG1E6bhhB36uuhfCN7ti.jpeg',
    name: 'Two Pole MCB',
    desc: 'Dual pole circuit breaker solutions for medium loads',
    specs: ['C10-C40 Rating', 'Dual Protection', 'Compact Size']
  },
  {
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0960%20%281%29.PNG-VhxYTjFcz3ZxwQwISlmvtx59DaWLQy.png',
    name: 'Compact MCB Array',
    desc: 'Space-efficient multi-circuit protection system',
    specs: ['Multiple Circuits', 'Space Saving', 'Modular Design']
  },
  {
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0961.JPG%20%281%29-5uhjLqdPPuoaqyNJjjNmqWcgiCZJWm.jpeg',
    name: 'Standard Circuit Breaker',
    desc: 'Reliable standard grade protection for everyday use',
    specs: ['Premium Build', 'Long Lasting', 'ISO Certified']
  },
];

export default function Products() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 md:space-y-4 mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1a3a52]">
              Our <span className="text-[#dc2626]">Products</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
              Premium quality MCBs and circuit breakers for every application
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {products.map((product, i) => (
              <Link key={i} href="/contact" className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block">
                <div className="aspect-video bg-gray-50 relative overflow-hidden">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1a3a52] mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.desc}</p>
                  <div className="space-y-2 mb-4">
                    {product.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 bg-[#dc2626] rounded-full mr-2" />
                        {spec}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center text-[#dc2626] font-semibold text-sm group-hover:gap-3 gap-2 transition-all pt-2 border-t border-gray-200">
                    Learn More <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#1a3a52] to-[#2a5070] rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Interested in our products?</h2>
            <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              Contact us for product specifications, bulk orders, or wholesale inquiries
            </p>
            <a href="/contact" className="px-8 py-4 bg-[#dc2626] text-white rounded-lg font-semibold hover:bg-[#b91c1c] transition-all duration-300 inline-block">
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
