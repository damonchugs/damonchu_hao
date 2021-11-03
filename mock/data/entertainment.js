const entertainment_tab = [
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