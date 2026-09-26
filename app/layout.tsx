import type { Metadata } from "next";
import { Inter, Space_Mono, Pixelify_Sans, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { PageLoader } from "@/components/PageLoader";
import { BackendRequiredProvider } from "@/context/BackendRequiredContext";
import { ProgressBarProvider } from "@/components/YouTubeProgressBar";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://gitrabbit.com"),
  title: "gitrabbit - AI Code Reviews",
  description: "AI-powered code review SaaS tool.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('gitrabbit-theme') || 'dark';
                  if (savedTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${spaceMono.variable} ${pixelifySans.variable} ${pressStart2P.variable} antialiased relative min-h-screen bg-brand-black text-brand-white selection:bg-brand-yellow selection:text-black`}
      >
        <ThemeProvider>
          <BackendRequiredProvider>
            <ProgressBarProvider>
              <PageLoader />
              {children}
            </ProgressBarProvider>
          </BackendRequiredProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

