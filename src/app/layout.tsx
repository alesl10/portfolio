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
  title: "Alexis López — Senior Full-Stack Engineer",
  description:
    "Senior Full-Stack Engineer. Diseño y construyo sistemas web escalables con React, Node.js, .NET y SQL. Arquitectura, performance y código mantenible.",
  keywords: [
    "Senior Full-Stack",
    "Software Engineer",
    "React",
    "Node.js",
    ".NET",
    "Arquitectura",
    "Portfolio",
  ],
  authors: [{ name: "Alexis López" }],
  openGraph: {
    title: "Alexis López — Senior Full-Stack Engineer",
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
      <head>
        {/* Anti-flash: aplica data-theme antes del primer paint */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('portfolio-theme');if(t==='mario')document.documentElement.setAttribute('data-theme','mario')}catch(e){}` }} />
      </head>
      <body className="grid-bg scanlines min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <KonamiLogin />
      </body>
    </html>
  );
}
