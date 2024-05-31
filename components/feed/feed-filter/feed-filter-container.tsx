import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getJobTags, getSkillTags } from "services/feed/queries";
import type { CompanySize } from "services/feed/types";
import {
  CompanyNameForm,
  CompanySizeForm,
  JobForm,
  SkillForm,
  TagFormSkeleton,
} from "./feed-filter";

type FeedFilterContainerProps = {
  filterOptions?: {
    company?: string;
    companySizes?: CompanySize[];
    jobTagIds?: number[];
    skillTagIds?: number[];
  };
};

export const FeedFilterContainer = async ({
  filterOptions,
}: FeedFilterContainerProps) => {
  return (
    <div className="gap-5 flex-1 text-white flex flex-col">
      <CompanyNameForm searchCompanyName={filterOptions?.company ?? ""} />
      <CompanySizeForm companySizes={filterOptions?.companySizes ?? []} />
      <ErrorBoundary
        fallback={<TagFormSkeleton tagCount={0}>직무</TagFormSkeleton>}
      >
        <Suspense fallback={<TagFormSkeleton>직무</TagFormSkeleton>}>
          <JobFormContainer searchJobIds={filterOptions?.jobTagIds ?? []} />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary
        fallback={<TagFormSkeleton tagCount={0}>기술스택</TagFormSkeleton>}
      >
        <Suspense fallback={<TagFormSkeleton>기술스택</TagFormSkeleton>}>
          <SkillFormContainer
            searchSkillIds={filterOptions?.skillTagIds ?? []}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default FeedFilterContainer;

type JobFormContainerProps = {
  searchJobIds: number[];
};

export const JobFormContainer = async ({
  searchJobIds,
}: JobFormContainerProps) => {
  const jobs = await getJobTags();

  return <JobForm jobs={jobs} searchJobIds={searchJobIds} />;
};

type SkillFormContainerProps = {
  searchSkillIds: number[];
};

export const SkillFormContainer = async ({
  searchSkillIds,
}: SkillFormContainerProps) => {
  const skills = await getSkillTags();

  return <SkillForm skills={skills} searchSkillIds={searchSkillIds} />;
};
