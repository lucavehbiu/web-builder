import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import FooterEnhanced from "@/components/ui/footer-enhanced";
import { type Locale } from '@/lib/i18n/config'
// import { getDictionary } from '@/lib/i18n/get-dictionary'

export const runtime = 'edge'

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter"
});


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const isAlbanian = locale === 'sq'

  return {
    title: isAlbanian
      ? "Faqe Profesionale €49.9/Muaj - Pa Kosto Instalimi | Luca Web Design"
      : "Professional Websites €49.9/Month - No Setup Fees | Luca Web Design Albania",
    description: isAlbanian
      ? "Faqe profesionale për biznesin tuaj. €49.9/muaj gjithëpërfshirëse - pa kosto instalimi, pa tarifa të fshehura. Domain, hosting, SSL të përfshira. 3 ditë garanci kthimi."
      : "Get your business online with professional websites. €49.9/month all-inclusive - no setup costs, no hidden fees. Domain, hosting, SSL included. 3-day money back guarantee.",
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    manifest: '/site.webmanifest',
    keywords: isAlbanian
      ? ["faqe pa kosto instalimi", "web design tirane", "€49.9 faqe biznesi", "ndertim faqesh shqiperi", "dizajn faqesh gjithëpërfshirëse", "faqe biznesi tirane", "faqe profesionale pa pagese fillestare", "ndertim faqesh me cmim fiks", "faqe interneti shqiperi"]
      : ["no setup fee website", "all inclusive web design albania", "€49.9 website albania", "tirana web developer", "small business website albania", "website design albania", "web developer tirana", "affordable website albanian business", "professional website no upfront cost"],
    authors: [{ name: "Luca" }],
    creator: "Luca",
    publisher: "Luca",
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
      url: "https://lucavehbiu.com",
      siteName: "Luca",
      title: isAlbanian
        ? "€49.9/Muaj Gjithëpërfshirëse - Pa Kosto Instalimi | Luca Web Design"
        : "€49.9/Month All-Inclusive - No Setup Fees | Luca Web Design Albania",
      description: isAlbanian
        ? "€49.9/muaj përfshin gjithçka - domain, hosting, SSL, përditësime. Zero kosto instalimi. Kurse €2000+ krahasuar me agjencitë. 3 ditë garanci."
        : "€49.9/month includes everything - domain, hosting, SSL, updates. Zero setup costs. Save €2000+ vs agencies. 3-day guarantee.",
    },
    twitter: {
      card: "summary_large_image", 
      title: isAlbanian
        ? "€49.9/Muaj - Pa Kosto Instalimi | Luca Web Design"
        : "€49.9/Month - No Setup Fees | Luca Web Design Albania",
      description: isAlbanian
        ? "Faqe profesionale €49.9/muaj gjithëpërfshirëse. Zero kosto instalimi. Kurse €2000+. 3 ditë garanci."
        : "Professional websites €49.9/month all-inclusive. Zero setup costs. Save €2000+. 3-day guarantee.",
      creator: "@lucavehbiu",
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
    <html lang={locale} className="h-full" style={{overscrollBehavior: 'none'}}>
      <body className={`${inter.className} ${inter.variable} h-full flex flex-col`} style={{overscrollBehavior: 'none'}}>
        <div className="flex-grow">
          {children}
        </div>
        <FooterEnhanced />
      </body>
    </html>
  );
}