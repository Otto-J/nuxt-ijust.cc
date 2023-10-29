---
title: Nuxt 写博客如何自定义 slug 实现 url 自定义？
slug: nuxt-content-custom-url
update_time: 2023/10/12 14:13:16
sha: b839edc2717d94f7eb47fc202c6ede7303658803

---

## 想自定义博客链接遇到了问题

最近在用 nuxt + nuxt content 写 markdown 博客，遇到了一个问题：

nuxt 默认是按照文件名来实现路由自动注册的，如果有一个文件 `blogs/No. 37 和 Vue 成员科比哥聊开源协作、技术人的奇妙链接.md` ，那么生成的路由会比较复杂，如果我们想访问 `blogs/37` 访问文章就不行，因为 nuxt 不会默认读取 slug 或者 permalink

后续 nuxt content 官方有可能会自行实现吧。远水解不了近渴，经过一番坎坷的探索，我解决了这个问题。

## 解决思路

在 SSR/SSG 环境中，我们访问一个页面网址，具体路由到哪里，是可以自行拓展的。


```md
---
slug: 37
---

xxx
```

加入我们想访问 `blogs/37` ，默认的路由 `<ContentDoc v-slot="{ doc }" />` 行不通，因为基于文件的路由并不存在，这里我们需要自行查找，读取当前 route 参数，利用 `queryContent().findOne()` 查找。

script 核心查询代码如下：

```ts
const props = withDefaults(
  defineProps<{
    category: string;
  }>(),
  {
    category: "blogs",
  },
);

const route = useRoute();

const slug = computed(() => route.params.slug?.[0] as string);

const doc = await queryContent(props.category)
  .where({
    _partial: false,
    $or: [
      {
        _path: {
          // blogs/原本的 path
          $eq: slug.value
            ? `/${props.category}/${slug.value}`
            : `/${props.category}`,
        },
      },
      {
        slug: slug.value,
      },
    ],
  })
  // .find();
  .findOne();

console.log("5content", doc);
```

这样得到的 `doc` 变量，就可以自行渲染了， template 核心代码如下：

```html
<h1>{{ doc.title }}</h1>
<ContentRenderer
    class="mt-8 w-full max-w-none"
    tag="article"
    :value="doc"
/>
```


通过这种方案，同时支持原本的路由、自定义的路由。凡事在遇到 `<route-link>` 的时候，始终兼容读取：

```ts
// /utils/parseUrl.ts
export const parseUrlByDoc = (article: any) => {
  // const baseUrl = articl
  if (article.slug) {
    // 优先 slug
    return '/'+ article._dir + "/" + article.slug;
  } else {
    return article._path;
  }
};
```


通过这种方案，比较合理地实现了自定义 slug，同样思路也可以拓展实现 permalink

## 延伸

或许真的需要改造  slug ，感觉需求还挺常见的。