import Link from "next/link";
import FeedThumbnail from "./feed-thumbnail";

type FeedDescriptionProps = {
  title: string;
  company: string;
  companyLink: Nullable<string>;
  writer: string;
  published: Nullable<Date>;
};

const FeedDescription = ({
  title,
  company,
  companyLink,
  writer,
  published,
}: FeedDescriptionProps) => {
  return (
    <div className="stack gap-[10px] w-[310px]">
      <h3 className="text-xs text-[#e3e3e3]">
        {[company, published ? format(published) : null]
          .filter(Boolean)
          .join(" / ")}
      </h3>
      <h2 className="font-bold text-[#f8f9fe]">{title}</h2>
      <h3 className="text-sm text-[#f5f5f5]">{writer}</h3>
    </div>
  );
};

const format = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}.${month}.${day}`;
};

type FeedItemProps = {
  link: string;
  thumbnail: Nullable<string>;
  title: string;
  company: string;
  companyLink: Nullable<string>;
  writer: string;
  published: Nullable<Date>;
};

const FeedItem = ({
  link,
  thumbnail,
  title,
  company,
  companyLink,
  writer,
  published,
}: FeedItemProps) => {
  return (
    <Link href={link}>
      <div className="stack justify-center items-center gap-10 rounded-[10px] px-4 py-[14px] bg-background">
        <FeedThumbnail thumbnail={thumbnail} title={title} />
        <FeedDescription
          title={title}
          company={company}
          companyLink={companyLink}
          writer={writer}
          published={published}
        />
      </div>
    </Link>
  );
};

export default FeedItem;

export const FeedItemSkeleton = () => {
  return (
    <div className="stack gap-[10px] rounded-[10px] px-4 py-[14px]">
      <div className="w-[310px] h-[180px] rounded-[10px] bg-[#767679]" />
      <div className="stack gap-[10px] w-[310px]">
        <div className="w-[200px] h-[14px] rounded-[5px] bg-[#767679]" />
        <div className="w-[310px] h-[20px] rounded-[5px] bg-[#767679]" />
        <div className="w-[310px] h-[14px] rounded-[5px] bg-[#767679]" />
      </div>
    </div>
  );
};
