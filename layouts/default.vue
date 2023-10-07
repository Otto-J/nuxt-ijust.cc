<template>
  <div class="container mx-auto layout-default">
    <div class="flex justify-between align-top space-x-4">
      <div class="w-3/12">
        <c-side-bar />
      </div>
      <div class="w-9/12">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>

<style></style>
