<template>
  <div class="w-full py-4">
    <var-cell>
      <template #icon>
        <icon size="28" name="openmoji:beating-heart" />
      </template>
      <div class="text-lg ml-2">
        <span>岁月如歌，我已经写了有关</span>
        <span class="font-bold text-red-500 mx-1">
          {{ props.category }}
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
      <c-pager :pager="pager" :prefix="`/${props.category}/page`" />
    </div>
  </div>
</template>
<script lang="ts" setup>
// import dayjs from "dayjs";
const route = useRoute();
const router = useRouter();

const props = defineProps<{
  category: string;
}>();

const pager = reactive({
  current: 1,
  size: 10,
  total: 1,
});

const commonWhere = {
  _partial: false,
};

// 优先判断页码
pager.total = await queryContent(props.category).where(commonWhere).count();

const _routerPage = Number(route.params?.page);
const handlePageCase = () => {
  const maxCurrent = Math.ceil(pager.total / pager.size);

  const current = Number.isNaN(_routerPage) ? 1 : _routerPage;
  pager.current = current < 1 ? 1 : current;
  // 判断当前的 current 是否大于实际页数，如果是默认为最大值
  if (pager.current > maxCurrent) {
    router.replace({
      path: "`/${props.category}/page/${maxCurrent}``",
    });
  } else if (pager.current < 1 || Number.isNaN(_routerPage)) {
    router.replace({
      path: "`/${props.category}/page/1`",
    });
  }
};

handlePageCase();

const yearFilterDataArray = ref<
  Array<{
    year: number;
    data: any;
  }>
>([]);

const handleList = async () => {
  const key = `list-${props.category}-${pager.current}`;
  const { data } = await useAsyncData(key, () =>
    queryContent(props.category)
      .where(commonWhere)
      .sort({ update_time: -1, date: -1 })
      .limit(pager.size)
      .skip((pager.current - 1) * pager.size)
      .find(),
  );

  // 转换成数组，按照年份倒序
  yearFilterDataArray.value = filterYearDate(data.value ?? []);
};

// onMounted(() => {
handleList();
// });
</script>

<style></style>
