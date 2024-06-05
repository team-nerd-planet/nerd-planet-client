"use client";

import Badge from "components/badge";
import Input from "components/input";
import FilterIcon from "icons/filter-icon.svg";
import { type PropsWithChildren } from "react";
import type { CompanySize } from "services/feed/types";

type CompanyNameProps = {
  searchCompanyName: string;
  setSearchCompanyName: (companyName: string) => void;
};

export const CompanyNameForm = ({
  searchCompanyName,
  setSearchCompanyName,
}: CompanyNameProps) => {
  return (
    <Container>
      <Label>기업명</Label>
      <Input
        className="w-[208px] h-[40px]"
        defaultValue={searchCompanyName}
        onChange={({ target: { value } }) => {
          setSearchCompanyName(value);
        }}
        placeholder="기업명을 입력해주세요"
      />
    </Container>
  );
};

type CompanySizeProps = {
  companySizes: CompanySize[];
  setCompanySizes: (companySizes: CompanySize[]) => void;
};

export const CompanySizeForm = ({
  companySizes,
  setCompanySizes,
}: CompanySizeProps) => {
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
                setCompanySizes([...companySizes, value]);
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
  setSearchJobIds: (searchJobIds: number[]) => void;
};

export const JobForm = ({
  jobs,
  searchJobIds,
  setSearchJobIds,
}: JobFormProps) => {
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
                if (searchJobIds.includes(id)) {
                  setSearchJobIds(
                    searchJobIds.filter((searchJobId) => searchJobId !== id)
                  );
                  return;
                }

                setSearchJobIds([...searchJobIds, id]);
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
  setSearchSkillIds: (searchSkillIds: number[]) => void;
};

export const SkillForm = ({
  skills,
  searchSkillIds,
  setSearchSkillIds,
}: SkillFormProps) => {
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
                if (searchSkillIds.includes(id)) {
                  setSearchSkillIds(
                    searchSkillIds.filter(
                      (searchSkillId) => searchSkillId !== id
                    )
                  );
                  return;
                }

                setSearchSkillIds([...searchSkillIds, id]);
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
