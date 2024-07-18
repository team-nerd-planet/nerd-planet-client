"use server";

import { applySubscription } from "@services/subscription/queries";

export const subscriptionAction = async ({
  division,
  email,
  name,
  preferredCompanySizeArr,
  preferredCompanyArr,
  preferredJobArr,
  preferredSkillArr,
}: {
  division: string;
  email: string;
  name: string;
  preferredCompanySizeArr: number[];
  preferredCompanyArr: number[];
  preferredJobArr: number[];
  preferredSkillArr: number[];
}) => {
  // 먼저 이메일이 유효한지 확인
  if (!email) {
    return {
      ok: false,
      message: "이메일을 입력해주세요",
    };
  }

  // 구독신청
  const result = await applySubscription({
    division,
    email,
    name,
    preferredCompanySizeArr,
    preferredCompanyArr,
    preferredJobArr,
    preferredSkillArr,
  });

  if (result.ok) {
    return {
      ok: true,
      message: "인증 메일을 발송했습니다.",
    };
  }

  return {
    ok: false,
    message: result.message || "Failed to subscribe",
  };
};
