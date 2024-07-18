"use server";

import { tags } from "@services/tags";
import type { CompanySize, Feed } from "./types";
import { switchCompanySize } from "./utils";

const getServerFeedsParams = (params: FeedsClientRequestParams) => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    if (!value) {
      return acc;
    }

    const _key = (() => {
      switch (key) {
        case "companySizes":
          return "company_size";
        case "jobTagIds":
          return "job_tags";
        case "skillTagIds":
          return "skill_tags";
        case "page":
        case "company":
          return key;
        default:
          return null;
      }
    })();

    if (!_key) {
      return acc;
    }

    const _value = (() => {
      if (_key === "company_size" && Array.isArray(value)) {
        return value.map((v) => switchCompanySize(v as CompanySize).toString());
      }

      if (_key === "job_tags" && Array.isArray(value)) {
        return value.map((v) => v.toString());
      }

      if (_key === "skill_tags" && Array.isArray(value)) {
        return value.map((v) => v.toString());
      }

      if (_key === "page" && typeof value === "number" && value < 1) {
        return "1";
      }

      if (typeof value === "string" && value.trim() === "") {
        return null;
      }

      return value.toString();
    })();

    if (!_value) {
      return acc;
    }

    return {
      ...acc,
      [_key]: _value,
    };
  }, {} as Record<string, string | string[]>);
};

type ServerFeed = {
  company_size: number;
  feed_link: string;
  feed_name: string;
  feed_title: string;
  item_description: string;
  item_id: 0;
  item_link: string;
  item_published: string;
  item_thumbnail: string;
  item_title: string;
  job_tags_id_arr: number[];
  skill_tags_id_arr: number[];
};

type FeedsServerResponse = {
  page: number;
  per_page: number;
  total_page: number;
  total_count: number;
  data: ServerFeed[];
};

type FeedsClientResponse = {
  page: number;
  perPage: number;
  totalPage: number;
  totalCount: number;
  feeds: Feed[];
};

type FeedsClientRequestParams = {
  page: number;
  company?: string;
  companySizes?: CompanySize[];
  jobTagIds?: number[];
  skillTagIds?: number[];
};

type GetFeeds = (
  params: FeedsClientRequestParams
) => Promise<FeedsClientResponse>;

export const getFeeds: GetFeeds = async (params) => {
  const searchParams = new URLSearchParams();

  Object.entries(getServerFeedsParams(params)).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v, index) => {
        if (index === 0) {
          searchParams.set(key, v);

          return;
        }

        searchParams.append(key, v);
      });

      return;
    }

    searchParams.set(key, value);
  });

  const apiUrl = new URL(
    `${process.env.API_URL}/v1/item?${searchParams.toString()}`
  );

  const response = await fetch(apiUrl, {
    next: {
      tags: tags.feedTags.feeds,
    },
  }).then<FeedsServerResponse>((res) => res.json());

  const feeds = (response?.data ?? []).map((feed) => {
    const published = (() => {
      try {
        return new Date(feed.item_published);
      } catch (error) {
        return null;
      }
    })();

    return {
      id: feed.item_id,
      title: feed.item_title,
      description: feed.item_description,
      link: feed.item_link,
      thumbnail: feed.item_thumbnail,
      published,
      company: {
        title: feed.feed_title,
        name: feed.feed_name,
        link: feed.feed_link,
        size: switchCompanySize(feed.company_size),
      },
      jobTagIds: feed.job_tags_id_arr,
      skillTagIds: feed.skill_tags_id_arr,
    };
  });

  return {
    page: response.page,
    perPage: response.per_page,
    totalPage: response.total_page,
    totalCount: response.total_count,
    feeds,
  };
};

type JobTag = {
  id: number;
  name: string;
};

type GetJobTags = () => Promise<JobTag[]>;

export const getJobTags: GetJobTags = async () => {
  const apiUrl = new URL(`${process.env.API_URL}/v1/tag/job`);

  const response = await fetch(apiUrl, {
    next: {
      tags: tags.feedTags.jobs,
    },
  }).then<JobTag[]>((res) => res.json());

  return response;
};

type SkillTag = {
  id: number;
  name: string;
};

type GetSkillTags = () => Promise<SkillTag[]>;

export const getSkillTags: GetSkillTags = async () => {
  const apiUrl = new URL(`${process.env.API_URL}/v1/tag/skill`);

  const response = await fetch(apiUrl, {
    next: {
      tags: tags.feedTags.skills,
    },
  }).then<SkillTag[]>((res) => res.json());

  return response;
};
