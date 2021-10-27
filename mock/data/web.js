const web_tab = [
  {
    name: '前端论坛',
    src: 'bbs',
    hao: [
      { name: '掘金', href: 'https://juejin.cn/', description: '稀土掘金' },
      { name: 'Stackover Flow', href: 'https://stackoverflow.com/', description: '技术问答交流' },
      { name: 'Segmentfault', href: 'https://segmentfault.com/', description: '课程问答设置' },
    ]
  },
  {
    name: '代码hub',
    src: 'hub',
    hao: [
      { name: 'Github', href: 'https://github.com/damonchugs', description: '国外代码托管平台' },
      { name: 'Gitee', href: 'https://gitee.com/', description: '国内代码托管平台' },
    ]
  },
  {
    name: '大牛博客',
    src: 'blog',
    hao: [
      { name: '阮一峰网络博客', href: 'http://www.ruanyifeng.com/', description: '前端web技术nginx，node，https等' },
      { name: '廖雪峰网络博客', href: 'https://www.liaoxuefeng.com/', description: '官方网站' },
    ]
  },
  {
    name: '配色导航',
    src: 'color',
    hao: [
      { name: 'ant.design', href: 'https://ant.design/docs/spec/colors-cn', description: '阿里设计颜色设计' },
      { name: 'Color Drop', href: 'https://colordrop.io/', description: 'Color Drop' },
      { name: '设计师导航', href: 'https://color.uisdc.com/pick.html', description: '每周更新，一网打尽' }
    ]
  },
  {
    name: '字体导航',
    src: 'font',
    hao: [
      { name: '有字体', href: 'https://www.webfont.com/', description: '在线云字体，简单易用，阿里云cdn' },
      { name: 'wordmark', href: 'https://wordmark.it/', description: '展示系统字体样式' },
      { name: '字体传奇', href: 'http://www.ziticq.com/', description: '有免费，有商用字体' },
      { name: '图翼', href: 'http://www.tuyiyi.com/show-79', description: 'UI网页字体' }
    ]
  },
]
export default [
  {
    url: '/web',
    type: 'get',
    response: () => {
      return { name: '前端学习', src: 'web', tab: web_tab }
    }
  }
]