import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
export const metadata: Metadata = {
  title: { default: "Joy's Pastry | A little more joy in every bite", template: "%s | Joy's Pastry" },
  description: "Thoughtfully baked cakes, small chops and pastries for the moments worth celebrating.",
  icons: { icon: "/favicon.svg" },
  openGraph: { title: "Joy's Pastry", description: "A little more joy in every bite.", type: "website" }
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><CartProvider><Navbar/><main>{children}</main><Footer/></CartProvider></body></html>;
}
