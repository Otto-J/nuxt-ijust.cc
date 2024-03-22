<template>
  <div
    v-for="article in list"
    :key="parseUrlByDoc(article)"
    class="post-item hover:bg-gray-100 dark:hover:bg-gray-600 border-b border-gray-200 dark:border-gray-600 p-4 flex flex-col justify-center space-x-0 space-y-2 lg:space-y-0 lg:justify-start lg:items-start lg:space-x-2 lg:flex-row"
  >
    <!-- cover -->
    <template v-if="!!postCover(article.body.children ?? [])">
      <nuxt-link class="contents" :to="parseUrlByDoc(article)">
        <NuxtImg
          :src="postCover(article.body.children ?? [])!"
          placeholder
          width="300"
          height="125"
          fit="fit"
        />
      </nuxt-link>
    </template>
    <p v-else class="w-full lg:w-[300px] h-20 flex justify-center items-center">
      <span class="lg:block">没有封面图</span>
      <span class="hidden"></span>
    </p>
    <!-- info -->
    <div class="text-gray-900 dark:text-gray-200 flex-grow">
      <nuxt-link :to="parseUrlByDoc(article)">
        <p class="post-title text-md mb-2">
          {{ article.title }}
        </p>
        <p class="post-desc text-sm">{{ baseDesc }}</p>
        <p class="post-desc text-sm">
          {{ parseDesc(article) }}
        </p>
      </nuxt-link>
      <div
        class="flex flex-col items-start lg:items-end lg:flex-row lg:space-x-2"
      >
        <div class="post-tags space-x-2 mt-2">
          <template v-if="(article.tags ?? []).includes('FM')">
            <nuxt-link :to="`tags/FM`">
              <var-badge :color="pkOrange" value="#FM" />
            </nuxt-link>
          </template>
          <template v-else>
            <nuxt-link v-for="item of article.tags ?? []" :to="`/tags/${item}`">
              <var-badge :color="pkGreen" :value="`#${item}`" />
            </nuxt-link>
          </template>
        </div>
        <div
          class="post-info-footer flex justify-start items-center space-x-2 mt-2"
        >
          <p
            class="text-right text-sm text-gray-500 dark:text-gray-200 space-x-2"
          >
            <span>创建: {{ getCreateDate(article) }}</span>
            <span>更新: {{ getPublishDate(article) }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  list: any[];
}>();

const pkOrange = "#ffb11b";
const pkGreen = "#00c48f";

interface PostDetailInfo {
  children?: PostDetailInfo[];
  props: any;
  tag: string;
  type: string;
}

const postCover = (contentList: PostDetailInfo[]) => {
  //  深度优先递归查找第一个 tag=img type='element' 的图片元素，去除 src 属性
  const findCover = (contentList: PostDetailInfo[]): string | undefined => {
    for (const item of contentList) {
      if (item.tag === "img" && item.type === "element") {
        return item.props.src;
      }
      if (item.children) {
        const result = findCover(item.children);
        if (result) {
          return result;
        }
      }
    }
  };
  const item = findCover(contentList);
  if (item) {
    return item;
  } else {
    // console.log("未找到");
    return null;
  }
};

const baseDesc = "本文包含的段落标题：";

const parseDesc = (article: any) => {
  const base = "";
  const maxLen = 120;
  const str = article.body.toc.links
    .filter((i: any) => i.depth === 2)
    .map((i: any) => i.text)
    .join(" / ");

  if (str.length > maxLen) {
    return `${base}\n${str.slice(0, maxLen) + "..."}`;
  } else {
    return base + str;
  }
};
</script>

<style></style>
