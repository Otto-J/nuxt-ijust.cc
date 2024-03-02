<template>
  <var-paper :elevation="2" class="container p-2 md:px-8 px-4 markdown-body">
    <template v-if="doc">
      <h1 class="text-3xl text-center md:mt-10 md:mb-4 my-2">
        {{ doc.title }}
      </h1>
      <div
        class="flex flex-wrap justify-center items-center space-x-4 mb-4 text-gray-700 text-sm"
      >
        <p v-if="doc.create_time">
          <span>发布于</span>
          <nuxt-link class="underline ml-1" :to="parseUrlByDoc(doc)">{{
            formatDate(doc.create_time)
          }}</nuxt-link>
        </p>
        <p>
          <span>更新于</span>
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
      >
        <template #empty>
          <p>No content found.</p>
        </template>
      </ContentRenderer>

      <div class="my-10 border-b-2 border-gray-200" />
    </template>
    <template v-else>
      <p>Loading...</p>
    </template>
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

const key = computed(() => {
  return slug.value ? `/${props.category}/${slug.value}` : `/${props.category}`;
});
const { data: doc } = useAsyncData(key.value, async () => {
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
  return doc!;
});
const appConfig = useAppConfig();

useSeoMeta({
  title: () =>
    doc.value
      ? `${doc.value.title} - ${appConfig.website_title}`
      : appConfig.website_title,
  description: () =>
    `${doc.value?.description || appConfig.website_description}`,

  ogTitle: () => `${doc.value?.title || appConfig.website_title}`,
  ogDescription: () =>
    `${doc.value?.description || appConfig.website_description}`,

  twitterTitle: () => `${doc.value?.title || appConfig.website_title}`,
  twitterDescription: () =>
    `${doc.value?.description || appConfig.website_description}`,

  twitterCard: "summary_large_image",
  ogImage: () =>
    doc.value
      ? `https://f.ijust.cc/release/?title=${encodeURIComponent(doc.value.title!)}`
      : `https://f.ijust.cc/release/?title=${encodeURIComponent(appConfig.website_title)}`,
});

// console.log("5content", doc);
</script>

<style></style>
