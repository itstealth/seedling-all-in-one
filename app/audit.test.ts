import { expect, test } from "vitest";
import { GET as blog } from "./blog/route";
import { GET as post } from "./blog/[...slug]/route";
import sitemap from "./sitemap";
import robots from "./robots";
import config from "../next.config";

test("the retired blog and every nested path return Gone", () => {
  expect(blog().status).toBe(410);
  expect(post().status).toBe(410);
});

test("the group sitemap excludes the retired blog and robots advertises it", () => {
  const entries = sitemap();
  expect(entries.map(entry => entry.url)).toEqual([
    "https://seedlingschools.com", "https://seedlingschools.com/schools",
    "https://seedlingschools.com/wonderland", "https://seedlingschools.com/career", "https://seedlingschools.com/admissions",
  ]);
  expect(robots().sitemap).toBe("https://seedlingschools.com/sitemap.xml");
});

test("legacy destinations preserve admissions and careers intent", async () => {
  const redirects = await config.redirects!();
  expect(redirects).toEqual(expect.arrayContaining([
    expect.objectContaining({ source: "/admission-online.php", destination: "https://seedlingschools.com/admissions/apply", permanent: true }),
    expect.objectContaining({ source: "/career.php", destination: "https://seedlingschools.com/career", permanent: true }),
    expect.objectContaining({ source: "/swkl.php", destination: "https://seedlingschools.com/wonderland", permanent: true }),
  ]));
});
