<template>
  <var-app-bar safe-area-top color="green">
    <template #default> 标题 </template>
    <template #left>
      <var-button round text color="transparent" text-color="#fff">
        <var-icon name="menu" :size="24" />
      </var-button>
    </template>

    <template #right>
      <var-button round text color="transparent" text-color="#fff">
        <var-icon name="map-marker-radius" :size="24" />
        首页
      </var-button>
      <var-button round text color="transparent" text-color="#fff">
        <var-icon name="star" :size="24" />归档
      </var-button>
      <var-button round text color="transparent" text-color="#fff">
        <var-icon name="heart" :size="24" />关于
      </var-button>
    </template>
  </var-app-bar>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const active = ref(0);
</script>

<style></style>
