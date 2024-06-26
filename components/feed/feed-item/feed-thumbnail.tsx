"use client";

import Logo from "components/icons/logo";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

type FeedThumbnailProps = {
  thumbnail: Nullable<string>;
  title: string;
};

const FeedThumbnail = ({ thumbnail, title }: FeedThumbnailProps) => {
  const [isError, setIsError] = useState(false);

  const src = isError || !thumbnail ? null : thumbnail;

  useEffect(() => {
    document.getElementById("hovering")?.addEventListener("mouseenter", () => {
      document.getElementById("target")?.classList.add("glow");
    });
    document.getElementById("hovering")?.addEventListener("mouseleave", () => {
      document.getElementById("target")?.classList.remove("glow");
    });
  }, []);

  return (
    <div id="hovering" className="relative w-[310px] h-[180px]">
      {src !== null ? (
        <Image
          className="rounded-[10px] object-cover"
          src={src}
          alt={`Thumbnail for ${title}`}
          width={310}
          height={180}
          onError={() => {
            setIsError(true);
          }}
          unoptimized
        />
      ) : (
        <BlackBox className="rounded-[10px] text-3xl bg-black w-[310px] h-[180px] text-white text-wrap font-bold p-[10px]">
          {title}
        </BlackBox>
      )}
      <div className="absolute -bottom-8 right-[66px] tra w-16 h-16 rounded-full bg-background flex center">
        <div
          id="target"
          className="w-[46px] h-[46px] flex center rounded-full bg-[#050514]"
        >
          <div
            className="star"
            style={{ top: "45%", left: "30%", animationDelay: "0.3s" }}
          ></div>
          <div
            className="star"
            style={{ top: "70%", left: "50%", animationDelay: "0.5s" }}
          ></div>
          <div
            className="star"
            style={{ top: "60%", left: "63%", animationDelay: "0.8s" }}
          ></div>
          <div
            className="star"
            style={{ top: "25%", left: "55%", animationDelay: "0.4s" }}
          ></div>
          <div
            className="star"
            style={{ top: "70%", left: "30%", animationDelay: "0.2s" }}
          ></div>
          <div
            className="star"
            style={{ top: "45%", left: "70%", animationDelay: "0.4s" }}
          ></div>
          <Logo width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

export default FeedThumbnail;

const BlackBox = styled.div`
  border-radius: 10px;
  font-size: 28px;
  background-color: black;
  width: 310px;
  height: 180px;
  color: white;
  white-space: wrap;
  font-weight: bold;
  padding: 10px;
  display: flex;
  overflow: scroll;
  scrollbar-width: none;
  scrollbar-color: transparent transparent;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  box-shadow: 0 0 2px 1px #93ebff;

  // &.glow {
  //   box-shadow: 0 0 2px 1px #ff00ff;
  // }

  // @keyframes glow {
  //   0% {
  //     box-shadow: 0 0 2px 1px #ff00ff;
  //   }
  //   50% {
  //     box-shadow: 0 0 2px 2px #ff00ff;
  //   }
  //   100% {
  //     box-shadow: 0 0 2px 1px #ff00ff;
  //   }
  // }

  // animation: glow 1s infinite;
`;
