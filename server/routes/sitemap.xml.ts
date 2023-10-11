import { serverQueryContent } from "#content/server";
import { SitemapStream, streamToPromise } from "sitemap";
// import { parseUrlByDoc } from "#content/utils/parse-url";

const parseUrlByDoc = (article: any) => {
  // const baseUrl = articl
  if (article.slug) {
    // 优先 slug
    return article._dir + "/" + article.slug;
  } else {
    return article._path;
  }
};

export default defineEventHandler(async (event) => {
  // Fetch all documents
  const docs = await serverQueryContent(event).find();
  const sitemap = new SitemapStream({
    hostname: "https://ijust.cc",
  });

  for (const doc of docs) {
    sitemap.write({
      url: parseUrlByDoc(doc),
      changefreq: "monthly",
    });
  }
  sitemap.end();

  return streamToPromise(sitemap);
});
