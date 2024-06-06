"use client";

import Badge from "components/badge";
import Input from "components/input";
import FilterIcon from "icons/filter-icon.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HomeSearchParamsKeys } from "params/home";
import { type PropsWithChildren } from "react";
import type { CompanySize } from "services/feed/types";
import { useDebouncedCallback } from "use-debounce";

type CompanyNameProps = {
  searchCompanyName: string;
};

export const CompanyNameForm = ({ searchCompanyName }: CompanyNameProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onSearchCompanyName = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);

    const key = HomeSearchParamsKeys.company;

    if (value.trim() === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Container>
      <Label>기업명</Label>
      <Input
        className="w-[208px] h-[40px]"
        defaultValue={searchCompanyName}
        onChange={({ target: { value } }) => {
          onSearchCompanyName(value);
        }}
        placeholder="기업명을 입력해주세요"
      />
    </Container>
  );
};

type CompanySizeProps = {
  companySizes: CompanySize[];
};

export const CompanySizeForm = ({ companySizes }: CompanySizeProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onSearchCompanySize = (value: CompanySize) => {
    const params = new URLSearchParams(searchParams);

    const key = HomeSearchParamsKeys.companySize;

    if (companySizes.includes(value)) {
      const result = companySizes.filter((v) => v !== value);

      if (result.length === 0) {
        params.delete(key);
      } else {
        params.set(key, result.join(","));
      }
    } else {
      params.set(key, [...companySizes, value].join(","));
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Container>
      <Label>기업규모</Label>
      <div className="flex gap-[10px] flex-wrap">
        {CompanySizeList.map(({ label, value }) => {
          return (
            <Badge
              key={value}
              active={companySizes.includes(value)}
              onClick={() => {
                onSearchCompanySize(value);
              }}
            >
              {label}
            </Badge>
          );
        })}
      </div>
    </Container>
  );
};

type JobFormProps = {
  jobs: {
    id: number;
    name: string;
  }[];
  searchJobIds: number[];
};

export const JobForm = ({ jobs, searchJobIds }: JobFormProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onSearchJob = (jobId: number) => {
    const params = new URLSearchParams(searchParams);

    const key = HomeSearchParamsKeys.jobTagIds;

    if (searchJobIds.includes(jobId)) {
      const result = searchJobIds.filter((id) => id !== jobId);

      if (result.length === 0) {
        params.delete(key);
      } else {
        params.set(key, result.join(","));
      }
    } else {
      params.set(key, [...searchJobIds, jobId].join(","));
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Container>
      <Label>직무</Label>
      <div className="flex gap-[10px] flex-wrap">
        {jobs.map(({ id, name }) => {
          return (
            <Badge
              key={id}
              active={searchJobIds.includes(id)}
              onClick={() => {
                onSearchJob(id);
              }}
            >
              {name}
            </Badge>
          );
        })}
      </div>
    </Container>
  );
};

type SkillFormProps = {
  skills: {
    id: number;
    name: string;
  }[];
  searchSkillIds: number[];
};

export const SkillForm = ({ skills, searchSkillIds }: SkillFormProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onSearchSkill = (skillId: number) => {
    const params = new URLSearchParams(searchParams);

    const key = HomeSearchParamsKeys.skillTagIds;

    if (searchSkillIds.includes(skillId)) {
      const result = searchSkillIds.filter((id) => id !== skillId);

      if (result.length === 0) {
        params.delete(key);
      } else {
        params.set(key, result.join(","));
      }
    } else {
      params.set(key, [...searchSkillIds, skillId].join(","));
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Container>
      <Label>기술스택</Label>
      <div className="flex gap-[10px] flex-wrap">
        {skills.map(({ id, name }) => {
          return (
            <Badge
              key={id}
              active={searchSkillIds.includes(id)}
              onClick={() => {
                onSearchSkill(id);
              }}
            >
              {name}
            </Badge>
          );
        })}
      </div>
    </Container>
  );
};

const CompanySizeList: {
  label: string;
  value: CompanySize;
}[] = [
  {
    label: "스타트업",
    value: "startup",
  },
  {
    label: "중소기업",
    value: "small",
  },
  {
    label: "중견기업",
    value: "medium",
  },
  {
    label: "대기업",
    value: "large",
  },
  {
    label: "외국계",
    value: "foreign",
  },
];

const Container = ({ children }: PropsWithChildren) => {
  return <div className="stack gap-[15px]">{children}</div>;
};

const Label = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center gap-[10px]">
      <FilterIcon />
      {children}
    </div>
  );
};

type TagFormSkeletonProps = PropsWithChildren<{
  tagCount?: number;
}>;

export const TagFormSkeleton = ({
  children,
  tagCount = 6,
}: TagFormSkeletonProps) => {
  return (
    <Container>
      <Label>{children}</Label>
      <div className="flex gap-[10px] flex-wrap">
        {Array(tagCount).map((_, index) => {
          return <Badge key={index} />;
        })}
      </div>
    </Container>
  );
};
