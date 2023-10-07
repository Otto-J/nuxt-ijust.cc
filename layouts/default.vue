<template>
  <div class="container mx-auto layout-default">
    <div
      class="flex justify-between align-top md:space-x-4 flex-col md:flex-row"
    >
      <div class="md:w-3/12 w-full">
        <c-side-bar />
      </div>
      <div class="md:w-9/12 w-full">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup></script>

<style></style>
