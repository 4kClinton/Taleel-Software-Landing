import { Cinzel, Monsieur_La_Doulaise, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const monsieur = Monsieur_La_Doulaise({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Taleel Software — Ready systems. Serious engineering. Built in Nairobi.",
  description:
    "Taleel Software builds production software for companies in Kenya — ready-to-deploy rental property management, AI conversational vision, and AI agents that automate and optimize business operations.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${monsieur.variable} ${cormorant.variable}`}>
        {children}
      </body>
    </html>
  );
}
