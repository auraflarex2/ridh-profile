import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AuraMind — AI Accountability",
  description: "Turn goals into plans, track every hour, understand distractions and improve every week."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
