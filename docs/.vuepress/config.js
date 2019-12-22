module.exports = {
  base: '/blog/',
  title: 'WEB前端开发',
  description: '前端开发中的每一点积累',
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
    nav: [{
      text: 'WebEasy',
      link: '/webeasy/'
    }, {
      text: 'JS',
      link: '/javascript/'
    }],
    sidebar: [{
      title: 'WebEasy',
      path: '/webeasy/',
      children: [{
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
        title: 'Git教程',
        path: '/webeasy/git.md'
      },
      {
        title: 'moment.js',
        path: '/webeasy/moment.md'
      },
      {
        title: '命名规范',
        path: '/webeasy/namewrite.md'
      },
      {
        title: 'vuepress搭建',
        path: '/webeasy/vuepress.md'
      },
      ]
    },
    {
      title: 'JavaScript',
      path: '/javascript/',
      children: [{
        title: 'TypeScript',
        path: '/javascript/typescript'
      }]
    },
    {
      title: 'Webpack',
      path: '/webpack/',
      children: [
        {
          title: 'Webpack教程',
          path: '/webpack/webpack'
        },
        {
          title: 'Webpack插件',
          path: '/webpack/plugins'
        },
        {
          title: 'Webpack Loader',
          path: '/webpack/loaders'
        }]
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
  }
}