import { type HomeSearchParams } from "@/app/page";

export const HomeSearchParamsKeys: Record<keyof HomeSearchParams, string> = {
  page: "page",
  company: "company",
  companySize: "companySize",
  jobTagIds: "jobTagIds",
  skillTagIds: "skillTagIds",
};
