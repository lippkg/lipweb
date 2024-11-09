export const runtime = "edge";

import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { Providers } from "./providers";
import { BasicNavbar } from "@/components/home/navbar";
import { FooterComponent } from "@/components/home/footer";
import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
  title: "Bedrinth",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head></head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased ",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <BasicNavbar />
            <main>{children}</main>
            <FooterComponent />
          </div>
        </Providers>
      </body>
    </html>
  );
}
