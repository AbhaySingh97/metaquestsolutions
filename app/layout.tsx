import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "MetaQuest Solutions | Advanced Research & Real-Time Tech Workshops",
  description:
    "Live, hands-on masterclasses in Artificial Intelligence, Edge IoT, Embedded Systems, Computer Vision, and Patent Novelty Formulation.",
  keywords: [
    "AI workshops",
    "Edge IoT workshops",
    "Computer Vision Masterclass",
    "Patent Novelty Drafting",
    "Embedded Systems Engineering",
    "MetaQuest Solutions",
  ],
  authors: [{ name: "MetaQuest Solutions" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0B0F19] text-gray-100 min-h-screen antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
