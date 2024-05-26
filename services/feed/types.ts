export type Feed = {
  id: number;
  title: string;
  description: string;
  link: string;
  thumbnail: Nullable<string>;
  published: Nullable<Date>;
  company: {
    title: string;
    name: string;
    link: Nullable<string>;
    size: CompanySize;
  };
  jobTagIds: number[];
  skillTagIds: number[];
};

export type CompanySize = "startup" | "small" | "medium" | "large" | "foreign";
