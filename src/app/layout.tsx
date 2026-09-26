import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE, SITE_KEYWORDS, SITE_URL, OG_IMAGE, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const TITLE_TEMPLATE = `%s | ${SITE.name}`;

export const metadata: Metadata = {
  // Required for any URL-based metadata field; every route derives its
  // canonical, Open Graph and Twitter URLs from this origin.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: TITLE_TEMPLATE,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [...SITE_KEYWORDS],
  authors: [{ name: SITE.organization, url: siteUrl("/") }],
  creator: SITE.organization,
  publisher: SITE.organization,
  category: "education",
  manifest: "/manifest.webmanifest",
  icons: {
    // favicon.ico is emitted automatically by the src/app/favicon.ico file
    // convention, so it is not repeated here.
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: siteUrl("/"),
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: siteUrl("/"),
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: OG_IMAGE.url,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: OG_IMAGE.twitterUrl,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: SITE.shortName,
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
