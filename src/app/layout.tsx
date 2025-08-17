import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Project Management Dashboard",
  description: "A comprehensive project management dashboard built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}