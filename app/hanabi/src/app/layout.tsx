import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const myFont = localFont({
  src: "../assets/moderniz/Moderniz.otf",
});

export const metadata: Metadata = {
  title: "Hanabi Cup",
  description: "Eternal Return Ladder Race",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>{children}</body>
    </html>
  );
}
