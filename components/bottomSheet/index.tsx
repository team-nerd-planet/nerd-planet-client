"use client";

import styled from "@emotion/styled";
import {
  CompanyNameForm,
  CompanySizeForm,
  JobForm,
  SkillForm,
} from "components/feed/feed-filter/feed-filter-only-input";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { getJobTags, getSkillTags } from "services/feed/queries";
import { CompanySize } from "services/feed/types";
import { switchCompanySize } from "services/feed/utils";
import { subscriptionAction } from "./actions";
import Image from "next/image";

type FormFieldValues = {
  email: string;
  name: string;
  belong: string;
  searchCompanyName: string[];
  searchCompanySize: string[];
  searchJobIds: number[];
  searchSkillIds: number[];
  jobs: {
    id: number;
    name: string;
  }[];
  skills: {
    id: number;
    name: string;
  }[];
};

const BottomSheet = () => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  // 파라미터 가져오기
  const searchParams = useSearchParams();
  const params = useMemo(() => {
    return new URLSearchParams(searchParams);
  }, [searchParams]);
  const [form, setForm] = useState<FormFieldValues>({
    email: "",
    name: "",
    belong: "",
    searchCompanyName: params.get("companySize")
      ? [params.get("companySize")!]
      : [],
    searchCompanySize: params.get("companySize")?.split(",") || [],
    searchJobIds: params.get("jobTagIds")?.split(",").map(Number) || [],
    searchSkillIds: params.get("skillTagIds")?.split(",").map(Number) || [],
    jobs: [],
    skills: [],
  });

  useEffect(() => {
    const fetchTags = async () => {
      const jobs = await getJobTags();
      const skills = await getSkillTags();

      setForm((prev) => {
        return {
          ...prev,
          jobs,
          skills,
        };
      });
    };

    fetchTags();
  }, []);

  useEffect(() => {
    setForm((prev) => {
      return {
        ...prev,
        searchCompanyName: params.get("companySize")
          ? [params.get("companySize")!]
          : [],
        searchCompanySize: params.get("companySize")?.split(",") || [],
        searchJobIds: params.get("jobTagIds")?.split(",").map(Number) || [],
        searchSkillIds: params.get("skillTagIds")?.split(",").map(Number) || [],
      };
    });
  }, [params]);

  const handleSubscription = async () => {
    startTransition(async () => {
      const { ok, message } = await subscriptionAction({
        division: form.belong,
        email: form.email,
        name: form.name,
        preferredCompanySizeArr: form.searchCompanySize.map((size) =>
          switchCompanySize(size as CompanySize)
        ),
        preferredCompanyArr: [],
        preferredJobArr: form.searchJobIds,
        preferredSkillArr: form.searchSkillIds,
      });

      if (ok) {
        toast.success(message);
        setForm({
          email: "",
          name: "",
          belong: "",
          searchCompanyName: [],
          searchCompanySize: [],
          searchJobIds: [],
          searchSkillIds: [],
          jobs: form.jobs,
          skills: form.skills,
        });
        setModal(true);
        return;
      }

      toast.error(message);
    });
  };

  return (
    <div className="z-[99] w-full flex justify-center fixed bottom-0">
      <div className="relative w-full max-w-screen-laptop px-[15px] pt-[15px] bg-[#26272b] z-[99] rounded-tr-[20px] rounded-tl-[20px]">
        <div className="relative w-full flex justify-end items-center mb-[15px]">
          <button
            onClick={() => {
              if (!open) {
                toast.success("내가 설정한 카테고리를 가져왔어요!");
              }
              setOpen(!open);
            }}
            className="z-[99] px-[29px] py-[13px] h-[45px] bg-[#93ebff] text-[#1e1e1e] text-[16px] font-bold rounded-[10px] flex justify-center items-center cursor-pointer hover:bg-[#6ed1ff] transition-colors duration-300"
          >
            {open ? "괜찮아요" : "구독하기"}
          </button>
          <div className="absolute w-full h-full flex justify-center items-center transition-all">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {open ? (
                <path
                  d="M3.34815 8.47309L10.8486 17.4736C10.994 17.6348 11.1716 17.7636 11.3699 17.8518C11.5683 17.94 11.7829 17.9856 12 17.9856C12.2171 17.9856 12.4317 17.94 12.6301 17.8518C12.8284 17.7636 13.006 17.6348 13.1514 17.4736L20.6518 8.47309C20.778 8.32188 20.8732 8.1473 20.932 7.95931C20.9907 7.77132 21.0118 7.5736 20.9941 7.37744C20.9764 7.18129 20.9203 6.99054 20.8289 6.81608C20.7375 6.64162 20.6126 6.48688 20.4614 6.36068C20.3102 6.23448 20.1356 6.1393 19.9476 6.08057C19.7596 6.02185 19.5619 6.00072 19.3658 6.0184C19.1696 6.03609 18.9789 6.09223 18.8044 6.18364C18.6299 6.27504 18.4752 6.39991 18.349 6.55112L12 14.1687L5.651 6.55112C5.5248 6.39991 5.37005 6.27504 5.1956 6.18364C5.02114 6.09223 4.83039 6.03609 4.63423 6.0184C4.43808 6.00072 4.24036 6.02184 4.05237 6.08057C3.86438 6.1393 3.68979 6.23448 3.53859 6.36068C3.38738 6.48688 3.26251 6.64162 3.17111 6.81608C3.0797 6.99054 3.02356 7.18129 3.00587 7.37744C2.98819 7.5736 3.00931 7.77132 3.06804 7.95931C3.12677 8.1473 3.22195 8.32188 3.34815 8.47309Z"
                  fill="#F8F9FE"
                />
              ) : (
                <path
                  d="M20.6518 15.5268L13.1514 6.52629C13.006 6.36511 12.8284 6.23625 12.6301 6.14805C12.4317 6.05986 12.2171 6.01428 12 6.01428C11.7829 6.01428 11.5683 6.05986 11.3699 6.14805C11.1716 6.23625 10.994 6.36511 10.8486 6.52629L3.34815 15.5268C3.22195 15.678 3.12677 15.8526 3.06804 16.0406C3.00932 16.2286 2.98819 16.4263 3.00587 16.6224C3.02356 16.8186 3.0797 17.0093 3.17111 17.1838C3.26251 17.3583 3.38738 17.513 3.53859 17.6392C3.6898 17.7654 3.86438 17.8606 4.05237 17.9193C4.24036 17.978 4.43808 17.9992 4.63424 17.9815C4.83039 17.9638 5.02114 17.9076 5.1956 17.8162C5.37006 17.7248 5.5248 17.6 5.651 17.4488L12 9.83114L18.349 17.4488C18.4752 17.6 18.6299 17.7248 18.8044 17.8162C18.9789 17.9076 19.1696 17.9638 19.3658 17.9815C19.5619 17.9992 19.7596 17.978 19.9476 17.9193C20.1356 17.8606 20.3102 17.7654 20.4614 17.6392C20.6126 17.513 20.7375 17.3583 20.8289 17.1838C20.9203 17.0093 20.9764 16.8186 20.9941 16.6224C21.0118 16.4263 20.9907 16.2286 20.932 16.0406C20.8732 15.8526 20.778 15.678 20.6518 15.5268Z"
                  fill="#F8F9FE"
                />
              )}
            </svg>
          </div>
        </div>
        <Box
          scrollVisible={false}
          className={`gap-[24px] transition-all duration-500 overflow-scroll flex flex-col justify-start items-center wideTablet:flex-row wideTablet:justify-center laptop:flex-row scroll-smooth ${
            open
              ? "px-[36px] pb-[36px] max-h-[378px] tablet:max-h-[478px] wideTablet:max-h-[678px] laptop:max-h-[678px] desktop:max-h-[678px]"
              : "px-[36px] py-0 max-h-0"
          }`}
        >
          <div className="gap-5 text-white flex flex-col py-[10px]">
            <div className="max-w-[400px] mx-auto flex flex-col gap-[20px]">
              <CompanyNameForm
                searchCompanyName={form.searchCompanyName}
                setSearchCompanyName={(searchCompanyName) => {
                  setForm({ ...form, searchCompanyName });
                }}
              />
              <CompanySizeForm
                companySizes={form.searchCompanySize as CompanySize[]}
                setCompanySizes={(companySizes) => {
                  setForm({ ...form, searchCompanySize: [...companySizes] });
                }}
              />
              <JobForm
                jobs={form.jobs}
                searchJobIds={form.searchJobIds}
                setSearchJobIds={(searchJobIds) => {
                  setForm({ ...form, searchJobIds: [...searchJobIds] });
                }}
              />
              <SkillForm
                skills={form.skills}
                searchSkillIds={form.searchSkillIds}
                setSearchSkillIds={(searchSkillIds) => {
                  setForm({ ...form, searchSkillIds: [...searchSkillIds] });
                }}
              />
            </div>
          </div>
          <div className="max-w-[400px] h-full">
            <div className="flex flex-col gap-[10px] py-[10px]">
              <h2 className="text-[20px] font-bold text-[#f8f9fe]">
                😆 매일 아침 새로운 글을 뉴스레터로 받아보세요.
              </h2>
              <h4 className="text-[16px] text-[#f8f9fe] leading-[16px]">
                내가 원하는 카테고리만 설정하면 끝! <br />
                원하는 글만 쏙쏙 골라 보내드릴게요.
              </h4>
            </div>
            <div className="py-[16px] flex flex-col">
              <div className="flex flex-col gap-[14px] py-[10px]">
                <h3 className="text-[#f8f9fe] font-bold">이메일</h3>
                <input
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                  }}
                  className="w-full max-w-[400px] px-[20px] py-[13px] text-[12px] text-white border border-[#e3e3e3] bg-transparent rounded-[5px] placeholder:font-normal placeholder-[#8E8E93] focus:outline-none focus:ring-0 focus:border-primary"
                  placeholder="이메일을 입력해주세요"
                />
              </div>
              <div className="flex flex-col gap-[14px] py-[10px]">
                <h3 className="text-[#f8f9fe] font-bold">이름(선택)</h3>
                <input
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                  }}
                  className="w-full max-w-[400px] px-[20px] py-[13px] text-[12px] text-white border border-[#e3e3e3] bg-transparent rounded-[5px] placeholder:font-normal placeholder-[#8E8E93] focus:outline-none focus:ring-0 focus:border-primary"
                  placeholder="이름을 입력해주세요"
                />
              </div>
              <div className="flex flex-col gap-[14px] py-[10px]">
                <h3 className="text-[#f8f9fe] font-bold">소속(선택)</h3>
                <input
                  onChange={(e) => {
                    setForm({ ...form, belong: e.target.value });
                  }}
                  className="w-full max-w-[400px] px-[20px] py-[13px] text-[12px] text-white border border-[#e3e3e3] bg-transparent rounded-[5px] placeholder:font-normal placeholder-[#8E8E93] focus:outline-none focus:ring-0 focus:border-primary"
                  placeholder="소속을 입력해주세요"
                />
              </div>
              <div className="pt-[24px]">
                <button
                  onClick={handleSubscription}
                  className="w-full max-w-[400px] px-[20px] py-[13px] bg-[#93ebff] text-[#1e1e1e] text-[16px] font-bold rounded-[10px] flex justify-center items-center cursor-pointer hover:bg-[#6ed1ff] transition-colors duration-300"
                >
                  {isPending ? (
                    <div className="w-5 h-5 border-[2px] border-[#1e1e1e] border-dashed rounded-full animate-spin"></div>
                  ) : (
                    "구독하기"
                  )}
                </button>
              </div>
            </div>
          </div>
        </Box>
      </div>
      <Modal open={modal}>
        <Content>
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
            }}
            onClick={() => setModal(false)}
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.95372 3L8 7.04628L12.0463 3L13 3.95372L8.95372 8L13 12.0463L12.0463 13L8 8.95372L3.95372 13L3 12.0463L7.04628 8L3 3.95372L3.95372 3Z"
                fill={"white"}
                stroke={"white"}
                strokeWidth="0.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Image
              src={
                "https://imagedelivery.net/6qzLODAqs2g1LZbVYqtuQw/c128208d-c3ff-488f-93d7-4ba3ce866c00/public"
              }
              alt="mail"
              width={64}
              height={64}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#f8f9fe",
                }}
              >
                인증 이메일이 발송되었어요.
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#f8f9fe",
                }}
              >
                인증이 완료되면 매일 아침 새로운 글을 받아보실 수 있어요.
              </div>
            </div>
          </div>
        </Content>
      </Modal>
    </div>
  );
};

export default BottomSheet;

const Box = styled.div<{
  scrollVisible: boolean;
}>`
  ${({ scrollVisible }) =>
    scrollVisible
      ? ``
      : `
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  `}
`;

const Modal = styled.div<{
  open?: boolean;
}>`
  display: ${({ open }) => (open ? "flex" : "none")}; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 99; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  background-color: #1c1c20;
  padding: 36px 24px;
  width: 400px;
  height: 200px;
  border-radius: 10px;
  margin-bottom: 100px;
  color: #f8f9fe;
  position: relative;
`;
