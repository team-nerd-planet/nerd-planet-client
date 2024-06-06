type ApplySubscription = (params: {
  division: string;
  email: string;
  name: string;
  preferredCompanySizeArr: number[];
  preferredCompanyArr: number[];
  preferredJobArr: number[];
  preferredSkillArr: number[];
}) => Promise<
  | {
      ok: true;
    }
  | {
      ok: false;
      code: 0;
      description: "Failed to subscribe";
      message: "Failed to subscribe";
    }
>;

export const applySubscription: ApplySubscription = async ({
  division,
  email,
  name,
  preferredCompanySizeArr,
  preferredCompanyArr,
  preferredJobArr,
  preferredSkillArr,
}) => {
  const apiUrl = new URL(`${process.env.API_URL}/v1/subscription/apply`);

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      division,
      email,
      name,
      preferred_companySize_arr: preferredCompanySizeArr,
      preferred_company_arr: preferredCompanyArr,
      preferred_job_arr: preferredJobArr,
      preferred_skill_arr: preferredSkillArr,
    }),
  })
    .then((res) => {
      return res;
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return {
        ok: false,
        code: 0,
        description: "Failed to subscribe",
        message: "Failed to subscribe",
      };
    });

  return response;
};

type ApproveSubscription = (token: string) => Promise<
  | {
      ok: boolean;
    }
  | {
      code: number;
      description: string;
      message: string;
    }
>;

export const approveSubscription: ApproveSubscription = async (token) => {
  const apiUrl = new URL(`${process.env.API_URL}/v1/subscription/approve`);

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  }).then((res) => res.json());

  return response;
};
