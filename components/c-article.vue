<template>
  <var-paper :elevation="2" class="container p-2 px-8 markdown-body">
    <ContentDoc v-slot="{ doc }">
      <h1 class="text-3xl text-center mt-10 mb-4">{{ doc.title }}</h1>
      <div
        class="flex justify-center items-center space-x-4 mb-4 text-gray-700 text-sm"
      >
        <p>
          <span>发布于</span>
          <nuxt-link class="underline ml-1" :to="doc._path">{{
            formatDate(doc.date)
          }}</nuxt-link>
        </p>
        <p>
          <span>归类</span>
          <nuxt-link class="underline ml-1" :to="`/${doc._dir}`">
            {{ doc._dir }}
          </nuxt-link>
        </p>
        <p v-if="Array.isArray(doc.tags)">
          <span>Tag</span>
          <nuxt-link
            :to="`/tags/${item}`"
            v-for="(item, index) of doc.tags"
            :key="index"
            v-text="item"
            class="ml-1 underline"
          >
          </nuxt-link>
        </p>
      </div>

      <ProseBlockquote v-if="doc.description">{{
        doc.description
      }}</ProseBlockquote>
      <ContentRenderer
        class="mt-8 w-full max-w-none"
        tag="article"
        :value="doc"
      />
    </ContentDoc>
    <div class="my-10 border-b-2 border-gray-200" />
  </var-paper>
</template>
<script lang="ts" setup>
// const route = useRoute();
</script>

<style></style>
