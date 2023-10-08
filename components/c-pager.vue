<template>
  <!-- 上一页 -->
  <nuxt-link v-if="pager.current > 1" :to="goPrev">
    <var-button text type="primary">
      <icon name="material-symbols:chevron-left" />
      <span>Prev</span>
    </var-button>
  </nuxt-link>
  <var-button text disabled>
    {{ pager.current }} /
    {{ maxPage }}
  </var-button>
  <!-- 下一页 -->
  <nuxt-link v-if="pager.current < maxPage" :to="goNext">
    <var-button text type="primary">
      <span>Next</span>
      <icon name="material-symbols:chevron-right" />
    </var-button>
  </nuxt-link>
</template>
<script lang="ts" setup>
const props = defineProps<{
  pager: {
    current: number;
    size: number;
    total: number;
  };
  basePath: string;
}>();

const maxPage = computed(() => Math.ceil(props.pager.total / props.pager.size));

const goPrev = computed(() => {
  return {
    path: `${props.basePath}/${props.pager.current - 1}`,
  };
});
const goNext = computed(() => {
  return {
    path: `${props.basePath}/${props.pager.current + 1}`,
  };
});
</script>

<style></style>
