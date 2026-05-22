import type { Metadata } from "next";
import { JetBrains_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import KonamiLogin from "@/components/admin/KonamiLogin";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alexislopez.dev"),
  title: "Alexis López — SSR Backend Engineer",
  description:
    "SSR Backend Engineer. Diseño y construyo sistemas web escalables con React, Node.js, .NET y SQL. Arquitectura, performance y código mantenible.",
  keywords: [
    "SSR Backend",
    "Software Engineer",
    "React",
    "Node.js",
    ".NET",
    "Arquitectura",
    "Portfolio",
  ],
  authors: [{ name: "Alexis López" }],
  openGraph: {
    title: "Alexis López — SSR Backend Engineer",
    description:
      "Portfolio de ingeniería: proyectos, stack y trayectoria construyendo software a escala.",
    type: "website",
    url: "https://alexislopez.dev",
    images: [{ url: "/FotoPerfil.png", width: 200, height: 200, alt: "Alexis López" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`h-full antialiased ${jetbrains.variable} ${pressStart.variable}`}>
      <body className="grid-bg scanlines min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <KonamiLogin />
      </body>
    </html>
  );
}
