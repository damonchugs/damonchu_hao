const web_tab = [
  {
    name: '前端论坛',
    hao: [
      { name: '掘金', href: 'https://juejin.cn/', description: '稀土掘金' },
      { name: 'Stackover Flow', href: 'https://stackoverflow.com/', description: '技术问答交流' },
      { name: 'Segmentfault', href: 'https://segmentfault.com/', description: '课程问答设置' },
    ]
  },
  {
    name: '代码hub',
    hao: [
      { name: 'Github', href: 'https://github.com/damonchugs', deascription: '国外代码托管平台' },
      { name: 'Gitee', href: 'https://gitee.com/', description: '国内代码托管平台' },
    ]
  },
  {
    name: '大牛博客',
    hao: [
      { name: '阮一峰网络博客', href: 'http://www.ruanyifeng.com/', description: '前端web技术nginx，node，https等' },
      { name: '廖雪峰网络博客', href: 'https://www.liaoxuefeng.com/', description: '官方网站' },
    ]
  }
]

export default [
  {
    url: '/web',
    type: 'get',
    response: () => {
      return web_tab
    }
  }
]