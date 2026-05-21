"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ChevronRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "How AI is Revolutionizing Code Reviews",
    excerpt: "Discover how machine learning models are catching bugs that traditional static analysis misses.",
    category: "Engineering",
    date: "May 12, 2026",
    readTime: "5 min read",
    image: "/hero_image.png", // Reusing available assets or I can generate more
  },
  {
    id: 2,
    title: "Introducing GitRabbit Agent v2",
    excerpt: "A deep dive into our latest update: autonomous issue resolution and better context awareness.",
    category: "Product",
    date: "May 08, 2026",
    readTime: "8 min read",
    image: "/pricing_header_pixel_rabbit_1777565653593.png",
  },
  {
    id: 3,
    title: "Best Practices for Clean Code in 2026",
    excerpt: "Simple habits every developer should follow to keep their codebase maintainable and scalable.",
    category: "Tutorial",
    date: "May 01, 2026",
    readTime: "12 min read",
    image: "/blog_header_pixel_rabbit_1777566140108.png",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-brand-black selection:bg-brand-yellow selection:text-brand-black">
      <Navbar />
      
      <div className="pt-40 pb-24 px-6 md:px-16 bg-pixel-grid relative">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:flex-1 text-center lg:text-left"
            >
              <h1 className="text-3xl md:text-5xl font-press-start leading-tight text-brand-white mb-6">
                The <span className="text-brand-yellow">Rabbit</span> Hole
              </h1>
              <p className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0 font-mono uppercase tracking-tight text-[10px] md:text-xs">
                Insights, tutorials, and updates from the world of AI-powered engineering.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:flex-1 relative aspect-video max-w-2xl w-full border border-brand-gray rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(245,197,24,0.05)]"
            >
              <Image 
                src="/blog_header_pixel_rabbit_1777566140108.png" 
                alt="Blog Header" 
                fill 
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-brand-yellow text-brand-black px-3 py-1 text-[8px] font-press-start uppercase mb-3 inline-block">Featured Post</span>
                <h2 className="text-xl md:text-2xl font-press-start text-white mb-2 leading-tight">Navigating the Future of Autonomous Reviews</h2>
              </div>
            </motion.div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex flex-col bg-[#0C0C0C] border border-brand-gray rounded-2xl overflow-hidden group hover:border-brand-yellow transition-all"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-60 group-hover:opacity-100"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-brand-black/80 backdrop-blur-sm border border-brand-gray text-brand-yellow px-2 py-1 text-[8px] font-press-start uppercase">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-gray-500 text-[10px] uppercase font-mono tracking-widest mb-4">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>
                  
                  <h3 className="text-brand-white font-press-start text-xs md:text-sm mb-4 leading-relaxed group-hover:text-brand-yellow transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 text-xs mb-8 flex-1 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <Link 
                    href={`/blog/${post.id}`}
                    className="flex items-center gap-2 text-brand-yellow text-[9px] font-press-start uppercase group/link"
                  >
                    Read Article <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="bg-brand-yellow p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 max-w-xl">
              <h2 className="text-xl md:text-2xl font-press-start text-brand-black mb-4">Subscribe to <span className="underline italic">The Data Stream</span></h2>
              <p className="text-brand-black/70 text-sm font-medium">Get the latest news and engineering deep-dives delivered straight to your inbox.</p>
            </div>
            
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 relative z-10">
              <input 
                type="email" 
                placeholder="Email address..." 
                className="bg-brand-black text-brand-white px-6 py-4 rounded-xl text-sm font-mono focus:outline-none w-full sm:w-64"
              />
              <button className="bg-white text-brand-black px-8 py-4 text-[10px] font-press-start uppercase shadow-[4px_4px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
