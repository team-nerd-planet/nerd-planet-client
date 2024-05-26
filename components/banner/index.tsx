import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative w-full h-[108px]">
      <Image
        src="/images/banner.png"
        alt="banner"
        fill
        priority
        className="rounded-[10px] object-cover"
      />
      <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="tablet:hidden text-xl font-bold cursor-default">
          I’m in NerdPlanet
        </p>
        <p className="hidden tablet:block text-2xl laptop:text-[28px] font-bold cursor-default">
          I’m in NerdPlanet, 기술의 궤도에 오르다
        </p>
      </div>
    </div>
  );
};

export default Banner;
