<template>
  <div class="px-2">
    <ContentList :query="recent5Posts" path="/podcasts">
      <template #default="{ list }">
        <var-space direction="column" size="large">
          <NuxtLink
            :to="article._path"
            v-for="article in list"
            :key="article._path"
          >
            <var-card
              :title="article.title"
              :description="article.description"
              src="https://varlet.gitee.io/varlet-ui/cat.jpg"
            >
              <template #extra>
                <div class="text-gray-800 text-sm">
                  {{ article.date }}
                </div>
              </template>
            </var-card>
          </NuxtLink>
        </var-space>
      </template>
      <template #not-found>
        <p>No articles found.</p>
      </template>
    </ContentList>

    <div class="m-8 flex justify-center">
      <!-- <var-pagination
              v-model:current="pager.current"
              :total="pager.total"
              :size="pager.size"
              :show-size-changer="false"
              @change="onPagerChange"
            /> -->
      <NuxtLink to="/archive">
        <var-button type="primary">查看更多</var-button>
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
import { ref } from "vue";

const pager = reactive({
  current: 1,
  size: 4,
  total: 10,
});

// const content = await queryContent("")
//   // .where([{}])
//   .limit(pager.size)
//   .skip((pager.current - 1) * pager.size)

//   .sort({ date: -1 })
//   .find();
// console.log(content);

const recent5Posts: QueryBuilderParams = {
  path: "/",
  where: [{}],
  limit: pager.size,
  skip: (pager.current - 1) * pager.size,

  sort: [{ date: -1 }],
};

const count = await blogsCount();
pager.total = count;

const onPagerChange = (current: number) => {
  pager.current = current;
};

const active = ref(0);

useSeoMeta({
  title: "[title]",
  description: "[description]",
  ogTitle: "[og:title]",
  ogDescription: "[og:description]",
  ogImage: "[og:image]",
  ogUrl: "[og:url]",
  twitterTitle: "[twitter:title]",
  twitterDescription: "[twitter:description]",
  twitterImage: "[twitter:image]",
  twitterCard: "summary",
});
</script>

<style></style>
