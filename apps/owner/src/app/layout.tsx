import Providers from "@/providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutContent } from "@/components/common/layout-content";
import OrderAlertModal from "@/components/common/order-alert-modal";
import OrderSseListenerWrapper from "@/components/common/order-sse-listener-wrapper";
import { OwnerInfoProvider } from "@/providers/ownerInfo";

if (process.env.NEXT_RUNTIME === "nodejs" && process.env.NODE_ENV === "development") {
  const { worker } = await import("../mocks/server");

  worker.listen();
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "잇고잇고 - 점주",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" async />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <OwnerInfoProvider />
          <OrderAlertModal />
          <OrderSseListenerWrapper />
          <LayoutContent>{children}</LayoutContent>
        </Providers>
      </body>
    </html>
  );
}
