// https://nuxt.com/docs/api/configuration/nuxt-config
import components from "unplugin-vue-components/vite";
import autoImport from "unplugin-auto-import/vite";
import { VarletUIResolver } from "unplugin-vue-components/resolvers";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxtjs/tailwindcss", "nuxt-feedme", "nuxt-icon"],
  content: {
    api: {
      baseURL: "/api/_my_content", // 这里暴露了 api/_my_content
    },
  },
  feedme: {
    feeds: {
      "/feed.atom": { revisit: "6h", type: "atom1", content: true },
      "/feed.xml": { revisit: "6h", type: "rss2", content: true },
      "/rss.xml": { revisit: "6h", type: "rss2", content: true },
    },
    content: {
      feed: {
        defaults: {
          id: "/",
          title: "咿呀 能跑就行",
          language: "zh-cn",
          description: "描述",

          link: "https://ijust.cc", // 完整网址
          ttl: 360,
          author: {
            email: "xinbao@webworker.tech",
            name: "Otto-J",
            link: "https://github.com/otto-j",
          },
          categories: ["blogs", "podcasts"],
          favicon: "/favicon.png",
          copyright: "2013-2023 @辛宝Otto", // copyright
        },
      },
      item: {
        mapping: [["link", "_path"]],
        templateRoots: [true, "feedme"],
      },
    },
  },
  vite: {
    ssr: {
      noExternal: ["@varlet/ui"],
    },
    plugins: [
      components({
        resolvers: [VarletUIResolver()],
      }),
      autoImport({
        resolvers: [VarletUIResolver({ autoImport: true })],
      }),
    ],
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1.0, shrink-to-fit=no",
      meta: [
        {
          name: "author",
          content: "",
        },
        {
          // name:'twitter:title'
          name: "og:type",
          content: "website",
        },
        {
          // name:'og:url'
        },
      ],
      link: [
        {
          // sitemap
          rel: "sitemap",
          href: "/sitemap.xml",
        },
        {
          // rss
          rel: "alternate",
          type: "application/rss+xml",
          title: "RSS XML",
          href: "/rss.xml",
        },
        {
          // rss
          rel: "alternate",
          type: "application/rss+xml",
          title: "自定义RSS XML",
          href: "/feed.xml",
        },
        {
          rel: "alternate",
          type: "application/atom+xml",
          title: "RSS Atom",
          href: "/feed.atom",
        },
      ],
    },
  },
  nitro: {
    prerender: {
      routes: ["/sitemap.xml"],
    },
  },
  runtimeConfig: {
    // only ssr
    public: {},
  },
});
