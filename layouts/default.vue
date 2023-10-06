<template>
  <div class="container mx-auto layout-default">
    <var-row :gutter="[20, 20]">
      <var-col :span="6">
        <c-side-bar />
      </var-col>
      <var-col :span="18">
        <slot />
      </var-col>
    </var-row>
  </div>
</template>
<script lang="ts" setup></script>

<style></style>
