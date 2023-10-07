<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <footer
      class="mt-20 space-x-2 text-xs text-gray-500 text-center container mx-auto mb-2"
    >
      <span>Copyright &copy; 2013-2023 辛宝Otto</span>
      <span>🚀</span>
      <a target="_blank" href="https://beian.miit.gov.cn/">
        京ICP备17060663号-2
      </a>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import "@varlet/touch-emulator";

//

useSeoMeta({
  title: "[title2]",
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

useHead({
  htmlAttrs: {
    lang: "zh-CN",
  },
  link: [
    {
      rel: "icon",
      // type: "image/i",
      href: "/favicon.ico",
    },
  ],
});
</script>

<style>
.o {
  outline: 1px solid red;
}
</style>
