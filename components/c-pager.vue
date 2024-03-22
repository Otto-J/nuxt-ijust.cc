<template>
  <div class="m-8 flex justify-center space-x-2">
    <NuxtLink v-for="item of maxPage" :key="item" :to="`/archive/${item}`">
      <var-button
        :color="item === pager.current ? pkOrange : pkGreen"
        text-color="#fff"
      >
        {{ item }}
      </var-button>
    </NuxtLink>
  </div>
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

const pkOrange = "#ffb11b";
const pkGreen = "#00c48f";

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
