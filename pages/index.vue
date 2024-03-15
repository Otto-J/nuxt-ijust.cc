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

            <template v-if="(article.tags ?? []).includes('FM')">
              <nuxt-link :to="`tags/FM`">
                <var-badge :color="pkOrange" value="#FM" />
              </nuxt-link>
            </template>
            <template v-else>
              <nuxt-link :to="`/${article._dir}`">
                <var-badge :color="pkGreen" :value="`#${article._dir}`" />
              </nuxt-link>
            </template>
          </div>
          <nuxt-link :to="parseUrlByDoc(article)">
            <p class="text-sm text-gray-500 dark:text-gray-200">
              {{ article.description }}
            </p>
          </nuxt-link>

          <div class="text-right text-sm text-gray-500 dark:text-gray-200">
            更新日期: {{ getPublishDate(article) }}
          </div>
        </div>
      </template>
      <template #not-found>
        <p>No articles found.</p>
      </template>
    </ContentList>

    <div class="m-8 flex justify-center space-x-2">
      <NuxtLink
        v-for="item of totalListNumber"
        :key="item"
        :to="`/archive/${item}`"
      >
        <var-button :color="pkGreen" text-color="#fff"> {{ item }} </var-button>
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
const pkGreen = "#00c48f";

const pager = reactive({
  current: 1,
  size: 6,
  total: 1,
});

const totalListNumber = computed(() => Math.ceil(pager.total / 10));

const recent5Posts: QueryBuilderParams = {
  path: "/",
  where: [
    {
      _dir: {
        $in: ["blogs", "podcasts"],
      },
    },
  ],
  sort: [{ create_time: -1, date: -1 }],
  limit: pager.size,
  skip: (pager.current - 1) * pager.size,
};

const { data: articleCount } = await useAsyncData(
  "articleCount",
  async () => await blogsCount().count(),
);

pager.total = articleCount.value ?? 1;

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
