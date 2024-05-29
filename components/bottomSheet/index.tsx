"use client";
import {
  // CompanyNameForm,
  CompanySizeForm,
  JobForm,
  SkillForm,
} from "components/feed/feed-filter/feed-filter-only-input";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import { toast } from "react-toastify";
import { getJobTags, getSkillTags } from "services/feed/queries";
import { CompanySize } from "services/feed/types";

const BottomSheet = () => {
  const [open, setOpen] = useState(false);
  // 파라미터 가져오기
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [form, setForm] = useState<{
    email: string;
    name: string;
    belong: string;
    searchCompanyName: string;
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
  }>({
    email: "",
    name: "",
    belong: "",
    searchCompanyName: params.get("company") || "",
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

      setForm({
        ...form,
        jobs,
        skills,
      });
    };

    fetchTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setForm({
      ...form,
      searchCompanyName: params.get("company") || "",
      searchCompanySize: params.get("companySize")?.split(",") || [],
      searchJobIds: params.get("jobTagIds")?.split(",").map(Number) || [],
      searchSkillIds: params.get("skillTagIds")?.split(",").map(Number) || [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSubscription = async () => {
    // endpoint: /v1/subscription/apply
    // method: POST
    // body: {
    // "division": "string",
    // "email": "string",
    // "name": "string",
    // "preferred_companySize_arr": [
    //   0
    // ],
    // "preferred_company_arr": [
    //   0
    // ],
    // "preferred_job_arr": [
    //   0
    // ],
    // "preferred_skill_arr": [
    //   0
    // ]
    // }

    const apiUrl = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/subscription/apply`
    );

    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        division: form.belong,
        email: form.email,
        name: form.name,
        preferred_companySize_arr: form.searchCompanySize,
        preferred_company_arr: form.searchCompanySize,
        preferred_job_arr: form.searchJobIds,
        preferred_skill_arr: form.searchSkillIds,
      }),
    }).then<{
      ok?: boolean;
      code?: 0;
      description?: string;
      message?: string;
    }>((res) => res.json());
  };

  return (
    <div className="z-[99] w-full flex justify-center fixed bottom-0">
      <div className="relative w-full max-w-screen-laptop p-[15px] bg-[#26272b] z-[99] rounded-tr-[20px] rounded-tl-[20px]">
        <div className="relative w-full flex justify-end items-center">
          <button
            onClick={() => {
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
        <div
          className={`gap-[24px] transition-all duration-500 overflow-scroll flex flex-col justify-start items-center wideTablet:flex-row wideTablet:justify-center laptop:flex-row ${
            open
              ? "p-[36px] max-h-[378px] tablet:max-h-[478px] wideTablet:max-h-[578px] laptop:max-h-[678px] desktop:max-h-[678px]"
              : "p-0 max-h-0"
          }`}
        >
          <div className="gap-5 text-white flex flex-col py-[10px]">
            <div className="max-w-[400px] mx-auto flex flex-col gap-[20px]">
              {/* <CompanyNameForm
        searchCompanyName={form.searchCompanyName}
        setSearchCompanyName={(searchCompanyName) => {
          setForm({ ...form, searchCompanyName });
        }}
      /> */}
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
                  구독하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;

// const FilterSection = () => {
//   // 파라미터 가져오기
//   const searchParams = useSearchParams();
//   const params = new URLSearchParams(searchParams);
//   const [form, setForm] = useState<{
//     searchCompanyName: string;
//     searchCompanySize: string[];
//     searchJobIds: number[];
//     searchSkillIds: number[];
//     jobs: {
//       id: number;
//       name: string;
//     }[];
//     skills: {
//       id: number;
//       name: string;
//     }[];
//   }>({
//     searchCompanyName: params.get("company") || "",
//     searchCompanySize: params.get("companySize")?.split(",") || [],
//     searchJobIds: params.get("jobTagIds")?.split(",").map(Number) || [],
//     searchSkillIds: params.get("skillTagIds")?.split(",").map(Number) || [],
//     jobs: [],
//     skills: [],
//   });

//   useEffect(() => {
//     const fetchTags = async () => {
//       const jobs = await getJobTags();
//       const skills = await getSkillTags();

//       setForm({
//         ...form,
//         jobs,
//         skills,
//       });
//     };

//     fetchTags();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     setForm({
//       ...form,
//       searchCompanyName: params.get("company") || "",
//       searchCompanySize: params.get("companySize")?.split(",") || [],
//       searchJobIds: params.get("jobTagIds")?.split(",").map(Number) || [],
//       searchSkillIds: params.get("skillTagIds")?.split(",").map(Number) || [],
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchParams]);

//   return (
//     <>
//       {/* <CompanyNameForm
//         searchCompanyName={form.searchCompanyName}
//         setSearchCompanyName={(searchCompanyName) => {
//           setForm({ ...form, searchCompanyName });
//         }}
//       /> */}
//       <CompanySizeForm
//         companySizes={form.searchCompanySize as CompanySize[]}
//         setCompanySizes={(companySizes) => {
//           setForm({ ...form, searchCompanySize: [...companySizes] });
//         }}
//       />
//       <JobForm
//         jobs={form.jobs}
//         searchJobIds={form.searchJobIds}
//         setSearchJobIds={(searchJobIds) => {
//           setForm({ ...form, searchJobIds: [...searchJobIds] });
//         }}
//       />
//       <SkillForm
//         skills={form.skills}
//         searchSkillIds={form.searchSkillIds}
//         setSearchSkillIds={(searchSkillIds) => {
//           setForm({ ...form, searchSkillIds: [...searchSkillIds] });
//         }}
//       />
//     </>
//   );
// };
