"use client";

import Badge from "@components/badge";
import Input from "@components/input";
import FilterIcon from "icons/filter-icon.svg";
import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { CompanySize } from "@services/feed/types";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import { companyList } from "@/constants/company";
import { debounce } from "lodash";

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
  const [list, setList] = useState<
    {
      companyName: string;
      id: number;
    }[]
  >([]);
  const handleRemoveHashtag = (hashtagToRemove: string) => {
    const filteredList = searchCompanyName.filter(
      (hashtag) => hashtag !== hashtagToRemove
    );
    setSearchCompanyName(filteredList);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setValue(event.target.value);

    setList(
      companyList.filter((company) =>
        company.companyName.includes(event.target.value)
      )
    );
  };

  const debouncedHandleInput = useCallback(
    debounce((event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && value !== "") {
        if (searchCompanyName.length >= MAX_COMPANY_COUNT) {
          toast.error(`최대 ${MAX_COMPANY_COUNT}개까지 등록 가능합니다.`);
          return;
        }
        // companyList에 있는 기업명이 아닌 경우
        if (!companyList.find((company) => company.companyName === value)) {
          toast.error("존재하지 않는 기업명입니다.");
          setValue("");
          return;
        }
        if (!searchCompanyName.find((hashtag) => hashtag === value)) {
          setSearchCompanyName([...searchCompanyName, value]);
        }
        setValue("");
      }

      // 방향키 아래로 눌렀을 때
      // if (event.key === "ArrowDown" && list.length > 0) {
      //   const firstLi = document.getElementById("company-list-item-0");
      //   // 첫 번째 li 태그에 focus를 줌
      //   if (firstLi) {
      //     firstLi.setAttribute("tabindex", "0");
      //     firstLi.focus();
      //   }
      // }
    }, 200),
    [value]
  );

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();
    debouncedHandleInput(event);
  };

  const debounceHandleListKeyDown = useCallback(
    debounce((key, currentTarget, searchCompanyName) => {
      if (key === "Enter") {
        if (searchCompanyName.length >= MAX_COMPANY_COUNT) {
          toast.error(`최대 ${MAX_COMPANY_COUNT}개까지 등록 가능합니다.`);
          return;
        }
        // companyList에 있는 기업명이 아닌 경우
        if (
          !companyList.find(
            (company) => company.companyName === currentTarget.textContent
          )
        ) {
          toast.error("존재하지 않는 기업명입니다.");
          setValue("");
          return;
        }
        if (
          !searchCompanyName.find(
            (hashtag: string) => hashtag === currentTarget.textContent
          )
        ) {
          setSearchCompanyName([
            ...searchCompanyName,
            currentTarget.textContent,
          ]);
        }
        setValue("");
      }
      // 방향키 위로 눌렀을 때
      if (key === "ArrowUp") {
        // 내 형제 중에 이전 li 태그를 가져옴
        const prevLi = currentTarget.previousElementSibling as HTMLLIElement;
        // 이전 li 태그가 있으면
        if (prevLi) {
          // 이전 li
          prevLi.focus();

          // 현재 li 태그에 tabindex를 제거
          currentTarget.removeAttribute("tabindex");

          // 이전 li 태그에 tabindex를 추가
          prevLi.setAttribute("tabindex", "0");

          return;
        }
      }

      // 방향키 아래로 눌렀을 때
      if (key === "ArrowDown") {
        // 내 형제 중에 다음 li 태그를 가져옴
        const nextLi = currentTarget.nextElementSibling as HTMLLIElement;
        // 다음 li 태그가 있으면
        if (nextLi) {
          // 다음 li
          nextLi.focus();

          // 현재 li 태그에 tabindex를 제거
          currentTarget.removeAttribute("tabindex");

          // 다음 li 태그에 tabindex를 추가
          nextLi.setAttribute("tabindex", "0");

          return;
        }
      }
    }, 300),
    []
  );

  const handleListKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    const currentTarget = event.currentTarget;
    const key = event.key;
    const latestSearchCompanyName = [...searchCompanyName];
    event.stopPropagation();
    debounceHandleListKeyDown(key, currentTarget, latestSearchCompanyName);
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
      <div
        style={{
          position: "relative",
        }}
      >
        <Input
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="w-[208px] h-[40px]"
          placeholder="기업명을 검색하세요!"
        />
        {value && list.length > 0 && (
          <Ul id="company-list">
            {list.map(({ companyName }, index) => (
              <Li
                id={"company-list-item-" + index}
                key={index}
                onClick={() => {
                  if (searchCompanyName.length >= MAX_COMPANY_COUNT) {
                    toast.error(
                      `최대 ${MAX_COMPANY_COUNT}개까지 등록 가능합니다.`
                    );
                    return;
                  }

                  if (
                    !searchCompanyName.find(
                      (hashtag) => hashtag === companyName
                    )
                  ) {
                    setSearchCompanyName([...searchCompanyName, companyName]);
                  }
                  setValue("");
                }}
                onKeyDown={handleListKeyDown}
              >
                {companyName}
              </Li>
            ))}
          </Ul>
        )}
      </div>
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

const Ul = styled.ul`
  position: absolute;
  top: 40px;
  left: 0;
  width: 208px;
  border: 1px solid #ccc;
  border-top: none;
  background-color: white;
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 152px;
  overflow-y: auto;
  z-index: 1000;
  height: 192px;
  overflow-x: hidden;
  overflow-y: auto;
  ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: #1c1c20;
  // 좌하단 둥근 모서리
  // border-bottom-left-radius: 5px;
  // border-bottom-right-radius: 5px;
  border-radius: 5px;
`;

const Li = styled.li`
  padding: 10px;
  cursor: pointer;
  color: white;
  font-size: 12px;

  &:hover {
    background-color: #33333b;
  }

  &:focus {
    background-color: #33333b;
    outline: none;
  }
`;
