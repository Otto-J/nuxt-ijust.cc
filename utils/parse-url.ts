export const parseUrlByDoc = (article: any) => {
  // const baseUrl = articl
  if (article.slug) {
    // 优先 slug
    return "/" + article._dir + "/" + article.slug;
  } else {
    return article._path;
  }
};
