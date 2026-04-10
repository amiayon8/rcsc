import type { Metadata } from "next";
import { Outfit, Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "./nav";
import Footer from "@/components/footer";
import ProgressLoader, { ClientWorks } from "./fucking-client"
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Preloader from "@/components/Preloader";
import localFont from "next/font/local"

// Shurjo ANSI (for legacy encoding)
export const shurjoANSI = localFont({
  src: [
    {
      path: "./fonts/Shurjo-ANSI-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Shurjo-ANSI-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Shurjo-ANSI-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Shurjo-ANSI-Bold-Italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-shurjo-ansi",
  display: "swap",
})

// Shurjo Unicode (modern Bangla)
export const shurjoUnicode = localFont({
  src: [
    {
      path: "./fonts/Shurjo-UNICODE-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Shurjo-UNICODE-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-shurjo-unicode",
  display: "swap",
})

// Siyam Rupali (fallback / alternative)
export const siyamrupali = localFont({
  src: [
    {
      path: "./fonts/Siyamrupali.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-siyam",
  display: "swap",
})


const OutfitFont = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const GeistFont = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const SpaceGroteskFont = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});


const siteName = "Rajuk College Science Club (RCSC)";
const siteUrl = "https://www.rcscbd.org";
const defaultTitle = "Rajuk College Science Club";
const defaultDescription =
  "Rajuk College Science Club (RCSC) is a student-led organization dedicated to science, technology, innovation, research, and academic excellence at Rajuk Uttara Model College.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: [
    "Rajuk College Science Club",
    "RCSC",
    "Rajuk Uttara Model College",
    "Science Club Bangladesh",
    "Student Science Club",
    "STEM Club",
    "Science Olympiad",
    "Robotics and Research",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: siteUrl,
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rajuk College Science Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  category: "Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${shurjoANSI.variable} ${shurjoUnicode.variable} ${siyamrupali.variable} ${OutfitFont.variable} ${GeistFont.variable} ${SpaceGroteskFont.variable} antialiased dark`}
      >
        <ProgressLoader color="#ffffff" showSpinner={false} />
        <ClientWorks />
        <Preloader />
        <Toaster richColors position="top-center" />

        <Navbar />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
