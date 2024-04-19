import "ui/globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "../../styles/globals.css";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import { Toaster } from "ui";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Track My Care",
  description:
    "Access Your Health Records Anywhere, Anytime with Track My Care!",
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({
  children,
  params: { lng },
}: Readonly<{
  children: React.ReactNode;
  params: any;
}>) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={plusJakartaSans.className}>
        {children}
        <Toaster expand={true} richColors />
      </body>
    </html>
  );
}
