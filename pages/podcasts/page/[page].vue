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

      <var-cell border v-for="i of item.data" :key="parseUrlByDoc(i)">
        <div class="space-x-2">
          <nuxt-link :to="`/${i._dir}`">
            <var-badge type="success" :value="i._dir" />
          </nuxt-link>
          <nuxt-link :to="parseUrlByDoc(i)">
            <span>{{ i.title }}</span>
          </nuxt-link>
        </div>

        <template #extra>
          <div class="w-24 text-right">
            {{ getPublishDate(i) }}
          </div>
        </template>
      </var-cell>
    </div>
    <div class="m-8 flex justify-center">
      <c-pager :pager="pager" :base-path="`/${category}/page`" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ParsedContent } from "@nuxt/content/dist/runtime/types";
import dayjs from "dayjs";

const category = "podcasts";
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
pager.total = await queryContent(category).where(commonWhere).count();

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
    .sort({ update_time: -1, date: -1 })
    .limit(pager.size)
    .skip((pager.current - 1) * pager.size)
    .find(),
);

// console.log(44, data.value);

// 转换成数组，按照年份倒序
yearFilterDataArray.value = filterYearDate(data.value ?? []);
</script>
