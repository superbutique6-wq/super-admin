import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import Script from 'next/script';

export const metadata: Metadata = {
  title: "PRERNA SILKS | World Class Boutique",
  description: "Exquisite handcrafted luxury wear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script 
          src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" 
          strategy="afterInteractive" 
        />
      </head>
      <body className="antialiased selection:bg-[#C5A1AD] selection:text-white">
        <CustomCursor />
        <div className="noise-overlay" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
