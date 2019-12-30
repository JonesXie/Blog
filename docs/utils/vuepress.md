# vuepress

## 前言

本文基于 GitHub 的 `GitHub Pages` 功能 和 `Vuepress` 框架快速地搭建免费的 markdown 博客

## 基本工具

> 1、node.js 以及 npm 包管理工具：[http://nodejs.cn/](http://nodejs.cn/)  
> 2、Git 工具：[https://git-scm.com/](https://git-scm.com/)  
> 3、vuepress 官网：[https://vuepress.vuejs.org/zh/](https://vuepress.vuejs.org/zh/)

## 构建基本目录

### 1、`NPM` 初始化

> 使用`npm init`初始化项目

```js
npm init
```

### 2、安装 `VuePress`

```js
npm install -D vuepress
```

### 3、添加执行命令

> `package.json` 里的 `scripts` 中添加如下代码，不需要修改其它代码

```js
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

### 4、创建主 `README.md` 文件

> 1、在根目录下，创建 `doc` 文件夹  
> 2、`doc` 文件夹中，创建 `README.md` 文件

### 5、输入命令启动项目

```js
npm run docs:dev
```

## 基本配置

**官网配置详解**：[https://vuepress.vuejs.org/zh/config/](https://vuepress.vuejs.org/zh/config/)

> 1、`doc` 文件夹中，创建 `.vuepress`文件夹  
> 2、`.vuepress`文件夹中，创建 `config.js` 文件  
> 3、`config.js` 文件可以填入如下代码：

```js
module.exports = {
  base: "/blog-demo/",
  title: "blog-demo",
  description: "Vuepress blog demo"
};
```

> **base**：站点的基础路径，它的值应当总是以`斜杠开始`，并以`斜杠结束`。这里设置为 /blog-demo/ ，我们再次在本地运行项目，访问路径就需要变更为 <http://localhost:8080/blog-demo/>  
> **title**：网站的标题  
> **description**：网站的描述

## 默认主题配置

Vuepress 提供了一个默认主题，我觉得挺好看的，所以就用默认的主题  
官方文档：[Vuepress-主题](https://vuepress.vuejs.org/zh/theme/)  
官方文档：[Vuepress-默认主题配置](https://vuepress.vuejs.org/zh/theme/default-theme-config.html)

### 1、首页

> 1、在`docs`文件夹根目录下的`README.md`,中配置首页  
> 2、使用[YAML front matter](https://vuepress.vuejs.org/zh/guide/markdown.html#front-matter)格式，指定 `home: true`  
> 3、[官方文档地址](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#首页)

```js
---
home: true
heroImage: /hero.png
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

### 2、导航栏

> 1、在`.vuepress`文件夹下的`config.js`中配置  
> 2、[官方文档地址](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#导航栏)

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: "https://github.com/xxxxxxx/blog-demo",
    // 自定义仓库链接文字。
    repoLabel: "GitHub",
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/" }
    ]
  }
};
```

### 3、侧边栏

> 1、在`.vuepress`文件夹下的`config.js`中配置  
> 2、[官方文档地址](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#侧边栏)

```js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: ["/", "/page-a", ["/page-b", "Explicit link text"]]
  }
};
```

## 设置多语言

> 1、在`.vuepress`文件夹下的`config.js`中配置  
> 2、[官方文档地址](https://v1.vuepress.vuejs.org/zh/guide/i18n.html#站点多语言配置)

```js
// .vuepress/config.js
module.exports = {
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    "/": {
      lang: "en-US", // 将会被设置为 <html> 的 lang 属性
      title: "VuePress",
      description: "Vue-powered Static Site Generator"
    },
    "/zh/": {
      lang: "zh-CN",
      title: "VuePress",
      description: "Vue 驱动的静态网站生成器"
    }
  }
};
```

## 部署

官方文档：[https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages)  
**官方文档讲解的很详细，再此就不赘述了**

### 配置`deploy.sh` 文件

> 每次代码写完后，双击`deploy.sh`，将会自动部署到 GitHub Pages 上

```js
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```
