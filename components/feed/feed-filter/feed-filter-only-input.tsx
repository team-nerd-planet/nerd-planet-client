"use client";

import Badge from "components/badge";
import Input from "components/input";
import FilterIcon from "icons/filter-icon.svg";
import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import type { CompanySize } from "services/feed/types";
import styled from "@emotion/styled";
import { toast } from "react-toastify";

const MAX_COMPANY_COUNT = 3;

type CompanyNameProps = {
  searchCompanyName: string[];
  setSearchCompanyName: (companyName: string[]) => void;
};

// searchCompanyName ->  콤마로 분리해서 저장

export const CompanyNameForm = ({
  searchCompanyName,
  setSearchCompanyName,
}: CompanyNameProps) => {
  const [value, setValue] = useState<string>("");

  const handleRemoveHashtag = (hashtagToRemove: string) => {
    const filteredList = searchCompanyName.filter(
      (hashtag) => hashtag !== hashtagToRemove
    );
    setSearchCompanyName(filteredList);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (event.key === "Enter" && value !== "") {
      if (searchCompanyName.length >= MAX_COMPANY_COUNT) {
        toast.error(`최대 ${MAX_COMPANY_COUNT}개까지 등록 가능합니다.`);
        return;
      }
      if (!searchCompanyName.find((hashtag) => hashtag === value)) {
        setSearchCompanyName([...searchCompanyName, value]);
      }
      setValue("");
    }
  };

  useEffect(() => {
    setValue("");
  }, []);

  return (
    <Container>
      <Label>
        기업명
        <span
          style={{
            color: "#8C8C8C",
            fontSize: "12px",
          }}
        >
          (꼭 받고 싶은 기업명을 태그로 입력)
        </span>
      </Label>
      <Input
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="w-[208px] h-[40px]"
        defaultValue={""}
        placeholder="기업명을 입력해주세요"
      />
      <TagContainer>
        {searchCompanyName.map((hashtag, index) => (
          <TagSpan key={index}>
            #{hashtag}
            <TagRemoveButton onClick={() => handleRemoveHashtag(hashtag)}>
              <svg
                width={16}
                height={16}
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.95372 3L8 7.04628L12.0463 3L13 3.95372L8.95372 8L13 12.0463L12.0463 13L8 8.95372L3.95372 13L3 12.0463L7.04628 8L3 3.95372L3.95372 3Z"
                  fill={"#93ebff"}
                  stroke={"#93ebff"}
                  strokeWidth="0.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </TagRemoveButton>
          </TagSpan>
        ))}
      </TagContainer>
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
                if (companySizes.includes(value)) {
                  setCompanySizes(
                    companySizes.filter((companySize) => companySize !== value)
                  );
                  return;
                }
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

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TagSpan = styled.span`
  font-size: 12px;
  color: #93ebff;
  border: 1px solid #93ebff;
  background-color: transparent;
  padding: 4px 6px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  line-height: 14px;
`;

const TagRemoveButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  margin-left: 0.5rem;
`;
