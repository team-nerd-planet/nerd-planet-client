import { getFeeds } from "@services/feed/queries";
import type { CompanySize } from "@services/feed/types";
import FeedsClient from "./feeds-client";

type FeedsProps = {
  page: number;
  company?: string;
  companySizes?: CompanySize[];
  jobTagIds?: number[];
  skillTagIds?: number[];
};

const Feeds = async ({
  page,
  company,
  companySizes,
  jobTagIds,
  skillTagIds,
}: FeedsProps) => {
  const { feeds, totalPage } = await getFeeds({
    page,
    company,
    companySizes,
    jobTagIds,
    skillTagIds,
  });

  if (feeds.length === 0) {
    return <FeedsEmpty />;
  }

  return <FeedsClient feeds={feeds} page={page} totalPage={totalPage} />;
};

export default Feeds;

const FeedsEmpty = () => {
  return (
    <div className="flex flex-1 center w-full text-xl font-bold text-white py-[36px]">
      조건에 맞는 글이 없어요 😢
      <br />
      <br />
      다른 조건으로 다시 검색해보세요
    </div>
  );
};

export const FeedsErrorFallback = () => {
  return (
    <div className="flex flex-1 center text-xl font-bold text-white">
      글을 불러오는 중에 오류가 발생했어요 😢
      <br />
      <br />
      다시 시도해보세요
    </div>
  );
};
