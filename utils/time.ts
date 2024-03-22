import dayjs from "dayjs";

export const formatDate = (date: any) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const getPublishDate = (item: any) => {
  const _date = item.update_time ?? item.date ?? item.pubDate;
  return formatDate(_date);
};

export const getCreateDate = (item: any) => {
  const _date = item.create_time ?? item.date ?? item.pubDate;
  return formatDate(_date);
};

export const filterYearDate = (dateList: any[]) => {
  /** 添加 year 字段，按照年份分组 */
  const yearFilterData = (dateList ?? [])
    ?.map((i) => {
      const _date = i.update_time ?? i.date ?? i.pubDate;
      return {
        ...i,
        year: dayjs(_date).year(),
      };
    }) // 按照年份分组
    .reduce(
      (acc, cur) => {
        const year = cur.year;
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(cur);
        return acc;
      },
      {} as Record<number, any[]>,
    );
  // 转换成数组，按照年份倒序
  const list = Object.entries(yearFilterData)
    .map(([year, data]) => {
      return {
        year: Number(year),
        data,
      };
    })
    .sort((a, b) => b.year - a.year);

  return list;
};
