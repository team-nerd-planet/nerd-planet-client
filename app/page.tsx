import Banner from "components/banner";
import FeedFilter from "components/feed/feed-filter";
import Feeds, {
  FeedsErrorFallback,
  FeedsSkeleton,
} from "components/feed/feeds";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { CompanySize } from "services/feed/types";

export type HomeSearchParams = {
  company: string;
  companySize: string;
  jobTagIds: string;
  skillTagIds: string;
};

const HomePage = async ({
  searchParams: {
    company = "",
    companySize = "",
    jobTagIds = "",
    skillTagIds = "",
  },
}: {
  searchParams: HomeSearchParams;
}) => {
  const _company = company.trim() === "" ? undefined : company;
  const companySizes = companySize
    .split(",")
    .filter((v) => v.trim() !== "") as CompanySize[];
  const _jobTagIds = jobTagIds
    .split(",")
    .filter((v) => v.trim() !== "")
    .map(Number);
  const _skillTagIds = skillTagIds
    .split(",")
    .filter((v) => v.trim() !== "")
    .map(Number);

  const feedsComponentKey = [company, companySize, jobTagIds, skillTagIds].join(
    ","
  );

  return (
    <div className="relative scroll-smooth">
      <div className="z-10 flex items-center top-[var(--header-height)] w-full h-[calc(108px+3rem)] desktop:h-[124px] rounded-[10px] bg-background">
        <Banner />
      </div>
      <div className="relative flex flex-col laptop:flex-row desktop:flex-row justify-center desktop:justify-between">
        <div className="flex-1 laptop:w-[216px] p-[10px] h-fit laptop:flex desktop:flex">
          <FeedFilter
            filterOptions={{
              company: _company,
              companySizes,
              jobTagIds: _jobTagIds,
              skillTagIds: _skillTagIds,
            }}
          />
        </div>
        <ErrorBoundary fallback={<FeedsErrorFallback />}>
          <Suspense key={feedsComponentKey} fallback={<FeedsSkeleton />}>
            <Feeds
              page={1}
              company={_company}
              companySizes={companySizes}
              jobTagIds={_jobTagIds}
              skillTagIds={_skillTagIds}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default HomePage;
