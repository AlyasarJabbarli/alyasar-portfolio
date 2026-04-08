import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import MagneticDock from "@/components/ui/MagneticDock";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AIChat from "@/components/ai/AIChat";

const siteUrl = "https://alyasar.netlify.app";
const siteTitle = "Alyasar Jabbarli | Full-Stack Engineer for High-Performance Web & AI";
const siteDescription =
  "Alyasar Jabbarli builds high-performance web products that combine modern frontend architecture, type-safe systems, and applied AI/data science.";
const socialLinks = [
  "https://github.com/AlyasarJabbarli",
  "https://www.linkedin.com/in/alyasar-jabbarli-813060215/",
];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Alyasar Jabbarli",
  },
  description: siteDescription,
  applicationName: "Alyasar Jabbarli Portfolio",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Alyasar Jabbarli",
    "Full-Stack Engineer",
    "Frontend Engineer",
    "AI Engineer",
    "Data Scientist",
    "Next.js",
    "React",
    "TypeScript",
    "Budapest",
  ],
  authors: [{ name: "Alyasar Jabbarli", url: siteUrl }],
  creator: "Alyasar Jabbarli",
  publisher: "Alyasar Jabbarli",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/icon.png", sizes: "512x512" }],
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Alyasar Jabbarli Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Alyasar Jabbarli portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@AlyasarJabbarli",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Alyasar Jabbarli",
      url: siteUrl,
      jobTitle: "Full-Stack Engineer",
      description: siteDescription,
      homeLocation: {
        "@type": "Place",
        name: "Budapest, Hungary",
      },
      sameAs: socialLinks,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Alyasar Jabbarli Portfolio",
      description: siteDescription,
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      inLanguage: "en",
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile-page`,
      url: siteUrl,
      name: siteTitle,
      description: siteDescription,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--color-obsidian)] text-[var(--color-snow)]`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
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
