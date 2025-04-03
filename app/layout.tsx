import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import StoreProvider from "./StoreProvider";

import "./globals.css";
import clsx from "clsx";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "TurkmenExpo",
  description: "",
  icons: "/assets/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <StoreProvider>
        <body className={clsx("antialiased font-roboto", roboto.variable)}>
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
