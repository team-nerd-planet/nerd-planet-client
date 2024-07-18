"use client";

import Hamburger from "icons/hamburger.svg";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { pages } from "../constants";
import { useRouter } from "next/navigation";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        className="tablet:hidden cursor-pointer"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <Hamburger />
        <span className="sr-only table:hidden">메뉴 토글 버튼</span>
      </button>
      <nav
        className={cn(
          "tablet:hidden stack fixed top-[var(--header-height)] left-0 w-full h-[calc(100%-var(--header-height))] py-6 justify-between bg-[#26272b] z-mobileMenu transform transition-transform",
          isOpen
            ? "-translate-y-[0px]"
            : "-translate-y-[calc(100%+var(--header-height))]"
        )}
      >
        <div className="stack gap-2">
          {pages.map(({ name, link }) => {
            return (
              <div
                key={name}
                className="flex center h-12 hover:bg-[#1c1c20] font-semibold text-[#F8F9FE] cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  router.push(link);
                }}
              >
                {name}
              </div>
            );
          })}
        </div>
        <div className="mb-8 flex center">
          {footerMenus.map(({ name, link }) => {
            return (
              <div
                key={name}
                className="w-fit text-[11px] font-semibold text-[#F8F9FE] cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  router.replace("/policy/privacy");
                }}
              >
                {name}
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default MobileMenu;

const footerMenus = [
  {
    name: "개인정보처리방침",
    link: "/policy/privacy",
  },
];
