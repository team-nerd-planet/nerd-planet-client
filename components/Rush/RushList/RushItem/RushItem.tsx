import styled from "@emotion/styled";
import { useEffect, useRef } from "react";
import Like from "./Like";
import Counter from "./Counter";
import Share from "./Share";
import InitialCard from "./InitialCard";
import { motion, useScroll, useSpring } from "framer-motion";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type RushItemProps = {
  rush: RushItems;
  className?: string;
  setRushItems: React.Dispatch<React.SetStateAction<RushItems[]>>;
};

const RushItem = ({
  rush,
  className,
  setRushItems
}: RushItemProps) => {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { scrollYProgress } = useScroll({
    container: containerRef
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const shareContent = async () => {
    const shareData: ShareData = {
      title: "너드플래닛 - 글의 제목",
      text: "너드플래닛 - 글의 설명",
      url: `${window.location.origin}/rush`,
    };

    const isAndroidWebView = () => {
      const ua = navigator.userAgent.toLowerCase();
      return ua.includes("wv") && ua.includes("android");
    };

    if (isAndroidWebView()) {
      await copyToClipboard(shareData.url || "");
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
        toast.error(`❌ 에러 발생: ${error}`);
      }
    } else {
      await copyToClipboard(shareData.url || "");
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`야호! 클립보드에 복사했어요.`);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast.error(`❌ 에러 발생: ${error}`);
    }
  };

  const handleLike = async () => {
    await fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/item/increase_like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id: rush.item_id,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.item_like_count) {
          toast.success(`❤️ 좋아요!`);
          setRushItems(prev => prev.map(item => {
            if (item.item_id === rush.item_id) {
              return {
                ...item,
                item_likes: data.item_like_count,
              };
            }
            return item;
          }
          ));
        } else {
          toast.error(`❌ 에러 발생: ${data.message}`);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error(`❌ 에러 발생: ${error}`);
      });

  }

  useEffect(() => {
    if (containerRef.current) {
      const observerOptions = {
        root: containerRef.current,
        rootMargin: '0px',
        // 전체가 보여야 감지
        threshold: 1,
      };

      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('rush-inline-text');
          } else {
            entry.target.classList.remove('rush-inline-text');
          }
        });
      }, observerOptions);

      const rushItems = containerRef.current.querySelectorAll('.rush-inline');

      if (observerRef.current) {
        rushItems.forEach(item => observerRef.current!.observe(item));
      }

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
        }
      };
    }
  }, []);
  return (
    <Container className={className} data-item-id={rush.item_id}>
      <motion.div className="progress-bar" style={{ scaleX, top: "20px" }} />
      <div className="w-full h-full z-10 relative flex flex-col justify-end py-[32px] px-[24px] gap-[24px]">
        <div className="flex justify-start items-center">
          <div className="bg-[#1C1C20] rounded-full flex justify-center items-center w-[36px] h-[36px]">
            <svg
              width="20"
              height="17"
              viewBox="0 0 20 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.77566 6.2925C5.21234 5.3815 5.59722 4.83356 6.36343 4.1842C7.24664 3.43568 7.86599 3.10178 9.00477 2.93429C10.0287 2.78369 10.5035 2.82887 11.379 2.93429C12.206 3.03387 13.5306 3.79266 13.5306 3.79266C13.5306 3.79266 11.8921 4.25623 10.9042 4.71128C9.80908 5.21568 9.2292 5.58688 8.24798 6.2925C7.39498 6.90591 6.54227 7.65412 5.79955 8.40079C4.98673 9.21794 4.33049 10.3585 4.33049 10.3585C4.33049 10.3585 4.19103 9.59115 4.1821 9.12364C4.16052 7.99347 4.28842 7.30899 4.77566 6.2925Z"
                fill="url(#paint0_linear_376_11)"
              />
              <path
                d="M6.36343 8.68692C5.14664 9.78624 4.5234 10.8705 4.5234 10.8705C4.5234 10.8705 4.5485 11.1368 4.61243 11.2922C4.66757 11.4262 4.80534 11.6084 4.80534 11.6084C4.80534 11.6084 5.26535 10.5091 6.61569 9.28929C7.43991 8.54475 7.93727 8.13627 8.85638 7.49724C9.87394 6.78976 10.4728 6.42336 11.5867 5.8859C13.3971 5.01246 14.8068 4.89199 14.8068 4.89199L14.5991 4.65857L14.3913 4.42515C14.3913 4.42515 12.6997 4.70375 11.5867 5.22329C10.5666 5.69953 9.8002 6.14189 8.85638 6.75933C7.82766 7.43231 7.27759 7.86101 6.36343 8.68692Z"
                fill="url(#paint1_linear_376_11)"
              />
              <path
                d="M6.17052 10.4338C5.42501 11.2141 5.0576 12.0903 5.0576 12.0903C5.0576 12.0903 5.32686 12.5278 5.54729 12.768C5.74609 12.9845 6.12601 13.28 6.12601 13.28C6.12601 13.28 7.30156 12.6692 8.04023 12.2108C9.05181 11.583 9.58832 11.1485 10.5332 10.4037C11.5786 9.57959 12.1781 9.12374 13.1152 8.1749C14.0287 7.24995 15.3707 5.62989 15.3707 5.62989L15.2074 5.46424C15.2074 5.46424 14.0878 5.58366 13.3971 5.78048C12.5744 6.01493 12.1476 6.2598 11.379 6.63886C10.417 7.11329 9.89028 7.41557 9.00477 8.02431C8.05916 8.67437 6.9656 9.60166 6.17052 10.4338Z"
                fill="url(#paint2_linear_376_11)"
              />
              <path
                d="M11.7055 12.4517C10.6432 13.2439 8.85638 14.289 8.85638 14.289C8.85638 14.289 10.4899 14.5465 11.5867 14.1986C12.5781 13.8842 13.3251 13.476 14.0945 12.768C14.8063 12.113 15.1905 11.6643 15.5636 10.7651C15.9081 9.93491 16.0236 8.43091 16.0236 8.43091C16.0236 8.43091 14.5913 9.9893 13.6197 10.8705C12.901 11.5223 12.4822 11.8725 11.7055 12.4517Z"
                fill="url(#paint3_linear_376_11)"
              />
              <path
                d="M0.145907 16.5629C-0.25905 15.8227 0.267491 14.8604 0.650431 14.1082C1.11044 13.2047 1.45173 12.9035 2.04529 12.0903C2.33863 11.6884 2.54257 11.4945 2.87627 11.1265C3.20374 10.7654 3.73693 10.223 3.73693 10.223L3.79629 10.4338C3.79629 10.4338 3.55143 10.7177 3.39564 10.9006C3.00308 11.3615 2.76067 11.6023 2.40143 12.0903C2.10902 12.4876 1.9523 12.7174 1.704 13.1445C1.45243 13.5771 1.2749 13.8101 1.12528 14.289C0.992241 14.7147 0.846561 15.072 0.94721 15.4184C1.06664 15.8294 1.38961 16.0659 1.74851 16.0659C2.26788 16.0659 2.73097 16.0114 3.36596 15.8551C4.25631 15.636 5.51761 14.9064 5.51761 14.9064C5.51761 14.9064 4.67643 15.1871 4.1821 15.2979C3.72349 15.4008 3.50196 15.4582 2.99499 15.4937C2.56466 15.5238 1.94142 15.4485 1.74851 15.2076C1.53094 14.9358 1.46146 14.6091 1.58529 14.1986C1.80787 13.4607 2.20879 12.9149 2.62401 12.3011C3.03779 11.6895 3.81113 10.8705 3.81113 10.8705L3.92984 11.1566C3.92984 11.1566 3.50089 11.7105 3.26209 12.0903C2.98869 12.5252 2.83176 12.768 2.63885 13.2499C2.48996 13.6218 2.46978 14.1082 2.5795 14.289C2.76031 14.5868 3.02234 14.668 3.36596 14.6956C3.92984 14.7407 4.71732 14.5935 5.51761 14.289C6.82344 13.792 7.92273 13.0665 9.34606 12.0903C10.7978 11.0947 11.5556 10.4447 12.8481 9.24411C13.8848 8.281 14.4989 7.75779 15.3707 6.63886C16.1773 5.60358 16.7134 5.02986 17.1662 3.79266C17.3591 3.26558 17.3888 2.67827 17.092 2.43733C16.7064 2.12427 15.9346 2.18132 15.2816 2.40721C14.3809 2.71886 13.6197 3.16017 13.6197 3.16017L13.3377 2.97946C13.3377 2.97946 14.115 2.47632 14.5694 2.24156C15.3093 1.85926 15.7002 1.68944 16.5133 1.51872C16.9436 1.42836 17.2678 1.41791 17.4926 1.47353C17.8448 1.56064 18.1456 1.75966 18.2049 2.28673C18.2989 3.12139 17.2849 4.93716 17.2849 4.93716C17.2849 4.93716 17.8545 4.16272 18.1456 3.64207C18.3975 3.19142 18.6673 2.61939 18.7243 2.45239C18.8376 2.12016 18.9041 1.53758 18.6353 1.23259C18.4128 0.980186 18.1365 0.93339 17.8043 0.901283C17.181 0.841046 16.3204 1.18406 15.712 1.39824C14.5928 1.79222 13.0261 2.82887 13.0261 2.82887L12.8481 2.66322C12.8481 2.66322 14.226 1.69743 15.1778 1.20247L15.2297 1.17545C16.0741 0.736272 16.6346 0.444695 17.4926 0.208564C18.3543 -0.028555 19.241 -0.107686 19.674 0.208562C19.9835 0.434639 20.0301 0.871168 19.9856 1.27777C19.8966 2.09097 19.5404 2.67828 19.0359 3.55172C18.1291 5.12161 17.4705 5.74863 16.2759 7.1057C15.1783 8.35243 14.4909 8.9874 13.2635 10.1025C11.9406 11.3045 11.1721 11.9548 9.73188 13.0089C8.72811 13.7436 8.15814 14.1507 7.09054 14.7859C5.76703 15.5734 5.03888 16.101 3.57371 16.5629C2.84198 16.7936 2.62837 16.9996 1.65948 16.9996C1.27367 16.9996 0.401033 17.0292 0.145907 16.5629Z"
                fill="url(#paint4_linear_376_11)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_376_11"
                  x1="9.78723"
                  y1="6.10256"
                  x2="5.14292"
                  y2="15.3862"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#93EBFF" />
                  <stop offset="1" stopColor="#365157" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_376_11"
                  x1="9.78723"
                  y1="6.10256"
                  x2="5.14292"
                  y2="15.3862"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#93EBFF" />
                  <stop offset="1" stopColor="#365157" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_376_11"
                  x1="9.78723"
                  y1="6.10256"
                  x2="5.14292"
                  y2="15.3862"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#93EBFF" />
                  <stop offset="1" stopColor="#365157" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_376_11"
                  x1="9.78723"
                  y1="6.10256"
                  x2="5.14292"
                  y2="15.3862"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#93EBFF" />
                  <stop offset="1" stopColor="#365157" />
                </linearGradient>
                <linearGradient
                  id="paint4_linear_376_11"
                  x1="9.78723"
                  y1="6.10256"
                  x2="5.14292"
                  y2="15.3862"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#93EBFF" />
                  <stop offset="1" stopColor="#365157" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="text-[12px] text-white ml-[8px] font-bold">
            {"NAVER"}
          </div>
        </div>
        <div className="flex flex-col gap-[4px] w-10/12">
          <div className="text-[14px] text-white" style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}>{rush.item_title}</div>
          <div className="text-[10px] text-zinc-200" style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}>{rush.item_description}</div>
        </div>
      </div>
      <div className="absolute w-full h-full flex justify-center items-center py-[32px] px-[24px] z-20">
        <TextContainer ref={containerRef}>
          {
            rush.item_summary?.match(/.{1,32}/g)?.map((line, index) => (
              <TextSequence key={index} className="rush-inline">
                {line.slice(0, 16)}<br />
                {line.slice(16)}
              </TextSequence>
            ))
          }
          {/* 상하위에 흐리게 효과를 주는 박스. absolute, top:0 bottom:0*/}
        </TextContainer>
      </div>
      <UtilBox>
        {/* 좋아요 */}
        <Like value={rush.item_likes} onClick={handleLike} />
        {/* 조회수 */}
        <Counter value={rush.item_views} />
        {/* 공유하기 */}
        <Share onClick={shareContent} />
        {/* 이니셜 카드 */}
        <InitialCard initial={rush.feed_name.slice(0, 1)} onClick={() => {
          router.push(rush.item_link);
        }} />
      </UtilBox>
    </Container>
  );
};

export default RushItem;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 460px;
  height: 795px;
  border-radius: 20px;
  opacity: 0.9;
  background: linear-gradient(45deg, #483d8b, #2c2f4a, #1c1b29, #353547, #1e1e2f, #3d3b72, #2a2a4a, #483d8b);
  background-size: 400% 400%;
  animation: gradientAnimation 10s ease infinite;

  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    25% { background-position: 50% 100%; }
    50% { background-position: 100% 50%; }
    75% { background-position: 50% 0%; }
    100% { background-position: 0% 50%; }
  }
`;

const TextContainer = styled.div`
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 450px;
  gap: 24px;
  position: relative;

  & > * {
    scroll-snap-align: start;
  }

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const TextSequence = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #a2a2a2;
  font-size: 28px;
  font-weight: 600;
  height: 120px;
  position: relative;
  scroll-snap-align: center;

  & > div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;


const UtilBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 16px;
  right: 24px;
  bottom: 24px;
  z-index: 100;

  @media (min-width: 768px) {
    right: -44px;
  }
`;