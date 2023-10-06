<template>
  <div class="p-2">
    <ContentDoc v-slot="{ doc }">
      <h1>{{ doc.title }}</h1>
      <article class="prose">
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>
  </div>
</template>
<script lang="ts" setup></script>

<style></style>
