import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight,
  BookOpen, 
  ChevronRight,
  Home,
  Tag
} from "lucide-react";
import { 
  blogPosts, 
  getBlogByIdOrSlug, 
  getRelatedBlogs 
} from "@/lib/blog-data";
import { ReadingProgressBar } from "@/components/blog/reading-progress-bar";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { SocialShareButtons } from "@/components/blog/social-share-buttons";
import { ArticleReactions } from "@/components/blog/article-reactions";
import { CopyCodeEnhancer } from "@/components/blog/copy-code-enhancer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return blogPosts.flatMap((post) => [
    { id: post.id.toString() },
    { id: post.slug },
  ]);
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { id } = await props.params;
  const post = getBlogByIdOrSlug(id);

  if (!post) {
    return {
      title: "Article Not Found - GitRabbit Blog",
      description: "The requested blog article could not be found.",
    };
  }

  return {
    title: `${post.title} — GitRabbit Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedDate,
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function ArticlePage(props: PageProps) {
  const { id } = await props.params;
  const post = getBlogByIdOrSlug(id);

  if (!post) {
    notFound();
  }

  // Previous and next post navigation
  const currentIndex = blogPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  // 3 Related blogs
  const relatedPosts = getRelatedBlogs(post.id, 3);

  return (
    <main className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-yellow selection:text-black">
      <ReadingProgressBar />
      <CopyCodeEnhancer />
      <Navbar />

      <div className="pt-36 md:pt-40 pb-24 px-4 sm:px-6 md:px-12 lg:px-16 bg-pixel-grid relative">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-[9px] md:text-[10px] font-mono uppercase tracking-wider text-gray-400">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-brand-yellow flex items-center gap-1 transition-colors">
                <Home className="w-3 h-3" /> Home
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-600" />
              <Link href="/blog" className="hover:text-brand-yellow transition-colors">
                Blog
              </Link>
              <ChevronRight className="w-3 h-3 text-gray-600" />
              <span className="text-brand-yellow font-semibold truncate max-w-[200px] sm:max-w-xs">
                {post.category}
              </span>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-yellow transition-colors font-press-start text-[8px] uppercase group"
            >
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              Back to All Articles
            </Link>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-brand-yellow text-brand-black px-3 py-1 text-[8px] font-press-start uppercase shadow-[2px_2px_0px_#FFFFFF]">
                {post.category}
              </span>
              <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-yellow" /> {post.date}
              </span>
              <span className="text-gray-600">•</span>
              <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-yellow" /> {post.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-press-start leading-snug md:leading-tight text-brand-white mb-8">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 font-sans leading-relaxed mb-8 max-w-4xl">
              {post.excerpt}
            </p>

            {/* Author bar & Top Share */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-brand-gray/80">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-yellow/50 bg-[#151922] p-0.5">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{post.author.name}</span>
                    <span className="text-[10px] font-mono text-brand-yellow">{post.author.handle}</span>
                  </div>
                  <div className="text-xs text-gray-400 font-sans">{post.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-wider hidden md:inline">
                  Share:
                </span>
                <SocialShareButtons title={post.title} tags={post.tags} />
              </div>
            </div>
          </header>

          {/* Hero Feature Image */}
          <div className="relative aspect-[16/9] w-full rounded-2xl md:rounded-3xl overflow-hidden border border-brand-gray/90 mb-16 shadow-[0_0_50px_rgba(245,197,24,0.08)]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Article Main Grid: Content + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            {/* Left: Article Body */}
            <article className="lg:col-span-8">
              {/* Mobile Table of Contents for quick touch jumping */}
              <TableOfContents items={post.tableOfContents} mobileCollapsible />

              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags & Reactions Bar */}
              <div className="mt-16 pt-8 border-t border-brand-gray/80 space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5 mr-2">
                    <Tag className="w-3.5 h-3.5 text-brand-yellow" /> Tags:
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono bg-[#141824] border border-brand-gray/90 hover:border-brand-yellow text-gray-300 px-2.5 py-1 rounded-md transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-brand-gray/40">
                  <ArticleReactions postId={post.id} />
                  <SocialShareButtons title={post.title} tags={post.tags} />
                </div>
              </div>

              {/* Author Bio Box */}
              <div className="mt-12 p-8 rounded-2xl bg-[#0D0F17] border border-brand-gray/90 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-yellow flex-shrink-0 bg-[#151922]">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div>
                      <h4 className="text-base font-bold text-white">{post.author.name}</h4>
                      <p className="text-xs text-brand-yellow font-mono">{post.author.role}</p>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 border border-brand-gray px-2 py-1 rounded">
                      {post.author.handle}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 font-sans leading-relaxed">
                    {post.author.bio}
                  </p>
                </div>
              </div>
            </article>

            {/* Right: Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Table of contents */}
              <TableOfContents items={post.tableOfContents} />

              {/* Quick Subscribe Card in Sidebar */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#121420] to-[#0A0B10] border border-brand-gray/80">
                <div className="flex items-center gap-2 mb-3 text-brand-yellow font-press-start text-[8px] uppercase">
                  <BookOpen className="w-3.5 h-3.5" /> Engineering Digest
                </div>
                <h4 className="text-sm font-bold text-white mb-2">
                  Stay ahead of autonomous code reviews
                </h4>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed font-sans">
                  Join 15,000+ senior engineers receiving weekly deep-dives on compiler theory, ASTs, and automated dev tools.
                </p>
                <Link
                  href="/blog#newsletter"
                  className="block text-center w-full py-2.5 px-4 bg-brand-yellow text-brand-black text-[9px] font-press-start uppercase hover:brightness-110 shadow-[2px_2px_0px_#FFFFFF] transition-all"
                >
                  Subscribe Free
                </Link>
              </div>
            </aside>
          </div>

          {/* Prev / Next Article Pagination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t border-brand-gray/80 mb-24">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.id}`}
                className="group p-6 rounded-2xl bg-[#0D0F17] border border-brand-gray hover:border-brand-yellow transition-all flex flex-col justify-between"
              >
                <div className="flex items-center gap-2 text-[9px] font-press-start uppercase text-gray-500 mb-3 group-hover:text-brand-yellow transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  Previous Article
                </div>
                <h5 className="text-sm font-bold text-white group-hover:text-brand-yellow transition-colors line-clamp-2">
                  {prevPost.title}
                </h5>
                <span className="text-[10px] font-mono text-gray-500 mt-4">
                  {prevPost.readTime} • {prevPost.category}
                </span>
              </Link>
            ) : (
              <div className="p-6 rounded-2xl bg-[#0D0F17]/40 border border-brand-gray/30 opacity-40 flex items-center justify-center text-xs font-mono text-gray-500">
                You are reading the first article
              </div>
            )}

            {nextPost ? (
              <Link
                href={`/blog/${nextPost.id}`}
                className="group p-6 rounded-2xl bg-[#0D0F17] border border-brand-gray hover:border-brand-yellow transition-all flex flex-col justify-between text-right md:text-right"
              >
                <div className="flex items-center justify-end gap-2 text-[9px] font-press-start uppercase text-gray-500 mb-3 group-hover:text-brand-yellow transition-colors">
                  Next Article
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
                <h5 className="text-sm font-bold text-white group-hover:text-brand-yellow transition-colors line-clamp-2">
                  {nextPost.title}
                </h5>
                <span className="text-[10px] font-mono text-gray-500 mt-4">
                  {nextPost.readTime} • {nextPost.category}
                </span>
              </Link>
            ) : (
              <div className="p-6 rounded-2xl bg-[#0D0F17]/40 border border-brand-gray/30 opacity-40 flex items-center justify-center text-xs font-mono text-gray-500">
                You are reading the latest article
              </div>
            )}
          </div>

          {/* Related Articles Section */}
          <section className="mb-24">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-brand-gray/80">
              <div>
                <h3 className="text-lg md:text-xl font-press-start text-white mb-2">
                  Related <span className="text-brand-yellow">Articles</span>
                </h3>
                <p className="text-xs font-mono text-gray-400">
                  Recommended reads from the GitRabbit engineering archives
                </p>
              </div>
              <Link
                href="/blog"
                className="text-[9px] font-press-start uppercase text-brand-yellow hover:underline flex items-center gap-1.5"
              >
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.id}`}
                  className="group flex flex-col bg-[#0C0E14] border border-brand-gray rounded-2xl overflow-hidden hover:border-brand-yellow transition-all"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-100"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-brand-black/90 border border-brand-gray text-brand-yellow px-2 py-0.5 text-[7px] font-press-start uppercase">
                        {related.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-gray-500 text-[9px] uppercase font-mono tracking-wider mb-3">
                      <span>{related.date}</span>
                      <span>•</span>
                      <span>{related.readTime}</span>
                    </div>

                    <h4 className="text-white font-bold text-xs mb-3 group-hover:text-brand-yellow transition-colors line-clamp-2 leading-relaxed">
                      {related.title}
                    </h4>

                    <p className="text-gray-400 text-xs line-clamp-2 mb-4 flex-1">
                      {related.excerpt}
                    </p>

                    <span className="text-[8px] font-press-start text-brand-yellow uppercase flex items-center gap-1">
                      Read Article <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
