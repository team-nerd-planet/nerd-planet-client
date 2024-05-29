"use client";

import ScrollArea from "components/scroll-area";
import { useEffect, useState } from "react";
import { getFeeds } from "services/feed/queries";
import { type Feed } from "services/feed/types";
import FeedItem from "../feed-item";
import { FeedItemSkeleton } from "../feed-item/feed-item";

type FeedsClientProps = {
  feeds: Feed[];
  totalPage: number;
};

const FeedsClient = ({ feeds: initFeeds, totalPage }: FeedsClientProps) => {
  const [feeds, setFeeds] = useState(initFeeds);
  const [page, setPage] = useState(1);

  const isEndPage = totalPage <= page;

  const onScrollEnd = async () => {
    if (feeds.length === 0 || isEndPage) {
      return;
    }

    setPage(page + 1);
  };

  useEffect(() => {
    if (page <= 1) {
      return;
    }

    const fetchFeeds = async () => {
      const result = await getFeeds({
        page,
      });

      setFeeds((prevFeeds) => {
        return [...prevFeeds, ...result.feeds];
      });
    };

    fetchFeeds();
  }, [page]);

  return (
    <ScrollArea
      className="grid grid-cols-1 tablet:grid-cols-2 wideTablet:grid-cols-3 laptop:grid-cols-3 gap-[10px] laptop:gap-[20px]"
      onScrollEnd={onScrollEnd}
      ScrollEndPlaceholder={
        <span className="flex center italic h-16">
          {isEndPage ? "마지막 글이에요 🛸" : "좀 더 불러오고 있어요 🚀"}
        </span>
      }
    >
      {feeds.map((feed) => {
        return (
          <FeedItem
            key={feed.id}
            link={feed.link}
            thumbnail={feed.thumbnail}
            title={feed.title}
            company={feed.company.title}
            companyLink={feed.company.link}
            writer={feed.company.name}
            published={feed.published}
          />
        );
      })}
    </ScrollArea>
  );
};

export default FeedsClient;

export const FeedsSkeleton = () => {
  return (
    <ScrollArea className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-[10px] laptop:gap-[20px]">
      {[...Array(20)].map((_, index) => {
        return <FeedItemSkeleton key={index} />;
      })}
    </ScrollArea>
  );
};
