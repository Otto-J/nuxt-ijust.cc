---
title: Nuxt components 文件夹背后的设计
slug: intro-nuxt-components-design
update_time: 2023/10/15 23:15:36
create_time: 2023/10/15 16:18:10

---

关联:

[[Nuxt 3 内置组件 NuxtIsland]]

nuxt  内置了很多约定，对 `components` 文件夹也有很多默认的行为，这里按照官方文档给出的说明，做个梳理。信息来源 https://nuxt.com/docs/guide/directory-structure/components

### 默认全局导入

`components` 文件夹是放 vue 组件的地方，在这个文件夹里的所有组件，包括嵌套文件夹的组件会自动注册到全局组件，在编写业务时候无需手动导入。

举例：

```text
/components
	- a.vue
	- b/c/d.vue
```

提示：本质是开发时候全局导入，构建按需加载。这里可以提供一个截图。

延伸：这里对应 vite 里的 `unplugin-vue-compnents` 插件，参考 [Github Repo](https://github.com/unplugin/unplugin-vue-components) 也是按需加载。

### 自定义来源、过滤文件

高级自定义：默认的 components 可以通过配置文件修改，补充更多组件来源，并且可以给组件设置前缀 prefix 这样从命名上可以读取来源，避免来源混乱。配置文件本身是数组，会从上到下进行匹配。

如何设置来源，暂时不提，我理解如果编写组件的插件，需要用到，可以用来自动导入。插件选项 - deepMerge 并  push 到选项里。不意外会遇到重名优先级的问题，这个可以通过 devtools 确认组件来源。

组件不一定是 `.vue` ，还有可能是 `ts/tsx` 或者其他后缀，或者习惯 `xx.comp.vue` 命名设置，可以通过设置进行过滤，这样实现大组件自动导入，小组件不导入。具体是 `extensions` 参数。

### 嵌套组件的命名处理

对于这个组件 `components/aa/bb/cc.vue` 注册的名称是 `AaBbCc` 组件。如果有疑问，打开 devtools 看就可以了。
注意：这种情况推荐的做法是 把 `cc.vue` 组件的路径补齐，就叫 `AaBbCc.vue`，和路径重复的部分会自动忽略。

如果不想要路径，可以关闭 `prefix:false` ，这样组件就不会携带路径了，开发者自己维护命名即可。

### 动态组件

vue 中可以通过 `<component is='xxx' />` 试下动态组件加载。在传统 vue 项目中，需要逐一 import 导入等待调用。

在 nuxt 中思路相同，先声明再调用，声明导入的方式简化实现，文档提到了两个方案，一个是导入、一个是调用 `resolveComponent` 方法。

```vue
<script setup lang="ts">
import { SomeComponent } from '#components'

const MyButton = resolveComponent('MyButton')
</script>

<template>
  <component :is="clickable ? MyButton : 'div'" />
  <component :is="SomeComponent" />
</template>
```

注意： `resolveComponent` 方法只接受常量，不要动态拼，这个是误区。

### 全局组件

有别于按需引用，有全局组件可以保证运行时可用。两个方案：
- 配置文件里给具体文件夹 global 属性
- 放入 `components/global/` 文件夹

### 动态、懒加载导入组件

具体组件前缀添加 Lazy ，比如 `<MyComp>` 改为 `<LazyMyComp>` 轻松实现 lazy load

这样做的好处是，减少运行时的开销。尤其是配合 `<LazyMyComp v-if=false />` 进行使用

### 显式、明确、直接导入

某些情况下，需要组件引入来源，避免歧义，可以通过 `#/components` 导入组件。


## 定义客户端渲染和服务端渲染
### 内置 ClientOnly 组件


归类到 Nuxt 内置组件

场景：无视 SSR，单纯 spa 实现组件，比如用户登录状态等。

在遇到渲染困难时候有奇效。

```html
<ClientOnly>
  <div>a</div>
  <template #fallback>兜底内容</template>
</ClientOnly>
```

### client.vue 组件

某些业务组件天生需要在客户端运行，除了 `ClientOnly` 组件，还有一种修改文件名的方案 `xxx.client.vue`

在 components 中，所有 `.client.vue` 的组件，默认就是 ClientOnly
注意：自动导入和 `#components` 导入会生效，通过相对路径导入不会生效。
注意：`.client.vue` 组件实际会在组件挂载后渲染，所以如果需要访问模板数据，需要这样写：

```ts
onMounted(async()=>{
  await nextTick(()=>{
    // do this
  }
})
```

### server.vue 组件 - server-only

背景介绍：

类比 astro 的 island 架构、react 的 react server component，让组件的服务端渲染，nuxt 提供了仅在服务端渲染的方案。

某些场景，比如 footer、sidebar 场景大部分情况是静态内容或者变化很小，这种情况下不必要参与 ssr + client 水合，让组件在服务端渲染就很有效了。

因此：这种情况下，默认返回 html 结果，如果需要变化，会生成新的网络请求，重新渲染对应组件。

该项功能目前是 beta，需要专门开启，背后依赖的是 `<nuxt-island />`，继续阅读 [[Nuxt 3 内置组件 NuxtIsland]] 相关内容。

疑问中：看起来 server.vue 和 nuxt-island 是两件事，前者是后者的包装？

吐槽：我怀疑这里还有问题，踩坑崩溃，如果你发现 server 组件无论如何也展示不出来，可能需要删掉 .nuxt 然后重新跑一次 dev...

### server component

需要明确的是 server-only 和 island component，渲染过程中，服务端渲染会发出内部请求、浏览器渲染会发出 network 请求，称之为 NuxtIslandResponse

这意味着：
- 服务端创建一个新的 vue app 实例，创建这个 NuxtIslandResponse
- `island ctx` 会被创建
- 这个 `island ctx` 开发者控制不了，是隔离的
- 渲染 island 的过程，插件也会重新运行，或者设定 island =false 忽略，比如统计之类的？

还有个 `nuxtApp.ssrContext.islandContext` 先不管

### .client 和 .server 可以配对使用

可以陪读使用，但为了 .client 在水合时候能正常匹配，渲染的 html 在初次渲染必须一样，也就是结构必须一样

## DevOnly 组件

这个组件只会在 dev 生肖，生产构建不包含

## NuxtClientFallback 组件

如果 SSR 发声了错误，会展示这个组件

## 库开发者

自己开发的插件如何注册到 component 中？

这里先不看了。大意是在 hooks 里添加回调。

似乎可以给 element 之类的组件库添加支持。


