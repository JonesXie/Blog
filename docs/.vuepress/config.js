module.exports = {
  base: '/blog/',
  title: 'WEB前端开发',
  description: '前端开发中的每一点积累',
  head: [
    ['link', {
      rel: 'shortcut icon',
      type: "image/x-icon",
      href: 'https://jonesxie.github.io/blog/favicon.ico'
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
        path: '/webpack/'
      }
    ],
    smoothScroll: true,
    lastUpdated: '最后更新时间',
  },

}