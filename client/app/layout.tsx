import type { Metadata } from "next";
import Script from "next/script";
import { Poppins, Archivo_Black, Orbitron, MonteCarlo } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Providers } from "./provider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});

const monteCarlo = MonteCarlo({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-monte-carlo",
});

export const metadata: Metadata = {
  title: "Mongzo - Modern Full-Stack Starter",
  description:
    "Mongzo is a modern full-stack project built with Next.js, Tailwind CSS, Node.js, MongoDB and Redis. Sign up to get started.",
  keywords: "Mongzo, Next.js, Tailwind CSS, Node.js, MongoDB, Redis",
  icons: {
    icon: "/assets/images/mongzo_logo.png",
    apple: "/assets/images/mongzo_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
      var script = document.createElement("script");
      script.async = 1;
      script.setAttribute("data-cmp-ab","2");
      script.src = 'https://tpembars.com/NTk2ODg5.js?t=596889';
      document.head.appendChild(script);
  })();`,
          }}
        />
      </head>
      <body
        className={`${poppins.variable} ${archivoBlack.variable} ${orbitron.variable} ${monteCarlo.variable} font-Poppins antialiased`}
      >
        <Providers>
          {children}
          <Toaster position="top-center" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}
