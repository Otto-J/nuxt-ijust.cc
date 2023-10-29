---
title: Nuxt 3 内置组件 NuxtIsland
slug: intro-nuxt-island-component
tags:
  - nuxt
  - island
update_time: 2023/10/15 23:18:16
create_time: 2023/10/15 13:15:37

---


本文可以关联
-[[Nuxt  components 文件夹背后的设计]]

详细很多人看到这个组件的名字，会立刻意识到，“喔，nuxt 也有这个呀”，会感到有用。因为能从 `island` 这个词类比想到 `astro` 提出的 island 架构。



## 背景

island 架构，是 astro 框架最鲜明的技术观点。通过对页面的不同区域进行区分，形成独立的岛屿，有的岛屿是静态的数据，有的岛屿是动态变化的内容。

比如对于一个博客来说顶部或者左侧的菜单和导航是相对静态的。中间的主体内容是相对动态的。这种情况，相对静态的内容同样需要经历 ssr + 水合，是不划算的。直接走 zero js，输出静态内容即可。

## 基础概念

回到 NuxtIsland 组件，这个组件会在服务端渲染，渲染的结果是静态的 html 下发给客户端浏览器，所以不会下载 js。改变组件的 props 会重新刷新组件。

显然：和 ClientOnly 是互斥的。

截止 2023年10月15日依然是实验性的，需要到 `nuxt.conf` 里开启 `experimental.componentIslands=true`

需要传递几个prop

| Name   | Type                | Required | Default | Description                                 |
| ------ | ------------------- | -------- | ------- | ------------------------------------------- |
| name   | string              | true     | -       | Name of the component to render.            |
| type   | string              | -        | -       | Type of the component.                      |
| lazy   | boolean             | -        | false   | Make the component non-blocking.            |
| props  | Record<string, any> | -        | -       | Props to send to the component to render.   |
| source | string              | -        | -       | Remote source to call the island to render. |

slots `#fallback` 是兜底内容

## 实践

待补充... 补充一些截图