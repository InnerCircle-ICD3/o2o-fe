import Providers from "@/providers";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/reset.css";
import { ToastMessage } from "@/components/common/toastMessage";
import classNames from "classnames";
import * as style from "./layout.css";

if (
  process.env.NEXT_RUNTIME === "nodejs" &&
  process.env.NEXT_PUBLIC_VERCEL_MSW_ENV === "development"
) {
  const { worker } = await import("../mocks/server");

  worker.listen();
}

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});
export const metadata: Metadata = {
  title: "잇고잇고",
  description: "잇고잇고와 함께 우리 동네 가게를 만나보세요!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={classNames(pretendard.variable, style.container)}>
        <Providers>
          <div className={style.main}>{children}</div>
          <div id="bottom-sheet" />
          <ToastMessage />
        </Providers>
      </body>
    </html>
  );
}
