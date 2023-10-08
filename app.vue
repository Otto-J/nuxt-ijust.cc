<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <footer
      class="mt-20 space-x-2 text-xs text-gray-500 dark:text-gray-200 text-center container mx-auto mb-2"
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
import "@/assets/md.css";
//

const appConfig = useAppConfig();

useSeoMeta({
  title: appConfig.website_title + " - " + appConfig.website_description,
  description: appConfig.website_description,
  ogTitle: appConfig.website_title,
  ogDescription: appConfig.website_description,
  // ogImage: "[og:image]",
  ogUrl: "/",
  twitterTitle: appConfig.website_title,
  twitterDescription: appConfig.website_description,
  // twitterImage: "[twitter:image]",
  twitterCard: "summary",
});

useHead({
  htmlAttrs: {
    lang: "zh-CN",
  },
  link: [],
});
</script>

<style>
.o {
  outline: 1px solid red;
}
body {
  transition:
    background-color 0.25s,
    color 0.25s;
  color: var(--color-text);
  background-color: var(--color-body);
}
</style>
