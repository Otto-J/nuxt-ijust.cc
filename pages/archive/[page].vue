<template>
  <div class="w-full py-4">
    <var-cell>
      <template #icon>
        <icon size="28" name="openmoji:beating-heart" />
      </template>
      <div class="text-lg ml-2">
        岁月如歌，我已经写了
        <span class="underline font-bold text-red-500">{{ pager.total }}</span>
        篇公开的文章。
      </div>
    </var-cell>
    <div v-for="item of yearFilterDataArray" class="my-2" :key="item.year">
      <var-cell>
        <template #icon>
          <icon size="20" name="tdesign:time" />
        </template>
        <span class="text-md ml-2">{{ item.year }}</span>
      </var-cell>
      <nuxt-link v-for="i of item.data" :key="i._path" :to="i._path">
        <var-cell border>
          <div class="space-x-2">
            <var-badge type="success" :value="i._dir" />
            <span>{{ i.title }}</span>
          </div>

          <template #extra>
            <div class="w-24 text-right">
              {{ getPublishDate(i) }}
            </div>
          </template>
        </var-cell>
      </nuxt-link>
    </div>
    <div class="m-8 flex justify-center">
      <var-pagination
        v-model:current="pager.current"
        :total="pager.total"
        :size="pager.size"
        :show-size-changer="false"
        @change="onPagerChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ParsedContent } from "@nuxt/content/dist/runtime/types";
import dayjs from "dayjs";
const route = useRoute();
const router = useRouter();

const pager = reactive({
  current: 1,
  size: 20,
  total: 1,
});
// const total =
const onPagerChange = (current: number) => {
  pager.current = current;
  // refresh();
  router.push({
    path: `/archive/${current}`,
  });
};

const _routerPage = Number(route.params?.page);

const current = Number.isNaN(_routerPage) ? 1 : _routerPage;

pager.current = current < 1 ? 1 : current;

const getPublishDate = (item: ParsedContent) => {
  const _date = item.date ?? item.pubDate;
  return formatDate(_date);
};

// 优先判断页码
pager.total = await blogsCount();

const maxCurrent = computed(() => Math.ceil(pager.total / pager.size));

watchEffect(() => {
  // 判断当前的 current 是否大于实际页数，如果是默认为最大值
  if (pager.current > maxCurrent.value) {
    router.replace({
      path: `/archive/${maxCurrent.value}`,
    });
  } else if (pager.current < 1 || Number.isNaN(_routerPage)) {
    router.replace({
      path: `/archive/1`,
    });
  }
});

const { data, pending, error, refresh } = await useAsyncData("list", () => {
  const isErrPage = pager.current > maxCurrent.value || pager.current < 1;
  if (isErrPage) {
    return Promise.resolve([]);
  }
  console.log(1, "fetch");

  return queryContent("/")
    .where({
      _dir: {
        $in: ["blogs", "podcasts"],
      },
    })
    .sort({ date: -1 })
    .limit(pager.size)
    .skip((pager.current - 1) * pager.size)
    .find();
});

/** 添加 year 字段，按照年份分组 */
const yearFilterData = (data.value ?? [])
  ?.map((i) => {
    const _date = i.date ?? i.pubDate;
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
    {} as Record<number, ParsedContent[]>,
  );
// 转换成数组，按照年份倒序
const yearFilterDataArray = Object.entries(yearFilterData)
  .map(([year, data]) => {
    return {
      year: Number(year),
      data,
    };
  })
  .sort((a, b) => b.year - a.year);
console.log(22, yearFilterDataArray);
</script>

<style></style>
