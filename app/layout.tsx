import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--ibm-plex-sans",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--jetbrains-mono",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--fraunces",
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "lifeos",
  description: "Personal life operating system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${jetBrainsMono.variable} ${fraunces.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
