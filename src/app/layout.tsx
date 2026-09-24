import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SBV + APH | Guia de Emergência",
  description: "Orientação rápida para salvar vidas - Suporte Básico de Vida e Atendimento Pré-Hospitalar.",
  applicationName: "SBV + APH",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SBV + APH",
  },
  formatDetection: {
    telephone: true,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#070d1e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-theme="dark" className={`${inter.variable} h-full bg-[#070d1e]`}>
      <body className="h-full bg-[#070d1e] text-slate-100 antialiased selection:bg-red-500 selection:text-white font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
