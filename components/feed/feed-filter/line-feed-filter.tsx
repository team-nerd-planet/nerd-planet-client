import { CompanySize } from "@services/feed/types";
import { FeedFilterContainer } from "./feed-filter-container";

const LineFeedFilter = ({
  company,
  companySizes,
  jobTagIds,
  skillTagIds,
}: {
  company: string | undefined;
  companySizes: CompanySize[];
  jobTagIds: number[];
  skillTagIds: number[];
}) => {
  return (
    <div className="relative">
      <div className="toggle-wrapper laptop:hidden">
        <div className="text-[20px] text-white font-semibold pl-[10px]">
          상세조건
        </div>
        <input type="checkbox" id="toggle-panel" className="toggle-input" />
        <label htmlFor="toggle-panel" className="toggle-slider"></label>
        <div className="filter-window absolute top-[36px] w-full p-[36px] h-fit bg-[#26272b] rounded-[20px] z-[99]">
          <FeedFilterContainer
            filterOptions={{
              company,
              companySizes,
              jobTagIds,
              skillTagIds,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LineFeedFilter;
