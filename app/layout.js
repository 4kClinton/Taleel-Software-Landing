import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
