---
title: 编写一个小工具方便快速为文章添加 Banner
slug: add-a-post-banner-tool
update_time: 2023/10/13 00:10:21
create_time: 2023/10/12 12:10:00
---

![image.png](https://cdn.ijust.cc/img/20231012232656.png)

## 背景

今天想投稿几篇文章到不同的网站，发现掘金要求提供文章 Banner 图，创建掘金文章集合也需要提供图片，提供图片倒是没啥，主要是尺寸都不一样，我默认只有 1:1 的图片。

奇奇怪怪的尺寸 + 重复劳动编辑 + 随用随弃无需保存的图片 + 风格尽量统一 = 做一个模板图片生成工具。

目前也不需要复杂的拖拽功能、多样的素材，看起来简单的图片背景+文字+尺寸可调就满足要求了。

那就顺手做一个，先做一个简单版本的，也积累一些常用代码

目前实现的效果长这样

![image.png](https://cdn.ijust.cc/img/20231012233231.png)

## 制作思路

- 固定一个常用的模板，文字要可以编辑
- 样式可以使用 html2canvas(特意使用了一个其他方案) 生成图片
- 避免样式不同，背景可变

## 技术选型

### shadcn 样式

功能不复杂，写个表单，堆个样式，生成图片就可以。对完成任务有信心，所以尝试困难 i+1 ，我能不能顺手学习的 tailwind 相关的组件库。

博客的网站已经整体使用 tailwindcss + varlet 组件了，不想重新引入 element-plus/ arco-design 相关的组件，看起来 tailwindcss 提供的组件，侵入性不大，打包体积应该影响不大。

翻阅笔记，之前就加入收藏夹的 shadcn 映入眼帘，目前 shadcn-vue 进展特别快，样式比较简约，背后依赖 radix 作为低级封装，应该挺不错的。后续 shadcn 模板库起来了，应该也不错。

这样选择 shadcn-vue 作为组件库，开搞。

用起来稍微有别别扭，看了一会儿也就顺眼了，风格很素，我选择 gray 风格，也没有特别傻黑。

![image.png](https://cdn.ijust.cc/img/20231013000335.png)

### html-to-image 生成图片

基于 html 生成图片，大名鼎鼎的 html2canvas 就很不错，我去 https://npmtrends.com/ 一搜，发现 https://github.com/bubkoo/html-to-image 还不错，更新频率高、文档样式现代，api 清晰，也拿来用

### 动态颜色 hsl

背景颜色这块，我习惯稍微素一点的颜色，常规的 taiwindcss colors 感觉还不太够，我想更自由一点，所以我把目光投向了相同饱和度、亮度，不同色相的思路。

![image.png](https://cdn.ijust.cc/img/20231012234622.png)

这一点在 ps 上用的比较多，通过拖动色相，快速改变整体颜色。

![image.png](https://cdn.ijust.cc/img/20231012234705.png)

这一块用到的是 HSB 色彩模型，相同位置，只修改色相就可以。如下图。

![image.png](https://cdn.ijust.cc/img/20231012234825.png)

这样 hsb 的后两者就有值了，H 通过滑块拖动就可以。

第一反应 filter，也就是 `hub-rotate`

```css
.hue {
  filter: hue-rotate(45deg);
}
```

实际写出来不好使，部分元素比如人物形象不参与 filter ，做不到，要逐一修改 background 和 text 还挺麻烦。

还是动态修改 css，但我发现 css 里没有 hsb 有个 hsl，问问军师：

> 介绍 hsb 和 hsl 的区别
> HSB（色相、饱和度、亮度）和 HSL（色相、饱和度、亮度）是两种常用的颜色模型，它们在描述颜色的方式上有一些区别。巴拉巴拉

> 两者如何转换？

```js
// HSB to HSL
function hsbToHsl(h, s, b) {
  let l = ((2 - s) * b) / 2;
  s = (s * b) / (l < 0.5 ? l * 2 : 2 - l * 2);
  return [h, s, l];
}

// HSL to HSB
function hslToHsb(h, s, l) {
  let v = l + s * (l < 0.5 ? l : 1 - l);
  s = (2 * s) / (v + l);
  return [h, s, v];
}

// Example usage
const hsbColor = [0.5, 0.7, 0.8];
const hslColor = hsbToHsl(...hsbColor);
console.log(hslColor); // [0.5, 0.4666666666666667, 0.65]

const convertedHsbColor = hslToHsb(...hslColor);
console.log(convertedHsbColor); // [0.5, 0.7, 0.8]
```

懂了，有现成的方法，试了试好使，工具库+1 ，学到了点东西。

一番操作，就实现了 css 动态修改 h 色相。

```vue
<div :style='{
background: 'hsl(' + config.hue[0] + ',48.1%,48.6%)',
}'>动态背景<div>
```

chrome 实际运行的时候，还是 rgb，但是用着舒服，拖拽滑块颜色就改变了。

改变颜色时候顺手加个 will-change 和 transition 舒服。

## 效果

![image.png](https://cdn.ijust.cc/img/20231013000901.png)

![image.png](https://cdn.ijust.cc/img/20231012232656.png)

## 展望

后续可以尝试作为独立服务，图片自定义啥的。
