import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import StoreProvider from "./StoreProvider";

import "./globals.css";

// const roboto = Roboto({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "700"],
// });

export const metadata: Metadata = {
  title: "TurkmenExpo",
  description: "",
  icons: "/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <StoreProvider>
        <body className={``}>{children}</body>
      </StoreProvider>
    </html>
  );
}
