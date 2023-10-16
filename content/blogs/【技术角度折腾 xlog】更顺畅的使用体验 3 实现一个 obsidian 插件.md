---
title: 【技术角度折腾 xlog】更顺畅的使用体验 3 实现一个 obsidian 插件
tags:
  - xlog
  - obsidian
slug: play-xlog-03
update_time: 2023/10/16 15:34:20
create_time: 2023/10/16 15:13:43

---
本文是系列文章的第三章，承接 [[【技术角度折腾 xlog】更顺畅的使用体验 2 深入理解 xlog 的鉴权]]，本文在前两章节的基础上开始尝试制作一个 obsidian 插件。

预计本文会是一个长期更新的项目，你可以持续关注本文，获取更新的动态。另外本文在 xlog 平台至少价值 5 个币的赞赏，嘻嘻，欢迎赞赏。

本文经验可以迁移复用，比如你是其他笔记的用户，可以参考实现。当然有赏金的话，我不介意接单~

## 背景

作为一个 obsidian 的忠实用户，我日常的所思所想会记录在 obsidian 上，这就意味着，我需要先在 obsidian 上编写文章，然后复制内容到 xlog 上，图片部分需要额外注意。

如果后续我们编辑了 obsidian 的内容，也需要注意同步保持一致，如果有一个插件，我只需要在笔记上选择上传，就同步到 xlog 上就好了。

那，我们就实现一个吧。

## 设计思路


整体的设计思路分几步：
- 技术预研，跑通接口
- 设计 obsidian 插件
- 实现 obsidian 插件
- 打包分发 obsidian 插件
- 宣传试用 obsidian 插件

## 技术预研

在上一节，我们实现了文章的创建和更新，利用 siwe token 可以轻松实现文章管理。其他操作暂不实现。

这一部分我们默认已经掌握，如果不理解，可以阅读上一章节内容。

## 插件设计

这里需要前置 obsidian 的开发经验，这里先略过细节，我维护了一个简单的 obsidian-vue-starter 模板，对 vue 用户比较友好。[Github Repo](https://github.com/Otto-J/Obsidian-Vue-Starter)

我们在模板的基础上进行开发。

我们希望插件这样使用。

用户应该开启插件设置，并且正确添加了 token/charactorID，有一个按钮进行连接测试。

在对应笔记的列表上单击右键出现“上传到 xlog"，点击触发上传操作。

上传校验时候，检查 front-matter 要求添加：
- 可选的 tags
- 可选的 slug
- 可选的 summary
- 必填的 title
- 可选的 noteId，如果存在视为更新

暂时忽略 charactorID 这个应该是少数需求

如果当前内容包含 video/audio/image ，限制文件大小，提示是否上传到 xlog 替换为 ipfs 链接。

文件上传完成，回填修改 noteID 参数，后续走更新的操作。

## 实现插件

目前我会在 github 上进行这个公开的开源项目：
https://github.com/Otto-J/Obsidian-sync-xlog

等待项目有阶段性进展，我再回来继续编辑这部分内容。

## 打包分发

待补充

## 宣传试用

待补充，争取获得官方的认可。