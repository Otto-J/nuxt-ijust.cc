<template>
  <var-sticky id="left-bar" class="w-full">
    <div
      class="title text-white bg-black py-8 flex justify-center items-center flex-col"
    >
      <h1 class="text-xl">咿呀 能跑就行！&nbsp;</h1>
      <p class="text-sm mt-4">Solo Place.</p>
    </div>
    <var-space direction="column">
      <div class="py-2">
        <!-- list -->
        <var-paper :elevation="2">
          <nuxt-link to="/">
            <var-cell ripple title="Home" class="hover:bg-slate-100">
              <template #icon>
                <var-icon name="fire" />
              </template>
              <!-- <template #extra>
            <var-icon name="information" />
          </template> -->
            </var-cell>
          </nuxt-link>
          <nuxt-link to="/archive">
            <var-cell ripple title="Archive" class="hover:bg-slate-100">
              <template #icon>
                <var-icon name="fire" />
              </template>
              <template #extra>
                <var-badge :value="total" />
              </template>
            </var-cell>
          </nuxt-link>
          <var-cell ripple title="About" class="hover:bg-slate-100">
            <template #icon>
              <var-icon name="fire" />
            </template>
            <!-- <template #extra>
            <var-icon name="information" />
          </template> -->
          </var-cell>
        </var-paper>
      </div>
      <var-paper class="py-2" :elevation="2">
        <var-image width="50%" class="mx-auto" src="/boy.png" />
        <p class="text-lg text-center text-stone-900">Be Happy.</p>
        <p class="text-sm text-center text-stone-900">Be Happy.</p>
        <div class="flex justify-center space-x-2 mt-2">
          <div v-for="item of socialLinks" :key="item.link">
            <a :href="item.link" target="_blank">
              <icon :name="item.name"></icon>
            </a>
          </div>
        </div>
      </var-paper>
    </var-space>
  </var-sticky>
</template>
<script lang="ts" setup>
const total = await blogsCount();

const socialLinks = [
  {
    name: "mdi:github",
    friendlyName: "Github",
    link: "https://github.com/otto-j",
  },
  {
    name: "mdi:twitter",
    friendlyName: "twitter",
    link: "https://twitter.com/ji3206",
  },
  {
    name: "mdi:music-note",
    friendlyName: "小宇宙",
    link: "https://www.xiaoyuzhoufm.com/podcast/6499832682e9dc2fb6db06b4",
  },

  {
    name: "mdi:podcast",
    friendlyName: "Apple Podcast",
    link: "https://podcasts.apple.com/cn/podcast/%E5%92%BF%E5%91%80-%E8%83%BD%E8%B7%91%E5%B0%B1%E8%A1%8C/id1695704262",
  },
  {
    name: "fe:share",
    friendlyName: "WebSite",
    link: "https://ijust.cc",
  },

  {
    name: "mdi:email",
    friendlyName: "email",
    link: "mailto:xinbao@webworker.tech",
  },
  // fe:share
];
</script>

<style></style>
