import type { Metadata } from "next";
import "@/styles/globals.scss";
import "@/styles/mixins.scss";
import Logo from "./Logo.png";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";

export const metadata: Metadata = {
  title: "Nextry",
  description: "AI-POWERED photo generation made easy",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
