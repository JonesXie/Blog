const path = require("path");
module.exports = {
  base: '/blog/',
  title: 'WEB前端开发',
  description: '前端开发中的每一点积累',
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "public", "assets")
      }
    }
  },
  head: [
    ['link', {
      rel: 'shortcut icon',
      type: "image/x-icon",
      href: 'https://jonesxie.gitee.io/blog/favicon.ico'
    }]
  ],
  themeConfig: {
    // logo: "/logo.png",
    repo: 'https://github.com/JonesXie',
    repoLabel: 'GitHub',
    // nav: [{
    //   text: 'WebEasy',
    //   link: '/webeasy/'
    // }, {
    //   text: 'JS',
    //   link: '/javascript/'
    // }],
    sidebarDepth: 2,
    sidebar: [{
      title: 'WebEasy',
      path: '/webeasy/',
      sidebarDepth: 1,
      collapsable: false,
      children: [
        {
          title: '实践笔记',
          path: '/webeasy/notes.md'
        }, {
          title: '常用JS方法',
          path: '/webeasy/method.md'
        },
        {
          title: '常用CSS技巧',
          path: '/webeasy/css.md'
        },
        {
          title: 'vue实践技巧',
          path: '/webeasy/vue.md'
        },
        {
          title: '常用正则',
          path: '/webeasy/regular.md'
        },
        {
          title: '命名规范',
          path: '/webeasy/namewrite.md'
        },
      ]
    },
    {
      title: 'Utils',
      path: '/utils/',
      children: [
        {
          title: 'Git常用命令',
          path: '/utils/git.md'
        },
        {
          title: 'moment.js',
          path: '/utils/moment.md'
        },
        {
          title: 'nginx基础',
          path: '/utils/nginx.md'
        },
        {
          title: 'vuepress搭建',
          path: '/utils/vuepress.md'
        },
      ]
    },
    {
      title: 'Web框架',
      path: '/webframe/',
      children: []
    },
    {
      title: 'JavaScript',
      path: '/javascript/',
      sidebarDepth: 2,
      children: [{
        title: 'TypeScript',
        path: '/javascript/typescript'
      }]
    },
    {
      title: 'HTML&CSS',
      path: '/htmlcss/',
      sidebarDepth: 2,
      children: [{
        title: 'Sass&Less',
        path: '/htmlcss/sass&less.md'
      }]
    },
    {
      title: '服务端',
      path: '/service/',
      children: []
    },
    {
      title: 'Webpack',
      path: '/webpack/',
      // collapsable: false,
      children: [
        ['/webpack/webpack', 'Webpack教程'],
        ['/webpack/plugins', 'Webpack Plugins'],
        ['/webpack/loaders', 'Webpack Loaders'],
      ]
    }
    ],
    smoothScroll: true,
    lastUpdated: '最后更新时间',
  },
  markdown: {
    toc: {
      includeLevel: [2, 3, 4, 5]
    }
  },
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
    },
  },
  plugins: [
    ["@vuepress/back-to-top", true],
    [
      "@vuepress/plugin-medium-zoom",
      {
        options: {
          margin: 24,
          background: "white",
          scrollOffset: 0
        }
      }
    ],]
}