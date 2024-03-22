<template>
  <div class="m-8 flex justify-center space-x-2">
    <NuxtLink v-for="item of maxPage" :key="item" :to="`${prefix}/${item}`">
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
const props = withDefaults(
  defineProps<{
    prefix: string;
    pager: {
      current: number;
      size: number;
      total: number;
    };
  }>(),
  {
    prefix: "/archive",
    pager: () => ({
      current: 1,
      size: 10,
      total: 1,
    }),
  },
);

const pkOrange = "#ffb11b";
const pkGreen = "#00c48f";

const maxPage = computed(() => Math.ceil(props.pager.total / props.pager.size));
</script>

<style></style>
