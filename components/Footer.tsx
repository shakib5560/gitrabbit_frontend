import Link from "next/link";
import { Rss } from "lucide-react";

const footerLinks = {
  products: [
    "Agent",
    "Pull Request Reviews",
    "IDE Reviews",
    "CLI Reviews",
    "Plan",
    "OSS",
  ],
  navigation: [
    "About Us",
    "Features",
    "Pricing",
    "Changelog",
    "Log in",
    "Start Free",
    "System Status",
  ],
  resources: [
    "Blog",
    "Docs",
    "Changelog",
    "Case Studies",
    "Trust Center",
    "Brand Guidelines",
    "Reports & Guides",
  ],
  contact: ["Support", "Sales", "Pricing", "Partnerships"],
};

export const Footer = () => {
  return (
    <footer className="bg-brand-black pt-20 pb-8 px-6 md:px-16 border-t border-brand-gray overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Logo Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block group">
              <div className="">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="gitrabbit" className="w-20 h-20" />
              </div>
            </Link>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="flex flex-col gap-6">
              <h3 className="font-pixelify text-brand-yellow text-sm uppercase tracking-wider font-bold">Products</h3>
              <ul className="flex flex-col gap-3">
                {footerLinks.products.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-brand-muted hover:text-brand-white text-sm transition-colors duration-200">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="font-pixelify text-brand-yellow text-sm uppercase tracking-wider font-bold">Navigation</h3>
              <ul className="flex flex-col gap-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link}>
                    <Link 
                      href={
                        link === "Log in" ? "/login" : 
                        link === "Start Free" ? "/signup" : 
                        link === "Pricing" ? "/pricing" :
                        link === "Changelog" ? "/changelog" :
                        link === "Features" ? "/#features" :
                        "#"
                      } 
                      className="text-brand-muted hover:text-brand-white text-sm transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="font-pixelify text-brand-yellow text-sm uppercase tracking-wider font-bold">Resources</h3>
              <ul className="flex flex-col gap-3">
                {footerLinks.resources.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-brand-muted hover:text-brand-white text-sm transition-colors duration-200">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="font-pixelify text-brand-yellow text-sm uppercase tracking-wider font-bold">Contact</h3>
              <ul className="flex flex-col gap-3">
                {footerLinks.contact.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-brand-muted hover:text-brand-white text-sm transition-colors duration-200">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Subscription Section */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="relative">
              <div className="flex items-center border border-brand-gray bg-brand-dark p-1 focus-within:border-brand-yellow transition-colors group">
                <input
                  type="email"
                  placeholder="youremail@domain.com"
                  className="bg-transparent border-none outline-none flex-grow px-4 py-2 text-sm text-brand-white placeholder:text-brand-muted font-mono"
                />
                <button className="bg-brand-yellow text-brand-black px-4 py-2 text-[9px] md:text-[10px] font-press-start uppercase hover:brightness-110 transition-all shadow-[2px_2px_0px_#FFFFFF]">
                  Subscribe
                </button>
              </div>
              <p className="mt-4 text-[10px] text-brand-muted leading-relaxed">
                By signing up you agree to our <Link href="#" className="text-brand-yellow hover:underline">Terms of Use</Link> and <Link href="#" className="text-brand-yellow hover:underline">Privacy Policy</Link>
              </p>
            </div>

            <div className="flex items-center gap-6">
              {/* Discord */}
              <Link href="#" className="text-brand-muted hover:text-brand-yellow transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.947 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.086 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z" /></svg>
              </Link>
              {/* X (Twitter) */}
              <Link href="#" className="text-brand-muted hover:text-brand-yellow transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" /></svg>
              </Link>
              {/* LinkedIn */}
              <Link href="#" className="text-brand-muted hover:text-brand-yellow transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
              </Link>
              {/* GitHub */}
              <Link href="#" className="text-brand-muted hover:text-brand-yellow transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
              </Link>
              {/* RSS */}
              <Link href="#" className="text-brand-muted hover:text-brand-yellow transition-colors">
                <Rss className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Large Background Text */}
        <div className="relative w-full overflow-hidden select-none pointer-events-none mb-12">
          <h2 className="text-[3vw] md:text-[7.75vw] font-press-start font-bold leading-none tracking-tighter text-transparent"
            style={{ WebkitTextStroke: "1px rgba(245, 197, 24, 0.2)" }}>
            gitrabbit
          </h2>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-brand-gray pt-8 text-[11px] text-brand-muted uppercase tracking-widest font-mono">
          <div className="flex items-center gap-8">
            <Link href="#" className="hover:text-brand-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-brand-white transition-colors">Privacy Policy</Link>
            <span>gitrabbit Inc &copy; {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-brand-white transition-colors">
            <span>English</span>
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" /></svg>
          </div>
        </div>
      </div>
    </footer>
  );
};
