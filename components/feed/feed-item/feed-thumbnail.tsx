"use client";

import Logo from "components/icons/logo";
import Image from "next/image";
import { useState } from "react";

type FeedThumbnailProps = {
  thumbnail: Nullable<string>;
  title: string;
};

const FeedThumbnail = ({ thumbnail, title }: FeedThumbnailProps) => {
  const [isError, setIsError] = useState(false);

  const src = isError || !thumbnail ? "/images/feed-thumbnail.png" : thumbnail;

  return (
    <div className="relative w-[310px] h-[180px]">
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
        <div className="w-[46px] h-[46px] flex center border-[0.5px] border-border rounded-full">
          <Logo width={27} height={23} />
        </div>
      </div>
    </div>
  );
};

export default FeedThumbnail;
