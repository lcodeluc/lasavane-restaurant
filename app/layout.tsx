import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "La Savane — Restaurant Deshaies, Guadeloupe",
  description:
    "Cuisine française & créole face à la baie de Deshaies. Réservez votre table au restaurant La Savane en Guadeloupe.",
  keywords: ["restaurant", "Deshaies", "Guadeloupe", "cuisine créole", "gastronomique", "brunch"],
  openGraph: {
    title: "La Savane — Restaurant Deshaies, Guadeloupe",
    description: "Cuisine française & créole face à la baie de Deshaies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-screen antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
