<template>
  <div class="w-full py-4">
    <var-cell>
      <template #icon>
        <icon size="28" name="openmoji:beating-heart" />
      </template>
      <div class="text-lg ml-2">
        岁月如歌，我已经写了
        <span class="font-bold text-red-500">{{ pager.total }}</span>
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
      <c-pager :pager="pager" base-path="/archive" />
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
  size: 10,
  total: 1,
});

const _routerPage = Number(route.params?.page);

const current = Number.isNaN(_routerPage) ? 1 : _routerPage;

pager.current = current < 1 ? 1 : current;

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

const yearFilterDataArray = ref<any[]>([]);

const key = "archive-" + pager.current;
const { data } = await useAsyncData(key, () => {
  return queryContent("/")
    .where({
      _dir: {
        $in: ["blogs", "podcasts"],
      },
      _partial: false,
    })
    .sort({ update_time: -1, date: -1 })
    .limit(pager.size)
    .skip((pager.current - 1) * pager.size)
    .find();
});

// 转换成数组，按照年份倒序
yearFilterDataArray.value = filterYearDate(data.value ?? []);
</script>

<style></style>
