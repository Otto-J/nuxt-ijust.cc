---
title: 【技术角度折腾 xlog】更顺畅的使用体验 2 深入理解 xlog 的鉴权
slug: play-xlog-02
tags:
  - xlog
update_time: 2023/10/16 13:59:18
create_time: 2023/10/16 11:58:43

---
本文继续探索，承接 [[【技术角度折腾 xlog】更顺畅的使用体验 1 可行性探索]] 文章的内容。

本文尝试实现 xlog 文章的管理，实现自己内容的增删改查，基于官方的 openapi

## 背景

如果要实现 xlog 文章的管理操作，这就需要鉴权，如何证明你是你，你能修改某个人的文章？在 web2 领域，我们一般会通过账号密码生成 jwt 模拟用户，或者通过 oauth 获得 access-token 授权操作特定的权限范围。

我们的技术前提是任意运行时环境，同时支持浏览器和node.js 等不同运行环境，所以不考虑了网页端小狐狸metamask 方式授权。

## 技术实现

经过一番探索，和官方成员的 diygod 的指导，目前至少有两种方式实现数据授权管理，私钥和授权码，推荐第二种。

### 通过 Private Key

首先是通过 private key，钱包的私钥。这种是万能的我证明是我的的方案，官方 sdk 也支持通过 private key 实现鉴权。

比如这里 https://crossbell.js.org/#md:connect-with-private-key

private key 从哪里来呢？举例小狐狸：

![image.png](https://cdn.ijust.cc/img/202310161311062.png)

在账户详情里，有个 Show Private Key，

请务必注意：private key 非常机密，这里只做介绍。更推荐下面的方案

### 通过 siwe 授权

SIWE 是 sign in with ethereum 的缩写。

通过 siwe 授权有以下几个步骤：
- 开启 siwe 功能
- 获取 token
- 通过 api 获得授权

### 开启 siwe 功能

首先访问自己的 xlog 控制台 https://xlog.app/dashboard/ 在左侧菜单栏最后一列选择设置。

选择 `xSettings` ，会有下图的展示：

![image.png](https://cdn.ijust.cc/img/202310161319902.png)

我对 web3 不是很熟悉，口语化表达，圆框内的解释可以这样理解，主要是 Sync Operator 部分：

- 操作授权。
- 同步操作。通过开启 Sync Operator 可以允许通过其他方式同步内容到 Crossbell 也就是 xlog

一旦开启，我们就拥有了通过代码同步内容到 xlog 的能力。

### 获取 token

目前获取 token 的最简单方案是在控制台中这样操作：

```js
JSON.parse(localStorage.getItem('connect-kit:account')).state.wallet.siwe.token
```

这段代码的作用是获取 siwe 的token 信息，应该还有其他方案获取，目前这种方案最简单。

输入这段代码返回的内容就是需要的 token 信息，请自行保存好。

在 node.js 项目中通过 .env 存储，在 github 中通过 secret 存储。避免明文暴露。

### api 实践

有了刚才获得的 token，我们访问 https://indexer.crossbell.io/docs#/Siwe 官方提供的文档，我们所需要的所有东西都在这里了。

![image.png](https://cdn.ijust.cc/img/202310161340395.png)


翻到页面最顶部，有个绿色的 Authorize 按钮，点击弹出一个弹窗，把刚才的 token 填写到 siwe 内容里

![image.png](https://cdn.ijust.cc/img/202310161341888.png)

点击授权，这时候我们在每次请求的 header 里会添加 `Authorization: Bearer ${token}`

比如我们使用 `GET /v1/siwe/account` 就可以获取当前我们是谁了。

![image.png](https://cdn.ijust.cc/img/202310161346826.png)


剩下的事情就简单了，有这样几个接口可以自行实践：
- `PUT /v1/siwe/contract/characters/{characterId}/notes` 给用户新建文章
- `POST /v1/siwe/contract/characters/{characterId}/notes/{noteId}/metadata` 更新指定 noteId 的文章
- `Delete /v1/siwe/contract/characters/{characterId}/notes/{noteId}` 删除指定的文章

提供几个代码片段，经过几次尝试，一下代码片段有效。

首先是创建文章：

```ts
const title = '文章标题'
const content = '文章内容'
const base = "https://indexer.crossbell.io";
const ottoCharId = ''
const token = ''

const createPost = async () => {
  const url = `/v1/siwe/contract/characters/${ottoCharId}/notes`;

  const finalUrl = base + url;

  axios
    .request({
      method: "put",
      url: finalUrl,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        metadata: {
          tags: ["post"],
          type: "note",
          title: title,
          content: content,
          summary: "",
          sources: [],
          attributes: [
            {
              value: "play-xlog-01", // 这里是自定义 slug
              trait_type: "xlog_slug",
            },
          ],
          attachments: [
            {
              name: "cover", // cover
              address: "",
              mime_type: "",
            },
          ],
        },
        locked: false,
        linkItemType: null,
      },
    })
    .then((res) => {
      console.log(2, res.data);
    })
    .catch((err) => {
      console.log(3, err);
    });
};
```

然后是更新文章，注意这里的 mode 从字面意思看 replace 比较简单

```ts
const updatePost = async () => {
  const noteId = 29;
  const mode = "replace"; //'merge'

  const updatePost =
    base +
    `/v1/siwe/contract/characters/${ottoCharId}/notes/${noteId}/metadata`;

  axios
    .request({
      method: "post",
      url: updatePost,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        metadata: {
          tags: ["post", "新想法"],
          type: "note",
          title: title,
          content: content,
          sources: ["xlog"],
          // summary: "",
          attributes: [
            {
              value: "play-xlog-01",
              trait_type: "xlog_slug",
            },
          ],
          attachments: [
            {
              name: "cover",
              address: "",
              mime_type: "",
            },
          ],
        },
        mode,
      },
    })
    .then((res) => {
      console.log(JSON.stringify(res.data, null, 2));
    })
    .catch((err) => {
      console.log(3, err);
    });
};
```

最后是删除文章

```ts
const deletePost = async () => {
  const characterId = '';
  const noteId = '';

  const deletePost =
    base + `/v1/siwe/contract/characters/${characterId}/notes/${noteId}`;

  axios
    .request({
      method: "delete",
      url: deletePost,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      console.log(2, res.data);
    })
    .catch((err) => {
      console.log(3, err);
    });
};
```

## 踩坑经验

创建文章的 body，和获取列表页的返回体不一样，主要是 content 是否多包一层，也就是请求参数和入库的数据不一样，稍微有点坑，最终创建文章的参数可用。

官方对入参比较宽容，啥参数都要，笑死，错误参数会导致列表页展示不出来，排查好久眼都花了，还是万分小心，仔细核对，等熟悉了官方源码，得加一加限制。

## 展望

有了上述的 api 实践内容，我们未来可以做到以下事情：
- 编写 node 脚本，实现文章的创建和更新
- 比如在 github actions 里，每次推送了 markdown 可以调用函数，同步到 xlog
- 比如在 obsidian 里编写插件，单击右键上传到 xlog
- 接入自己的 cms 后台，进行文章管理

接下来，我会改造我的 obsidian 插件，实现上传文件到 xlog

![image.png](https://cdn.ijust.cc/img/202310161358005.png)


敬请期待。