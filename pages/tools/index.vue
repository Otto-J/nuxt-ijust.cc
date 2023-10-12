<template>
  <div class="w-full py-4">
    <var-cell>
      <template #icon>
        <icon size="28" name="openmoji:beating-heart" />
      </template>
      <div class="text-lg ml-2">
        <span>最近尝试做了一些小工具</span>
      </div>
    </var-cell>

    <var-cell>
      <RouterLink to="/tools/canvas">
        <var-button type="info">文章 Banner 快速生成</var-button>
      </RouterLink>
    </var-cell>
  </div>
</template>
<script lang="ts" setup></script>

<style></style>
