import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FooterEnhanced from "@/components/ui/footer-enhanced";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebBuilder - Professional Websites for Small Businesses",
  description: "Professional websites for small businesses. $60/month, all-inclusive. Website creation, hosting, maintenance, and monthly updates.",
  keywords: ["web design", "small business", "website builder", "professional websites"],
  authors: [{ name: "WebBuilder" }],
  creator: "WebBuilder",
  publisher: "WebBuilder",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://webbuilder.com",
    siteName: "WebBuilder",
    title: "WebBuilder - Professional Websites for Small Businesses",
    description: "Professional websites for small businesses. $60/month, all-inclusive.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebBuilder - Professional Websites for Small Businesses",
    description: "Professional websites for small businesses. $60/month, all-inclusive.",
    creator: "@webbuilder",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full flex flex-col`}>
        <div className="flex-grow">
          {children}
        </div>
        <FooterEnhanced />
      </body>
    </html>
  );
}
