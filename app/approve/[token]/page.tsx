import { approveSubscription } from "@services/subscription/queries";

const ApprovePage = async ({
  params: { token },
}: {
  params: {
    token?: string;
  };
}) => {
  if (!token) {
    return <InvalidRequest />;
  }

  const approveResult = await approveSubscription(token);

  const isApprove = "ok" in approveResult && approveResult.ok;

  if (isApprove) {
    return <ApproveSuccess />;
  }

  return <ApproveFail />;
};

export default ApprovePage;

const InvalidRequest = () => {
  return (
    <div className="flex center w-full h-screen text-xl font-bold text-white py-[36px]">
      잘못된 요청입니다 😢
      <br />
      <br />
      이메일 인증을 위한 링크가 올바르지 않아요.
      <br />
      다시 한 번 확인해주세요.
    </div>
  );
};

const ApproveSuccess = () => {
  return (
    <div className="flex center w-full h-screen text-xl font-bold text-white py-[36px]">
      이메일이 인증되었어요! 🎉
      <br />
      <br />
      이제부터 나만의 피드를 받아 볼 수 있어요.
    </div>
  );
};

const ApproveFail = () => {
  return (
    <div className="flex center w-full h-screen text-xl font-bold text-white py-[36px]">
      이메일 인증에 실패했어요 😢
      <br />
      <br />
      이미 인증된 이메일이거나, 인증 토큰이 만료되었을 수 있어요.
      <br />
      다시 한 번 시도해주세요.
    </div>
  );
};
