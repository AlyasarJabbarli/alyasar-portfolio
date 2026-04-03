import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import MagneticDock from "@/components/ui/MagneticDock";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AIChat from "@/components/ai/AIChat";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alyasar Jabbarli | Software Engineer & Data Engineer",
  description: "High-performance frontend architecture bridging the gap with machine learning and data science. Explore my technical ecosystem and shipped platforms.",
  keywords: ["Software Engineer", "Data Engineer", "Next.js", "React", "Machine Learning", "Budapest"],
  metadataBase: new URL("https://alyasar.netlify.app"),
  openGraph: {
    title: "Alyasar Jabbarli | Engineering Portfolio",
    description: "Bridging Frontend Architecture and Data Science.",
    url: "https://alyasar.netlify.app",
    siteName: "Alyasar Jabbarli Portfolio",
    images: [
      {
        url: "/og-image.jpg", // We will add this image in the next step
        width: 1200,
        height: 630,
        alt: "Alyasar Jabbarli Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alyasar Jabbarli | Software Engineer",
    description: "High-performance frontend architecture and data science.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--color-obsidian)] text-[var(--color-snow)]`}
      >
        <a
          href="#main"
          className="sr-only skip-to-main focus:not-sr-only"
        >
          Skip to main content
        </a>
        <ScrollProgress />
        <CustomCursor />
        {children}
        <MagneticDock />
        <AIChat />
      </body>
    </html>
  );
}