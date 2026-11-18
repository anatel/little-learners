import type { Metadata, Viewport } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";

// Fredoka: round, chunky, playful, with Hebrew support.
// next/font downloads the font at build time and serves it from our own
// server, so the browser never calls Google directly.
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["hebrew", "latin"],
});

export const metadata: Metadata = {
  title: "למדנים קטנים",
  description: "משחק לימוד אותיות לגיל הרך",
};

// Prevent accidental pinch-zoom on tablets; the UI is already large.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="he" dir="rtl" className={fredoka.variable}>
      <body>{children}</body>
    </html>
  );
}
