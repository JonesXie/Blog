module.exports = {
  base: '/blog/',
  title: 'WEB前端开发',
  description: '前端开发中的每一点积累',
  head: [
    ['link', {
      rel: 'shortcut icon',
      type: "image/x-icon",
      href: `./favicon.ico`
    }]
  ],
  themeConfig: {
    // logo: "/logo.png",
    repo: 'https://github.com/JonesXie',
    repoLabel: 'GitHub',
    nav: [{
      text: 'JS',
      link: '/javascript/'
    }],
    sidebar: [{
        title: 'WebEasy',
        path: '/webeasy/',
        children: [{
          title: 'vuepress搭建',
          path: '/webeasy/vuepress.md'
        }, {
          title: '常用JS方法',
          path: '/webeasy/method.md'
        }, {
          title: 'moment.js常用方法',
          path: '/webeasy/moment.md'
        }, {
          title: '常用正则',
          path: '/webeasy/regular.md'
        }]
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
    ]
  }
}