import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

import { Providers } from "@/lib/i18n/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zyphora | Soluciones Tecnológicas Premium e IA",
  description: "Creamos software a medida, implementamos soluciones de IA y automatizamos procesos para ayudar a su negocio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased text-foreground bg-background min-h-screen flex flex-col`}>
        <Providers>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
