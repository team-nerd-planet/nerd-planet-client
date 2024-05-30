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

  const src = isError || !thumbnail ? "/images/feed-thumbnail.png" : thumbnail;

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
