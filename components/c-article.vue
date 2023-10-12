<template>
  <var-paper :elevation="2" class="container p-2 md:px-8 px-4 markdown-body">
    <h1 class="text-3xl text-center md:mt-10 md:mb-4 my-2">
      {{ doc.title }}
    </h1>
    <div
      class="flex flex-wrap justify-center items-center space-x-4 mb-4 text-gray-700 text-sm"
    >
      <p>
        <span>发布于</span>
        <nuxt-link class="underline ml-1" :to="parseUrlByDoc(doc)">{{
          getPublishDate(doc)
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

    <div class="my-10 border-b-2 border-gray-200" />
  </var-paper>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    category: string;
  }>(),
  {
    category: "blogs",
  },
);

const route = useRoute();

const slug = computed(() => route.params.slug?.[0] as string);

const doc = await queryContent(props.category)
  .where({
    _partial: false,
    $or: [
      {
        _path: {
          // blogs/原本的 path
          $eq: slug.value
            ? `/${props.category}/${slug.value}`
            : `/${props.category}`,
        },
      },
      {
        slug: slug.value,
      },
    ],
  })
  // .find();
  .findOne();

// console.log("5content", doc);
</script>

<style></style>
