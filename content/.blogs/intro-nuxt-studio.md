---
update_time: 2023-10-08 15:02:23
title: 介绍 NuxtStudio
keywords: nuxt, nuxtstudio, git cms
description: 介绍下 nuxt.studio 基础使用和踩坑经验分享
tags: ["nuxt"]
slug: "intro-nuxStudio"
---

最近在研究 `nuxt`，希望能把 nuxt 作为后续使用的主力技术栈。在使用 Nuxt + Nuxt Content 的过程中，发现了官方最近推出了 [nuxt.studio](https://nuxt.studio)，看起来挺不错。

![nuxt.studio](/WX20231008-151104.png)

感觉可能用得上，就随时试了一下，感觉还可以。这里做个基础使用和踩坑分享。

## 简单介绍

简单介绍 nuxt.studio。这算是一套插件，通过网站后台可以修改 github 上的文件，并且可以通过 preview 的方案实时看到编辑的效果。目标用户是：

- 基于 github 等 git 工作流的网站
- 编辑文章不想离开浏览器，希望可以浏览器里实时创建和更新文章，并希望看到生效的预览效果
- 不要阻塞现有的工作流程

定位和之前的 [Vercel Visual Editing](https://vercel.com/blog/visual-editing) 差不多，都是面向 CMS 编辑的工作流程。

我现在的网站就是 Nuxt 技术栈的，理论上可以接入使用，所有就有了这篇文章。

## 接入使用

整体的流程，就是大象放入冰箱的三步骤：

1. 准备 Nuxt 项目，并放入 Github
2. 接入 Nuxt Studio 模块
3. 演示效果

### 准备 Nuxt 项目

这个可以用 nuxt Content 模块快速创建一个网站，我已经准备好了。目前 Nuxt Studio 网站好像只支持 Github。

![WX20231008-153329.png](/WX20231008-153329.png)

访问网站并登录，然后导入项目。导入项目之后会看到这个页面：

![Snipaste_2023-10-08_15-36-57.png](/Snipaste_2023-10-08_15-36-57.png)

定义如何部署，如果是第一个 Github Pages 可能就简单了，这里我选择的是 SelfHosting，这表示已经有独立的线上服务了，这也是大多数的使用情况。

先保留这个页面不关闭，页面展示的是一对演示密钥。

### 接入模块

在 Nuxt 项目中安装 `@nuxthq/studio` 依赖，并且在 `nuxt.config.ts` 的 modules 中注册。

具体操作看官方文档 https://nuxt.studio/docs/projects/setup

文档中要求这里要公开环境变量 `NUXT_PUBLIC_STUDIO_TOKENS` ，这里一开始我很困惑，不清楚如何理解 Nuxt 的环境变量，是 `.env` ，还是 `appconfig` 。

后来搞明白了，为了不在项目中暴露这个信息，放入 github 的 workflows ，通过 scrents 暴露比较合理。

```yml
- name: Build
  run: pnpm run generate
  env:
    NUXT_PUBLIC_STUDIO_TOKENS: ${{ secrets.NUXT_PUBLIC_STUDIO_TOKENS }}
```

所以我编辑 github action ，把刚才的 token 放入 github 项目设置里。细节应该都知道，不展开。

重新部署一次，这样就可以在展示 token 的那个页面点 save 了，应该会提供链接成功

### 页面使用

![Snipaste_2023-10-08_16-22-11.png](/Snipaste_2023-10-08_16-22-11.png)

本文就是用 studio 提供的方案运行的，并不是实时预览，感觉页面 idel 个十几秒才会同步一次。
