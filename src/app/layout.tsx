import "../styles/globals.css";
import { Permanent_Marker, Montserrat } from "next/font/google";

const display = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const body = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
