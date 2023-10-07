import dayjs from "dayjs";

export const formatDate = (date: any) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const getPublishDate = (item: any) => {
  const _date = item.date ?? item.pubDate;
  return formatDate(_date);
};
