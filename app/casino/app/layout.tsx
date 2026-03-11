import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Casino Royale - Eternal Return",
  description: "Eternal Return Season Launch Event",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
