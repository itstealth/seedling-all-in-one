import type { MetadataRoute } from "next";

const BASE_URL = "https://seedlingschools.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/schools", "/wonderland", "/career", "/admissions"].map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.8 : 1,
  }));
}
