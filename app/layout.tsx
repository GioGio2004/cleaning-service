// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Qimwmenda | Premium Cleaning — Tbilisi",
  description:
    "Tbilisi's premier deep cleaning service. Soft furniture, auto interiors, mattresses, post-renovation, pools & patios. Book via WhatsApp.",
  keywords:
    "cleaning service Tbilisi, deep cleaning Georgia, upholstery cleaning, mattress cleaning, premium cleaning",
  openGraph: {
    title: "Qimwmenda — Revive Your Space. Naturally.",
    description: "Tbilisi's premium organic cleaning service.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ka"
      suppressHydrationWarning
      className={`${inter.variable} ${cormorant.variable}`}
    >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
