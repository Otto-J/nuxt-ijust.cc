<template>
  <div class="w-full py-4">
    <var-cell>
      <template #icon>
        <icon size="28" name="openmoji:beating-heart" />
      </template>
      <div class="text-lg ml-2">
        <span>岁月如歌，我已经写了有关</span>
        <span class="font-bold text-red-500 mx-1">
          {{ category }}
        </span>
        <span>的</span>
        <span class="font-bold text-red-500 mx-1">{{ pager.total }}</span>
        <span>篇公开文章。</span>
      </div>
    </var-cell>
    <div v-for="item of yearFilterDataArray" class="my-2" :key="item.year">
      <var-cell>
        <template #icon>
          <icon size="20" name="tdesign:time" />
        </template>
        <span class="text-md ml-2">{{ item.year }}</span>
      </var-cell>

      <StandardListItem :list="item.data"></StandardListItem>
    </div>
    <div class="m-8 flex justify-center">
      <c-pager :pager="pager" :prefix="`/${category}/page`" />
    </div>
  </div>
</template>
<script lang="ts" setup>
const category = "blogs";
const commonWhere = {
  _partial: false,
};
const route = useRoute();

const pager = reactive({
  current: 1,
  size: 10,
  total: 1,
});
// 优先判断页码
const { data: categoryCount } = await useAsyncData(
  "articleCount",
  async () => await queryContent(category).where(commonWhere).count(),
);

pager.total = categoryCount.value ?? 1;

let current = Number(route.params?.page) || 1;

const maxCurrent = computed(() => Math.ceil(pager.total / pager.size));

// min max
current = current < 1 ? 1 : current;
current = current > maxCurrent.value ? maxCurrent.value : current;
pager.current = current;

const yearFilterDataArray = ref<
  Array<{
    year: number;
    data: any;
  }>
>([]);

const key = `list-${category}-${pager.current}`;
const { data } = await useAsyncData(key, () =>
  queryContent(category)
    .where(commonWhere)
    .sort({ create_time: -1, date: -1 })
    .limit(pager.size)
    .skip((pager.current - 1) * pager.size)
    .find(),
);

// 转换成数组，按照年份倒序
yearFilterDataArray.value = filterYearDate(data.value ?? []);
</script>
