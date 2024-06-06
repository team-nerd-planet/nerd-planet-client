import Banner from "components/banner";
import { FeedFilter, LineFeedFilter } from "components/feed/feed-filter";
import Feeds, {
  FeedsErrorFallback,
  FeedsSkeleton,
} from "components/feed/feeds";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { CompanySize } from "services/feed/types";

export type HomeSearchParams = {
  page: string;
  company: string;
  companySize: string;
  jobTagIds: string;
  skillTagIds: string;
};

const HomePage = async ({
  searchParams,
}: {
  searchParams: HomeSearchParams;
}) => {
  const { page, company, companySizes, jobTagIds, skillTagIds } =
    getHomePageParams(searchParams);

  const feedsComponentKey = [
    company,
    companySizes,
    jobTagIds,
    skillTagIds,
  ].join(",");

  return (
    <div className="relative scroll-smooth scrollbar-hide">
      <div className="z-10 flex items-center top-[var(--header-height)] w-full h-[calc(108px+3rem)] desktop:h-[124px] rounded-[10px] bg-background">
        <Banner />
      </div>
      <div className="relative flex justify-center flex-col laptop:flex-row">
        <LineFeedFilter
          company={company}
          companySizes={companySizes}
          jobTagIds={jobTagIds}
          skillTagIds={skillTagIds}
        />
        <div className="w-[330px] hidden p-[10px] h-fit laptop:flex">
          <FeedFilter
            filterOptions={{
              company,
              companySizes,
              jobTagIds,
              skillTagIds,
            }}
          />
        </div>
        <ErrorBoundary fallback={<FeedsErrorFallback />}>
          <Suspense key={feedsComponentKey} fallback={<FeedsSkeleton />}>
            <Feeds
              page={page}
              company={company}
              companySizes={companySizes}
              jobTagIds={jobTagIds}
              skillTagIds={skillTagIds}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default HomePage;

const getHomePageParams = ({
  page = "1",
  company = "",
  companySize = "",
  jobTagIds = "",
  skillTagIds = "",
}: HomeSearchParams) => {
  const _page = isNaN(Number(page)) ? 1 : Number(page);
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

  return {
    page: _page,
    company: _company,
    companySizes,
    jobTagIds: _jobTagIds,
    skillTagIds: _skillTagIds,
  };
};
