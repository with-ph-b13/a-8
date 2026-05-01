import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "QurbaniHat | Bangladesh's #1 Livestock Booking Platform",
    template: "%s | QurbaniHat"
  },
  description: "Securely find and book healthy Qurbani animals in Bangladesh. Verified cows, goats, and premium breeds for a hassle-free Qurbani experience.",
  keywords: ["Qurbani", "Livestock", "Bangladesh", "Cow", "Goat", "Marketplace", "Booking"],
  authors: [{ name: "QurbaniHat Team" }],
  openGraph: {
    type: "website",
    locale: "en_BD",
    url: "https://qurbanihat-ej.vercel.app",
    siteName: "QurbaniHat",
    title: "QurbaniHat | Premium Qurbani Livestock Booking",
    description: "The most trusted platform to find healthy, verified Qurbani animals in Bangladesh. Browse cows and goats today.",
    images: [
      {
        url: "/img/animal_1.webp",
        width: 1200,
        height: 630,
        alt: "QurbaniHat Livestock",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "QurbaniHat | Premium Qurbani Livestock",
    description: "Find your perfect Qurbani animal with ease. Verified sellers, healthy livestock.",
    images: ["/img/animal_1.webp"],
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-gray-50">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} />
        </AuthProvider>
      </body>
    </html>
  );
}
