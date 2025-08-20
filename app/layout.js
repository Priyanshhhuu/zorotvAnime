import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import Script from "next/script";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Zoro Anime - Anime Database & Information",
    template: "%s ",
  },
  description:
    "Explore anime details, characters, statistics, reviews, genres, and trailers. Stay updated with trending and upcoming anime on Zoro Anime.",
  icons: {
    icon: "/zoro.png",
    shortcut: "/zoro.png",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "watch anime",
    "anime online",
    "anime website",
    "anime watch",
    "h anime",
    "watch anime free online",
    "overflow uncensored",
    "aniwatch",
    "anime free",
    "animeplay",
    "anime",
    "watch anime online",
    "Zoro anime",
    "free anime",
    "subbed anime",
    "dubbed anime",
    "HD anime streaming",
    "hianimez ",
    "iconmyanimelist",
    "iconmangadex",
    "9anime",
    "iconmangafire",
    "Zoro anime",
    "watch anime online",
    "free anime streaming",
    "anime alternatives",
    "watch sub anime",
    "anime like hianime",
    "anime watch website",
    "watching anime now",
    "anime latest season",
    "coming soon anime",
    "anime soon",
    "seasonal anime",
    "watch anime seasons",
    "anime new episodes",
  ],
  authors: [{ name: "Priyanshu Singh", url: "https://zorotv.run" }],
  creator: "Zoro Anime Team",
  metadataBase: new URL("https://zorotv.run"),
  other: {
    monetag: "f3cada8d88f7505a769ef0c04d8c6bcc",
    "google-site-verification": "RGMYUNePG1M4ONIqsg-o9HTXtgXC2PgghofwwGhXaEE",
  },
  openGraph: {
    title: "Zoro Anime - Stream Anime Free in HD",
    description:
      "Watch high-quality anime with English subs and dubs. Updated daily. No ads.",
    url: "https://zorotv.run",
    siteName: "Zoro Anime",
    images: [
      {
        url: "https://zorotv.run/zoro.png",
        width: 1200,
        height: 630,
        alt: "Zoro Anime - Anime Database & Info",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zoro Anime - Anime Database & Info",
    description:
      "Explore anime details, characters, statistics, reviews, genres, and trailers.",
    site: "@zoroanime",
    creator: "@zoroanime",
    images: ["https://zorotv.run/og-banner.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* <script
          src="https://fpyf8.com/88/tag.min.js"
          data-zone="159064"
          async
          data-cfasync="false"
        ></script> */}
        <Script
          id="site-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Zoro Anime",
            url: "https://zorotv.run",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://zorotv.run/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-10EYB3PYN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-10EYB3PYNL');
          `}
        </Script>
      </head>
      <body className="bg-black text-white">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
