import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Lexend_Exa, Outfit } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const lexend = Lexend_Exa({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600"],
  variable: "--font-lexend",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sítio Rancho Alegre · 4 hectares em Porto Feliz — SP | Armangni Negócios Imobiliários",
  description:
    "Sítio à venda em Porto Feliz — SP: 40.000 m² com casa-sede, queijaria, capril, casa de caseiro e infraestrutura completa (poço artesiano, energia trifásica, fibra ótica). Acesso pelo km 97 da Castelo Branco.",
  openGraph: {
    title: "Sítio Rancho Alegre · Porto Feliz — SP",
    description: "40.000 m² de campo com 800 m² construídos e infraestrutura completa. Atendimento Armangni.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#17291f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${lexend.variable} ${outfit.variable} ${cormorant.variable}`}>
      <body>
        {children}
        <Toaster
          position="top-center"
          theme="dark"
          toastOptions={{
            style: {
              background: "#1e3428",
              border: "1px solid rgba(191,180,170,.35)",
              color: "#f2efeb",
              borderRadius: 2,
            },
          }}
        />
      </body>
    </html>
  );
}
