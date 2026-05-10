import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "KONI — Японский с нуля",
  description: "От первой каны до первого аниме без субтитров.",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#E85D75",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover", // обязательно для env(safe-area-inset-*) под notch на iOS
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
