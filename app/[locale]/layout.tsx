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
      ? "Luca - Faqe Profesionale për Bizneset e Vogla"
      : "Luca - Bringing Your Business Into the Light",
    description: isAlbanian
      ? "Duke sjellë biznesin tuaj në dritë. Faqe profesionale që të bëjnë të dukshëm online. €49.9/muaj, gjithëpërfshirëse."
      : "Professional websites that make your business visible online. Bringing you into the light with €49.9/month all-inclusive service.",
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
      ? ["dizajn ueb", "biznes i vogël", "ndërtues faqesh", "faqe profesionale", "faqe shqip"]
      : ["web design", "small business", "website builder", "professional websites"],
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
        ? "Luca - Faqe Profesionale për Bizneset e Vogla"
        : "Luca - Bringing Your Business Into the Light",
      description: isAlbanian
        ? "Duke sjellë biznesin tuaj në dritë. Faqe profesionale që të bëjnë të dukshëm online."
        : "Professional websites that make your business visible online. Bringing you into the light.",
    },
    twitter: {
      card: "summary_large_image",
      title: isAlbanian
        ? "Luca - Faqe Profesionale për Bizneset e Vogla"
        : "Luca - Bringing Your Business Into the Light",
      description: isAlbanian
        ? "Duke sjellë biznesin tuaj në dritë. Faqe profesionale që të bëjnë të dukshëm online."
        : "Professional websites that make your business visible online. Bringing you into the light.",
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