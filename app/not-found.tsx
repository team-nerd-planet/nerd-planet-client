import Link from "next/link";

const NotFound = () => {
  return (
    <div className="stack center w-full h-[calc(100vh-var(--header-height))]">
      <h2 className="text-2xl font-bold text-center text-foreground">
        페이지를 찾을 수 없어요 😢
      </h2>
      <Link
        className="block mt-4 text-center text-blue-600 underline hover:text-blue-800"
        href="/"
      >
        메인 화면으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
