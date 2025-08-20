import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import FooterEnhanced from "@/components/ui/footer-enhanced";
import { i18n, type Locale } from '@/lib/i18n/config'
// import { getDictionary } from '@/lib/i18n/get-dictionary'

const inter = Inter({ subsets: ["latin"] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const isAlbanian = locale === 'sq'
  
  return {
    title: isAlbanian 
      ? "WebBuilder - Faqe Profesionale për Bizneset e Vogla"
      : "WebBuilder - Professional Websites for Small Businesses",
    description: isAlbanian
      ? "Faqe profesionale për biznese të vogla. 50€/muaj, gjithëpërfshirëse. Krijimi i faqes, hosting, mirëmbajtje dhe përditësime mujore."
      : "Professional websites for small businesses. $60/month, all-inclusive. Website creation, hosting, maintenance, and monthly updates.",
    keywords: isAlbanian
      ? ["dizajn ueb", "biznes i vogël", "ndërtues faqesh", "faqe profesionale", "faqe shqip"]
      : ["web design", "small business", "website builder", "professional websites"],
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
      locale: locale === 'sq' ? "sq_AL" : "en_US",
      url: "https://webbuilder.com",
      siteName: "WebBuilder",
      title: isAlbanian
        ? "WebBuilder - Faqe Profesionale për Bizneset e Vogla"
        : "WebBuilder - Professional Websites for Small Businesses",
      description: isAlbanian
        ? "Faqe profesionale për biznese të vogla. 50€/muaj, gjithëpërfshirëse."
        : "Professional websites for small businesses. $60/month, all-inclusive.",
    },
    twitter: {
      card: "summary_large_image",
      title: isAlbanian
        ? "WebBuilder - Faqe Profesionale për Bizneset e Vogla"
        : "WebBuilder - Professional Websites for Small Businesses",
      description: isAlbanian
        ? "Faqe profesionale për biznese të vogla. 50€/muaj, gjithëpërfshirëse."
        : "Professional websites for small businesses. $60/month, all-inclusive.",
      creator: "@webbuilder",
    },
    verification: {
      google: "google-site-verification-code",
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  // Dictionary will be used for footer translations later
  // const dictionary = await getDictionary(locale)

  return (
    <html lang={locale} className="h-full">
      <body className={`${inter.className} h-full flex flex-col`}>
        <div className="flex-grow">
          {children}
        </div>
        <FooterEnhanced />
      </body>
    </html>
  );
}