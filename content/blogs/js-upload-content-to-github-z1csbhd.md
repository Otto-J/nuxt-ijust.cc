---
title: js 上传内容到 github
date: '2023-10-10 12:38:19'
head:
  - name: keywords
    content: 代码片段
categories:
  - note
outline: deep
sidebar: false
prev: false
next: false
---

# js 上传内容到 github

编写一个 js 插件，能够把一个 json 发布到 github 上，使用 github personal access tokens 来操作，需要做那些工作？

​​

要编写一个能够将 JSON 发布到 GitHub 上并使用个人访问令牌（Personal Access Token）进行操作的 JavaScript 插件，你需要完成以下几个步骤：

1. 获取个人访问令牌：

    * 登录到 GitHub，进入 "Settings" -> "Developer settings" -> "Personal access tokens"。
    * 点击 "Generate new token" 创建一个新的访问令牌。
    * 为访问令牌提供描述，并选择适当的权限范围（例如，访问仓库、读取和写入文件）。
    * 生成令牌并将其保存在安全的地方。
2. 初始化 JavaScript 插件：

    * 在你的项目中创建一个 JavaScript 文件，例如 `github-publish.js`​。
    * 引入必要的 JavaScript 库，例如 `axios`​ 或 `fetch`​，用于与 GitHub API 进行交互。
3. 实现发布 JSON 的逻辑：

    * 在插件中使用个人访问令牌进行身份验证。将访问令牌作为请求标头或参数的一部分发送到 GitHub API。
    * 使用 GitHub API 创建一个新的文件或更新现有文件，将 JSON 数据写入文件中。
    * 将文件提交到仓库并进行提交操作。

下面是一个示例代码片段，展示如何使用个人访问令牌将 JSON 发布到 GitHub 上：

```javascript
// 引入 JavaScript 库，例如 axios
const axios = require('axios');

// JSON 数据
const jsonData = { key: 'value' };

// GitHub 仓库信息
const owner = 'your-username';
const repo = 'your-repo';
const path = 'path/to/file.json';
const branch = 'main';

// 个人访问令牌
const token = 'your-personal-access-token';

// 发布 JSON 到 GitHub
async function publishJSON() {
  try {
    // 构建 API 请求 URL
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    // 构建请求头
    const headers = {
      Authorization: `token ${token}`,
      'Content-Type': 'application/json',
    };

    // 获取现有文件 SHA
    const existingFileResponse = await axios.get(apiUrl, { headers });
    const sha = existingFileResponse.data.sha;

    // 构建提交内容
    const content = Buffer.from(JSON.stringify(jsonData)).toString('base64');
    const payload = {
      message: 'Update JSON file',
      content: content,
      sha: sha,
      branch: branch,
    };

    // 创建或更新文件
    const response = await axios.put(apiUrl, payload, { headers });
    console.log('JSON file published:', response.data);
  } catch (error) {
    console.error('Error publishing JSON file:', error);
  }
}

// 调用函数发布 JSON
publishJSON();
```

请确保替换示例代码中的 `'your-username'`​、`'your-repo'`​、`'path/to/file.json'`​ 和 `'your-personal-access-token'`​ 为你自己的 GitHub 用户名、仓库名称、文件路径和个人访问令牌。

这个示例代码使用了 `axios`​ 库来执行 HTTP 请求，你可以根据自己的偏好和项目需求选择其他 HTTP 请求库。
