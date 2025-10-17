// app/layout.jsx  (server component)
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import BackToTop from "./dashboard/components/shared/BackToTop";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "TicketHub",
  description: "Online Ticket Booking System",
  icons: {
    icon: "/assets/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className={roboto.variable}>
      <body>
        {/* Wrap only the client-side providers */}
        <Providers>
          <Navbar />
          {children}
          <Toaster position="top-right" />
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
