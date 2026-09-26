"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  Search, 
  Sparkles, 
  Tag, 
  CheckCircle2, 
  ArrowRight,
  Filter,
  X
} from "lucide-react";
import { blogPosts, BlogPost } from "@/lib/blog-data";
import { useProgressBar } from "@/components/YouTubeProgressBar";

const CATEGORIES = [
  "All",
  "Engineering",
  "Product",
  "Tutorial",
  "Security",
  "AI & ML",
  "Case Study",
] as const;

export default function BlogPage() {
  const { start, complete } = useProgressBar();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterMsg, setNewsletterMsg] = useState("");

  const handleSelectCategory = (cat: string) => {
    if (cat === selectedCategory) return;
    start();
    setSelectedCategory(cat);
    setTimeout(() => {
      complete();
    }, 220);
  };

  const handleResetFilters = () => {
    start();
    setSelectedCategory("All");
    setSearchQuery("");
    setTimeout(() => {
      complete();
    }, 220);
  };

  // Featured post is the first post (or explicitly flagged)
  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) {
      setNewsletterStatus("error");
      setNewsletterMsg("Please enter a valid email address.");
      return;
    }

    setNewsletterStatus("loading");
    setTimeout(() => {
      setNewsletterStatus("success");
      setNewsletterMsg("You're in! Check your inbox for the next engineering digest.");
      setNewsletterEmail("");
    }, 800);
  };

  return (
    <main className="min-h-screen bg-brand-black selection:bg-brand-yellow selection:text-brand-black">
      <Navbar />

      <div className="pt-36 md:pt-40 pb-24 px-4 sm:px-6 md:px-12 lg:px-16 bg-pixel-grid relative">
        <div className="max-w-7xl mx-auto">
          {/* Header Hero Section */}
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:flex-1 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow px-3 py-1 text-[8px] font-press-start uppercase mb-6">
                <Sparkles className="w-3 h-3" /> Engineering & Product Dispatch
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-press-start leading-tight text-brand-white mb-6">
                The <span className="text-brand-yellow">Rabbit</span> Hole
              </h1>
              <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed mb-6">
                Deep-dives into Abstract Syntax Trees, agentic code reviews, compiler invariants, and developer velocity from the GitRabbit engineering team.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-gray-500">
                <span>• 6 Technical Articles</span>
                <span>• Peer-Reviewed Research</span>
                <span>• Zero Marketing Fluff</span>
              </div>
            </motion.div>

            {/* Featured Post Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="lg:flex-1 w-full"
            >
              <Link
                href={`/blog/${featuredPost.id}`}
                className="group relative block aspect-[16/10] sm:aspect-video w-full border border-brand-gray/90 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(245,197,24,0.06)] hover:border-brand-yellow transition-all duration-300"
              >
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-75 group-hover:opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-yellow text-brand-black px-2.5 py-1 text-[8px] font-press-start uppercase shadow-[2px_2px_0px_#FFFFFF]">
                    Featured Deep-Dive
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 text-gray-300 text-[10px] font-mono uppercase mb-2">
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                    <span>•</span>
                    <span className="text-brand-yellow">{featuredPost.category}</span>
                  </div>
                  <h2 className="text-base sm:text-xl md:text-2xl font-press-start text-white mb-3 leading-snug group-hover:text-brand-yellow transition-colors line-clamp-2">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-300 text-xs font-sans line-clamp-2 mb-4 hidden sm:block">
                    {featuredPost.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-brand-yellow text-[9px] font-press-start uppercase">
                    Read Featured Article <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="mb-14 space-y-6">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0E111A] border border-brand-gray/80">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleSelectCategory(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                        isSelected
                          ? "bg-brand-yellow text-brand-black font-bold shadow-[2px_2px_0px_#FFFFFF]"
                          : "bg-[#161B26] text-gray-400 hover:text-white hover:bg-[#202736]"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Search input */}
              <div className="relative min-w-[240px] sm:min-w-[280px]">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search articles, tags, authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#161B26] border border-brand-gray/90 text-white placeholder-gray-500 text-xs font-sans focus:outline-none focus:border-brand-yellow transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Results counter & active filter indicator */}
            <div className="flex items-center justify-between text-xs font-mono text-gray-400 px-1">
              <span>
                Showing <strong className="text-brand-yellow">{filteredPosts.length}</strong> of{" "}
                <strong>{blogPosts.length}</strong> articles
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
              </span>

              {(selectedCategory !== "All" || searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="text-brand-yellow hover:underline text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-3 h-3" /> Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Blog Grid (All 6 posts) */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="flex flex-col bg-[#0D0F17] border border-brand-gray rounded-2xl overflow-hidden group hover:border-brand-yellow transition-all duration-300 hover:shadow-[0_8px_30px_rgba(245,197,24,0.08)]"
                >
                  <div className="relative aspect-video overflow-hidden bg-[#151924]">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-100"
                    />
                    <div className="absolute top-3.5 left-3.5">
                      <span className="bg-brand-black/90 backdrop-blur-sm border border-brand-gray text-brand-yellow px-2.5 py-1 text-[7px] font-press-start uppercase">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-gray-500 text-[10px] uppercase font-mono tracking-wider mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-brand-yellow" /> {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-brand-yellow" /> {post.readTime}
                      </span>
                    </div>

                    {/* Post Title */}
                    <h3 className="text-white font-press-start text-xs sm:text-sm mb-3 leading-relaxed group-hover:text-brand-yellow transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-xs font-sans mb-6 flex-1 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags preview */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[8px] font-mono px-2 py-0.5 rounded bg-[#161B26] text-gray-400 border border-brand-gray/80"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Author & Read More Footer */}
                    <div className="pt-4 border-t border-brand-gray/60 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-brand-yellow/40 bg-[#1A1E2B]">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={24}
                            height={24}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-gray-300 truncate max-w-[100px]">
                          {post.author.name}
                        </span>
                      </div>

                      <Link
                        href={`/blog/${post.id}`}
                        className="flex items-center gap-1.5 text-brand-yellow text-[8px] font-press-start uppercase group/link hover:underline"
                      >
                        Read Post
                        <ChevronRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center border border-dashed border-brand-gray rounded-3xl bg-[#0D0F17]/50 mb-24">
              <Filter className="w-10 h-10 text-gray-600 mx-auto mb-4" />
              <h3 className="text-base font-press-start text-white mb-2">No matching articles found</h3>
              <p className="text-gray-400 text-xs font-sans max-w-sm mx-auto mb-6">
                Try searching for different keywords or clear the category filters to browse all 6 articles.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-brand-yellow text-brand-black text-[9px] font-press-start uppercase hover:brightness-110 shadow-[2px_2px_0px_#FFFFFF] cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          )}

          {/* Newsletter Section */}
          <div
            id="newsletter"
            className="bg-brand-yellow p-8 sm:p-12 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-[0_0_50px_rgba(245,197,24,0.15)] scroll-mt-32"
          >
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-xl text-center lg:text-left">
              <span className="text-[8px] font-press-start uppercase bg-brand-black text-brand-yellow px-2.5 py-1 mb-4 inline-block">
                Weekly Developer Dispatch
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-press-start text-brand-black mb-3 leading-snug">
                Subscribe to <span className="underline italic">The Data Stream</span>
              </h2>
              <p className="text-brand-black/80 text-xs sm:text-sm font-medium font-sans">
                Get the latest AST compiler breakthroughs, zero-day analysis reports, and product drops straight to your inbox. No spam, ever.
              </p>
            </div>

            <div className="w-full lg:w-auto relative z-10">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="engineer@company.com"
                  value={newsletterEmail}
                  onChange={(e) => {
                    setNewsletterEmail(e.target.value);
                    if (newsletterStatus !== "idle") setNewsletterStatus("idle");
                  }}
                  className="bg-brand-black text-brand-white px-5 py-3.5 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-black w-full sm:w-72"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="bg-white text-brand-black px-6 py-3.5 text-[9px] font-press-start uppercase shadow-[3px_3px_0px_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 whitespace-nowrap"
                >
                  {newsletterStatus === "loading" ? "Subscribing..." : "Subscribe"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>

              {newsletterMsg && (
                <div
                  className={`mt-3 text-xs font-mono flex items-center gap-1.5 ${
                    newsletterStatus === "success" ? "text-green-950 font-bold" : "text-red-900"
                  }`}
                >
                  {newsletterStatus === "success" && <CheckCircle2 className="w-4 h-4 text-green-900" />}
                  <span>{newsletterMsg}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
