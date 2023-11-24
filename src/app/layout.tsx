import type { Metadata } from "next";
import "@/styles/globals.scss";
import "@/styles/mixins.scss";

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
        {children}
      </body>
    </html>
  );
}
