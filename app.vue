<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <footer class="mt-20">footer</footer>
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
