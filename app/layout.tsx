import Navbar from "components/layout/navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { type ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nerd Planet",
  description:
    "매일 아침 새로운 글을 뉴스레터로 받아보세요. 내가 원하는 카테고리만 입력하면 끝! 매일 아침 너드플래닛이 따끈따끈한 글을 보내드릴게요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Navbar />
        <main className=" w-full min-h-[calc(100vh-var(--header-height))] bg-[#1C1C20]">
          <div className="max-w-screen-laptop mx-auto px-4">{children}</div>
        </main>
      </body>
    </html>
  );
}
