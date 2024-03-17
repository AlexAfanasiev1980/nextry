import type { Metadata } from "next";
import "@/styles/globals.scss";
import "@/styles/mixins.scss";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Nextry",
  description: "AI-POWERED photo generation made easy",
  metadataBase: new URL('https://nextry.app/'),
  openGraph: {
    title: 'Nextry',
    description: 'AI-POWERED photo generation made easy',
    url: 'https://nextry.app/',
    siteName: 'Nextry',
    locale: 'en_US',
    type: 'website',
  },
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
        <Script src="//yastatic.net/share2/share.js" charSet="utf-8"></Script>
      </body>
    </html>
  );
}
