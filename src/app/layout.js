import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import BackToTop from "./dashboard/components/shared/BackToTop";
// import { ThemeProvider } from "@/components/contexts/ThemeContext";
import ClientLayoutWrapper from "./LayoutWrapper/ClientLayoutWrapper.jsx"; 
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata = {
  title: "TicketHub",
  description: "Online Ticket Booking System",
  icons: { icon: "/assets/logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        {/* Wrap only the client-side providers */}
        <ThemeProvider>
          <Providers>
            <Navbar />
            {children}
            <Toaster position="top-right" />
            <Footer />
            <BackToTop />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
