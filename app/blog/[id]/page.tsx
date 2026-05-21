import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";

const postData = {
  title: "How AI is Revolutionizing Code Reviews",
  category: "Engineering",
  date: "May 12, 2026",
  readTime: "5 min read",
  author: {
    name: "Rabbit_Alpha",
    role: "AI Ethics Lead",
    avatar: "/icon.png"
  },
  image: "/hero_image.png",
  content: `
    <p>Code reviews have long been the bottleneck of modern software development. While essential for maintaining quality, the manual process of human-to-human review often leads to delays, fatigue-induced errors, and inconsistent feedback.</p>
    
    <h2 class="text-white font-press-start text-sm md:text-base uppercase mt-12 mb-6">The Rise of Contextual Intelligence</h2>
    <p>Unlike traditional static analysis tools that look for rigid patterns, the new generation of AI-powered reviewers (like GitRabbit) understands the <strong>intent</strong> behind the code. By analyzing the entire repository context, they can identify logical flaws that simple linters would miss.</p>
    
    <blockquote class="my-12 border-l-4 border-brand-yellow pl-8 py-6 bg-brand-yellow/5 text-white italic">
      "The goal isn't to replace human reviewers, but to augment them—catching the trivial errors so humans can focus on architecture and complex logic."
    </blockquote>
    
    <h2 class="text-white font-press-start text-sm md:text-base uppercase mt-12 mb-6">Autonomous Issue Resolution</h2>
    <p>We're moving beyond simple comments. The next phase involves AI agents that not only find problems but also propose and even implement fixes that developers can approve with a single click. This drastically reduces the 'context switching' tax that developers pay every day.</p>
    
    <ul class="list-none space-y-4 my-8">
      <li class="relative pl-6 before:content-['→'] before:absolute before:left-0 before:text-brand-yellow before:font-press-start before:text-[10px]">Reduced review turnaround by up to 40%</li>
      <li class="relative pl-6 before:content-['→'] before:absolute before:left-0 before:text-brand-yellow before:font-press-start before:text-[10px]">Higher consistency across distributed teams</li>
      <li class="relative pl-6 before:content-['→'] before:absolute before:left-0 before:text-brand-yellow before:font-press-start before:text-[10px]">Automatic documentation of architectural decisions</li>
    </ul>
    
    <p>As we continue to train these models on billions of lines of high-quality code, the line between 'tool' and 'collaborator' will continue to blur. The future of engineering isn't just about writing code; it's about managing the intelligence that writes it with you.</p>
  `
};

export default async function ArticlePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  return (
    <main className="min-h-screen bg-brand-black selection:bg-brand-yellow selection:text-black">
      <Navbar />
      
      <div className="pt-40 pb-24 px-6 md:px-16">
        <article className="max-w-4xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-yellow transition-colors font-press-start text-[8px] uppercase mb-12 group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Back to Blog
          </Link>

          <div className="mb-12">
            <span className="bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow px-3 py-1 text-[8px] font-press-start uppercase mb-6 inline-block">
              {postData.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-press-start leading-tight text-brand-white mb-8">
              {postData.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 py-6 border-y border-brand-gray text-[10px] font-mono uppercase tracking-widest text-gray-500">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-gray border border-brand-yellow/30 flex items-center justify-center overflow-hidden">
                  <Image src={postData.author.avatar} alt="author" width={20} height={20} />
                </div>
                <span className="text-brand-white font-press-start text-[8px]">{postData.author.name}</span>
              </div>
              <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {postData.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {postData.readTime}</span>
            </div>
          </div>

          <div className="relative aspect-video rounded-3xl overflow-hidden border border-brand-gray mb-16 shadow-[0_0_50px_rgba(245,197,24,0.05)]">
            <Image src={postData.image} alt="Featured" fill className="object-cover" />
          </div>

          <div className="max-w-3xl mx-auto">
            <div 
              className="text-gray-300 leading-relaxed text-lg font-sans space-y-8 article-content"
              dangerouslySetInnerHTML={{ __html: postData.content }}
            />

            <div className="mt-20 pt-10 border-t border-brand-gray flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-xl bg-brand-gray hover:bg-brand-yellow hover:text-brand-black flex items-center justify-center transition-all">
                  {/* Twitter (X) SVG */}
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
                </button>
                <button className="w-10 h-10 rounded-xl bg-brand-gray hover:bg-brand-yellow hover:text-brand-black flex items-center justify-center transition-all">
                  {/* LinkedIn SVG */}
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
                </button>
                <button className="w-10 h-10 rounded-xl bg-brand-gray hover:bg-brand-yellow hover:text-brand-black flex items-center justify-center transition-all">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-2">
                {["AI", "CodeReview", "NextGen"].map(tag => (
                  <span key={tag} className="text-[8px] font-mono border border-brand-gray px-2 py-1 text-gray-500 rounded uppercase">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}
