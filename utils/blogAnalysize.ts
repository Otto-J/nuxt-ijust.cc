export const blogsCount = () => {
  return queryContent("/")
    .where({
      _dir: {
        $in: ["blogs", "podcasts"],
      },
    })
    .count();
};
