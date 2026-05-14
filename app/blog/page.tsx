import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ArrowRight, Calendar, User } from 'lucide-react';

export const metadata = {
  title: 'Blog - PIPRA Trading',
  description: 'Read our latest articles on electrical equipment, safety tips, and industry insights.',
};

const posts = [
  {
    title: 'Electrical Safety Best Practices',
    category: 'Safety',
    author: 'PIPRA Team',
    date: 'April 5, 2026',
    excerpt: 'Learn essential electrical safety practices to protect your home and business from hazards.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0956%20%281%29.PNG-UjHFT9CyRNYAuWVO9YGtxny4RJPLQJ.png',
  },
  {
    title: 'Understanding MCB Ratings',
    category: 'Technical',
    author: 'PIPRA Team',
    date: 'April 3, 2026',
    excerpt: 'A comprehensive guide to MCB ratings and how to choose the right one for your needs.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0957%20%281%29.WEBP-miExDZF50gWwQ0JJLYEOfLVbuvGPCs.webp',
  },
  {
    title: 'Circuit Breaker Maintenance Tips',
    category: 'Maintenance',
    author: 'PIPRA Team',
    date: 'April 1, 2026',
    excerpt: 'Proper maintenance ensures your circuit breakers work efficiently for years to come.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0959%20%281%29.PNG-ipCHV0ErYOdw69JVP2zZy0sEfqRijz.png',
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-[#1a3a52]">
              Our <span className="text-[#dc2626]">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Insights, tips, and industry updates from PIPRA Trading
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <article key={i} className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <div className="aspect-video bg-gray-50 relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-[#dc2626]/10 text-[#dc2626] text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a3a52] mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  
                  <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-gray-200 text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      {post.author}
                    </div>
                  </div>

                  <div className="flex items-center text-[#dc2626] font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                    Read Article <ArrowRight size={16} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 px-4 md:px-8 lg:px-12 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-[#1a3a52] to-[#2a5070] rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg text-gray-200 mb-8">
              Get the latest insights and updates delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <button className="px-6 py-3 bg-[#dc2626] text-white font-semibold rounded-lg hover:bg-[#b91c1c] transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
