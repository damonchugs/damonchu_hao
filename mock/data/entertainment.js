const entertainment_tab = [
  {
    name: '购物消费',
    src: 'shopping',
    hao: [
      { name: '淘宝', href: 'https://www.taobao.com/', description: '上天猫' },
      { name: '京东', href: 'https://jd.com/', description: '狗东' },
      { name: '华为商城', href: 'https://www.vmall.com/', description: '菊花标' },
      { name: '小米商城', href: 'https://www.mi.com/shop', description: 'MI' },
      { name: '火车票', href: 'https://www.12306.cn/', description: '12306火车订票网站' },
    ]
  },
  {
    name: '厨房菜谱',
    src: 'kitchen',
    hao: [
      { name: '下厨房', href: 'https://www.xiachufang.com/', description: '家常菜快手菜下饭菜早餐肉鱼全部菜谱分类 菜谱榜单 打开APP看排行榜 发现新菜 新创建的菜谱,编辑每日精选 视频菜谱 视频详解操作流程,想失败都难 新秀菜谱' }
    ]
  },
  {
    name: '软件资源',
    src: 'application',
    hao: [
      { name: '青涩的猫', href: 'https://yiwa.tv/', description: 'windows和mac资源' },
      { name: '扩展迷', href: 'https://www.extfans.com/', description: 'Chrome插件扩展下载网' },
    ]
  },
  {
    name: '网页工具',
    src: 'application',
    hao: [
      { name: 'Receive SMS Online', href: 'https://smsreceivefree.com/', description: 'Temporary and disposable phone numbers, always free(暂时的,一次性电话号码,总是免费的)' },
      { name: '猿料', href: 'https://yuanliao.info/', description: '猿料 , 一个有想法的社区（utools）' },
    ]
  },
  {
    name: '识图搜索',
    src: 'entertainmentweb',
    hao: [
      { name: '百度识图', href: 'https://image.baidu.com/', description: '不完整图片、完整图片' },
      { name: 'Google识图', href: 'https://www.google.com/imghp', description: '不完整图片、完整图片' },
      { name: 'SauceNao', href: 'https://saucenao.com/', description: '完整图片 P站 及部分推特图' },
      { name: 'Комкон', href: 'http://fgo.vgtime.com/', description: '不完整图片、完整图片 残图推荐' },
      { name: '二次元画像詳細検索', href: 'https://ascii2d.net/', description: '以图搜图 仅限P站以及推特' },
      { name: 'IQDB', href: 'http://www.iqdb.org/', description: '不完整图片、完整图片 图库不全' },
    ]
  }
]
export default [
  {
    url: '/entertainment',
    type: 'get',
    response: () => {
      return { name: '生活娱乐', src: 'entertainment', tab: entertainment_tab }
    }
  }
]