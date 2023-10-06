<template>
  <!-- <var-app-bar title="标题" /> -->

  <div class="container mx-auto">
    <var-row>
      <var-col :span="6">
        <c-side-bar />
      </var-col>
      <var-col :span="18">
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
                      <div class="text-slate-800 text-sm">
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
        </div>
      </var-col>
    </var-row>
  </div>
</template>
<script lang="ts" setup>
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
const recent5Posts: QueryBuilderParams = {
  path: "/podcasts",
  where: [{}],
  limit: 5,
  sort: [{ date: -1 }],
};

import { ref } from "vue";

const active = ref(0);
</script>

<style></style>
