<template>
  <div class="px-2">
    <div class="markdown-body px-4 border rounded-lg mb-8 mt-8 border-gray-300">
      <ContentRenderer :value="intro!">
        <ContentRendererMarkdown :value="intro!" />
      </ContentRenderer>
    </div>
    <ContentList :query="recent5Posts">
      <template #default="{ list }">
        <div
          v-for="article in list"
          :key="parseUrlByDoc(article)"
          class="hover:bg-gray-100 dark:hover:bg-gray-600 border-b border-gray-200 dark:border-gray-600 p-4 flex flex-col justify-between items-start space-y-2"
        >
          <div class="flex items-endjustify-start space-x-2">
            <nuxt-link :to="parseUrlByDoc(article)">
              <p class="text-base mb-2">{{ article.title }}</p>
            </nuxt-link>
            <nuxt-link :to="`/${article._dir}`">
              <var-badge :color="pkOrange" :value="`#${article._dir}`" />
            </nuxt-link>
          </div>
          <nuxt-link :to="parseUrlByDoc(article)">
            <p class="text-sm text-gray-500 dark:text-gray-200">
              {{ article.description }}
            </p>
          </nuxt-link>

          <div class="text-right text-sm text-gray-500 dark:text-gray-200">
            update: {{ getPublishDate(article) }}
          </div>
        </div>
      </template>
      <template #not-found>
        <p>No articles found.</p>
      </template>
    </ContentList>

    <div class="m-8 flex justify-center">
      <NuxtLink to="/archive/1">
        <var-button :color="pkOrange" text-color="#fff">查看更多</var-button>
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";

const { data: intro } = await useAsyncData("page-data", () =>
  queryContent("about", "_intro").where({ _partial: true }).findOne(),
);

const pkOrange = "#ffb11b";

const pager = reactive({
  current: 1,
  size: 6,
  total: 1,
});

const recent5Posts: QueryBuilderParams = {
  path: "/",
  where: [
    {
      _dir: {
        $in: ["blogs", "podcasts"],
      },
    },
  ],
  limit: pager.size,
  skip: (pager.current - 1) * pager.size,

  sort: [{ date: -1 }],
};

const _temp = await queryContent(recent5Posts).find();
// console.log("44", _temp);

const count = await blogsCount();
pager.total = count;

// useSeoMeta({
//   title: "[title]",
//   description: "[description]",
//   ogTitle: "[og:title]",
//   ogDescription: "[og:description]",
//   ogImage: "[og:image]",
//   ogUrl: "[og:url]",
//   twitterTitle: "[twitter:title]",
//   twitterDescription: "[twitter:description]",
//   twitterImage: "[twitter:image]",
//   twitterCard: "summary",
// });
</script>

<style></style>
