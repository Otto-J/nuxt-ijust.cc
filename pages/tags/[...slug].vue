<template>
  <client-only>
    <div class="w-full py-4">
      <var-cell>
        <template #icon>
          <icon size="28" name="openmoji:beating-heart" />
        </template>
        <div class="text-lg ml-2">
          <span>岁月如歌，我已经写了有关</span>
          <span class="font-bold text-red-500 mx-1">
            {{ tag }}
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
    </div>
  </client-only>
</template>
<script lang="ts" setup>
import { ParsedContent } from "@nuxt/content/dist/runtime/types";
import dayjs from "dayjs";
const route = useRoute();

const tag = route.params.slug?.[0];

const pager = reactive({
  current: 1,
  size: 50,
  total: 1,
});

const commonWhere = {
  _partial: false,
  tags: {
    $in: [tag],
  },
};

// 优先判断页码
pager.total = await queryContent("/").where(commonWhere).count();

const yearFilterDataArray = ref<
  Array<{
    year: number;
    data: any;
  }>
>([]);

const key = `tag-${tag}`;
const { data } = await useAsyncData(key, () =>
  queryContent("/").where(commonWhere).limit(pager.size).find(),
);

// 转换成数组，按照年份倒序
yearFilterDataArray.value = filterYearDate(data.value ?? []);
</script>

<style></style>
