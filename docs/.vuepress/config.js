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
    repo: 'JonesXie/Blog',
    repoLabel: 'GitHub',
    nav: [{
      text: 'JS',
      link: '/javascript/'
    }],
    sidebar: [{
      title: 'JavaScript',
      path: '/javascript/'
    }, '/webpack/']
  }
}