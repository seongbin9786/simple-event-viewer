import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Event List Viewer",
  description: "Event List Viewer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
