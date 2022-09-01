const web_tab = [
  {
    name: '个人网页',
    src: 'damonchu',
    hao: [
      { name: '博客论坛-React', href: 'http://damonchu.fun', description: '个人博客论坛（前端：React+TypeScript+Umi+Antd，后端：nodejs+mysql+sqlite3）' },
      { name: '博客论坛-vue2', href: 'http://damonchu.fun/dcFun/#/diary/home', description: '个人博客论坛VUE（前端：vue2 + element-ui + vue-router + vuex + sass + 腾讯云，后端：nodejs + mysql + sqlite3）' },
      { name: 'hao', href: 'http://damonchu.fun/hao/', description: '页面导航（vue3+antd+mock）' },
      { name: 'Postman_Web', href: 'http://damonchu.fun/Gan_PostMan_Web/', description: '网页简洁版版postweb（React+TypeScript+Umi+dva+Antd）' },
      // { name: '博客论坛', href: 'http://damonchu-1301459681.cos.ap-chengdu.myqcloud.com/page/damonchufun/index.html#/', description: '个人博客论坛（React+TypeScript+Umi+Antd）' },
      // { name: 'hao', href: 'https://damonchu-1301459681.cos.ap-chengdu.myqcloud.com/page/hao/index.html', description: '页面导航（vue3+antd+mock）' },
      // { name: 'Postman_Web', href: 'https://damonchu-1301459681.cos.ap-chengdu.myqcloud.com/page/Gan_PostMan_Web/index.html', description: '网页简洁版版postweb（React+TypeScript+Umi+dva+Antd）' },
    ]
  },
  {
    name: '云服务',
    src: 'yunserver',
    hao: [
      { name: '腾讯云', href: 'https://cloud.tencent.com/', description: '微信+云是真的好用。' },
      { name: '阿里云', href: 'https://www.aliyun.com/', description: '支付宝+云体验有点差。' },
    ]
  },
  {
    name: '地图服务',
    src: 'yunserver',
    hao: [
      { name: '北斗地图', href: 'http://www.beidou.gov.cn/', description: '自研自研。' },
      { name: '百度地图', href: 'https://lbsyun.baidu.com/', description: '国内比较一下算最好的地图了。' },
      { name: '腾讯地图', href: 'https://lbs.qq.com/', description: '腾讯地图就那样吧。一般微信小程序才会用。' },
      { name: '高德地图', href: 'https://lbs.amap.com/', description: '高德地图，还行。' },
      { name: 'Google地图', href: 'https://developers.google.com/maps', description: '全世界范围内最好的地图了，百度高德都得学习的。国内无法访问，痛，太痛了！' },
      { name: 'Leaflet', href: 'https://leafletjs.com/', description: '国内可访问，an open-source JavaScript library for mobile-friendly interactive maps' },
      { name: 'MapBox中文', href: 'http://www.mapbox.cn/', description: 'Mapbox是开发人员的地图平台。在我们简单而强大的API上构建地图和应用程序，并使用我们的开源库进行交互和控制。' },
      { name: 'MapBox', href: 'https://docs.mapbox.com/', description: 'Examples, tutorials, and API references to help you start building with Mapbox.' },
    ]
  },
  {
    name: '前端论坛',
    src: 'bbs',
    hao: [
      { name: '掘金', href: 'https://juejin.cn/', description: '稀土掘金' },
      { name: 'Stackover Flow', href: 'https://stackoverflow.com/', description: '技术问答交流' },
      { name: 'Segmentfault', href: 'https://segmentfault.com/', description: '课程问答设置' },
      { name: '印记中文', href: 'https://docschina.org/', description: '前端导航' },
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
    name: '前端框架',
    src: 'webframe',
    hao: [
      { name: 'ElmentUI', href: 'https://element-plus.gitee.io/zh-CN/', description: '饿了么框架，首页VUE3+国内' },
      { name: 'antd', href: 'https://ant-design.gitee.io/index-cn', description: '阿里框架' },
      { name: 'uniapp', href: 'https://uniapp.dcloud.net.cn/', description: '手机端适配' },
      { name: '微信公众平台', href: 'https://mp.weixin.qq.com/', description: '微信公众平台：公众号，小程序，小游戏。' },
    ]
  },
  {
    name: '博客手册',
    src: 'blog',
    hao: [
      { name: 'MDN', href: 'https://developer.mozilla.org/zh-CN/', description: '手册很方便' },
      { name: '阮一峰网络博客', href: 'http://www.ruanyifeng.com/', description: '前端web技术nginx，node，https等' },
      { name: '廖雪峰网络博客', href: 'https://www.liaoxuefeng.com/', description: '官方网站' },
      { name: '酷 壳', href: 'https://coolshell.cn/', description: '享受编程和技术所带来的快乐 – Coding Your Ambition' },
      { name: '京东凹凸实验室', href: 'https://jelly.jd.com/', description: '欢迎来到全新的 JELLY 官网， 设计师的经验能量补给站！' },
      { name: '百度 FEX', href: 'http://fex.baidu.com/', description: 'FEX 原属于「Web 前端研发部」，现在核心成员都在百度云，致力于将前端技术做成技术产品，我们现在主要产品有 aipage、sugar 和 amis' },
      { name: 'threejs', href: 'https://threejs.org/', description: 'webgl手册' },
      { name: 'mapbox', href: 'https://www.mapbox.cn/', description: '地图使用' },
      { name: '前端相关网站收集整理', href: 'https://github.com/hoc2019/blog/blob/master/article/%E5%89%8D%E7%AB%AF%E5%B7%A5%E4%BD%9C%E5%AD%A6%E4%B9%A0%E7%9B%B8%E5%85%B3%E7%BD%91%E7%AB%99%E6%94%B6%E9%9B%86%E6%95%B4%E7%90%86.md', description: '前端工作学习相关网站收集整理' },
    ]
  },
  {
    name: '设计配色',
    src: 'color',
    hao: [
      { name: 'ant.design', href: 'https://ant.design/docs/spec/colors-cn', description: '阿里设计颜色设计' },
      { name: 'Color Drop', href: 'https://colordrop.io/', description: 'Color Drop' },
      { name: '设计师导航', href: 'https://color.uisdc.com/pick.html', description: '每周更新，一网打尽' },
      { name: 'JSONS.CN', href: 'http://www.jsons.cn/rgbhex/', description: 'HEX配色和RGBA转换' },
    ]
  },
  {
    name: '图片导航',
    src: 'image',
    hao: [
      { name: 'Stockio', href: 'https://www.stockio.com/', description: 'Free Photos, Vectors, Icons, Fonts and Videos' },
      { name: 'Khroma', href: 'http://khroma.co/', description: 'Design with colors you love.' },
      { name: 'LOADING.IO', href: 'https://loading.io/', description: 'Animation Made Easy.Ajax Loader, Animated Icons, Live Background in GIF / SVG / APNG / CSS !' },
    ]
  },
  {
    name: '字体导航',
    src: 'font',
    hao: [
      { name: '有字体', href: 'https://www.webfont.com/', description: '在线云字体，简单易用，阿里云cdn' },
      { name: 'wordmark', href: 'https://wordmark.it/', description: '展示系统字体样式' },
      { name: '字体传奇', href: 'http://www.ziticq.com/', description: '有免费，有商用字体' },
      { name: '图翼', href: 'http://www.tuyiyi.com/show-79', description: 'UI网页字体' },
      { name: 'Font Awesome', href: 'https://fontawesome.dashgame.com/', description: '一套绝佳的图标字体库和CSS框架' },
      { name: '字客网', href: 'https://www.fontke.com/', description: '中英文字体和字体格式转换' },
      { name: 'FREE CHINESE FONTS', href: 'https://www.freechinesefont.com/', description: '176+ traditional/simplified Chinese fonts for free! 中文字体下载试用' },
      { name: 'Free Font Utopia', href: 'https://www.fontsquirrel.com/', description: `Free fonts have met their match. We know how hard it is to find quality freeware that is licensed for commercial work. We've done the hard work, hand-selecting these typefaces and presenting them in an easy-to-use format. ` },
    ]
  },
  {
    name: '前端工具',
    src: 'tools',
    hao: [
      { name: '在线工具', href: 'https://tool.lu/', description: '在线前端工具' },
      { name: 'WordHtml', href: 'https://wordhtml.com/', description: 'Word Document to HTML Online Converter' },
      { name: '123APPS', href: 'https://123apps.com/cn/', description: 'Web Apps by 123apps 编辑、转换、创建' },
      { name: 'IPH', href: 'https://iph.href.lu/100x100?text=%E6%9A%82%E6%97%A0%E6%96%87%E5%AD%97', description: '填充图片，可中文（https://iph.href.lu/100x100?text=%E6%9A%82%E6%97%A0%E6%96%87%E5%AD%97）' },
      { name: 'DummyImage', href: 'https://dummyimage.com/', description: '填充图片，英文' },
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