// eslint-disable-next-line import/no-anonymous-default-export
export default {
  siteUrl: "https://nerdplanet.app",
  changefreq: "daily",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  priority: 1,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*"],
      },
    ],
  },
};
