import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./(auth)/_components/NextAuthProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Kanban",
  description: "Next.js Kanban board",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
