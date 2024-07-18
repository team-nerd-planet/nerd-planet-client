"use client";

import Invisible from "@components/invisible";
import ScrollArea from "@components/scroll-area";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HomeSearchParamsKeys } from "@/params/home";
import { useEffect, useState } from "react";
import { type Feed } from "@services/feed/types";
import FeedItem from "../feed-item";
import { FeedItemSkeleton } from "../feed-item/feed-item";

type FeedsClientProps = {
  feeds: Feed[];
  page: number;
  totalPage: number;
};

const FeedsClient = ({
  feeds: fetchedFeeds,
  page,
  totalPage,
}: FeedsClientProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [feeds, setFeeds] = useState(fetchedFeeds);

  const isEndPage = totalPage <= page;

  const onScrollEnd = async () => {
    if (feeds.length === 0 || isEndPage) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    const key = HomeSearchParamsKeys.page;

    params.set(key, String(page + 1));
    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    if (page <= 1) {
      return;
    }
    setFeeds((prevFeeds) => {
      return [...prevFeeds, ...fetchedFeeds];
    });
  }, [fetchedFeeds, page]);

  return (
    <ScrollArea
      className="grid tablet:grid-cols-2 wideTablet:grid-cols-3 laptop:grid-cols-3 gap-[10px] laptop:gap-[20px] justify-center"
      containerClassName="stack flex-1"
      onScrollEnd={onScrollEnd}
      ScrollEndPlaceholder={
        <span className="flex center italic h-16">
          {isEndPage ? "마지막 글이에요 🛸" : "좀 더 불러오고 있어요 🚀"}
        </span>
      }
    >
      {feeds.map((feed) => {
        return (
          <div
            key={feed.id}
            className="w-full h-full flex justify-center items-center"
          >
            <Invisible as="li" className="w-[333px] h-[368px]">
              <FeedItem
                link={feed.link}
                thumbnail={feed.thumbnail}
                title={feed.title}
                company={feed.company.title}
                companyLink={feed.company.link}
                writer={feed.company.name}
                published={feed.published}
              />
            </Invisible>
          </div>
        );
      })}
    </ScrollArea>
  );
};

export default FeedsClient;

export const FeedsSkeleton = () => {
  return (
    <ScrollArea className="grid grid-cols-1 tablet:grid-cols-2 wideTablet:grid-cols-3 laptop:grid-cols-3 gap-[10px] laptop:gap-[20px]">
      {[...Array(20)].map((_, index) => {
        return <FeedItemSkeleton key={index} />;
      })}
    </ScrollArea>
  );
};
