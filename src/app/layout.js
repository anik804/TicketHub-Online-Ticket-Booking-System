import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import ClientLayoutWrapper from "./LayoutWrapper/ClientLayoutWrapper.jsx"; 

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
    <html lang="en" data-theme="light" className={roboto.variable}>
      <body>
        <Providers>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
