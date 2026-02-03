import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import StarfieldCanvas from "@/components/starFieldCanvas";
import Footer from "@/components/footer";
import ProgressLoader, { ClientWorks } from "./fucking-client"
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Preloader from "@/components/Preloader";

const OutfitFont = Outfit({
  variable: "--font-outfit",
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
        className={`${OutfitFont.variable} antialiased dark`}
      >
        <ProgressLoader color="#ffffff" showSpinner={false} />
        <ClientWorks />
        <Preloader />
        <Toaster richColors position="top-center" />
        <Navbar />
        <StarfieldCanvas />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
