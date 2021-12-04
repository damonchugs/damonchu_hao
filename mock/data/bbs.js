const bbs_tab = [
  {
    name: '游戏论坛',
    src: 'bbsweb',
    hao: [
      { name: 'NGA', href: 'https://bbs.nga.cn/', description: '艾泽拉斯国家地理ヽ(ﾟ∀ﾟ)ﾒ(ﾟ∀ﾟ)ﾉ ' },
      { name: 'FGO手册', href: 'http://fgo.vgtime.com/', description: '《Fate/Grand Order》是由TYPE-MOON推出智能手机专用的角色扮演游戏。国服由B站代理，中文名为《命运-冠位指定》。' },
      { name: 'FGOwiki', href: 'https://fgo.wiki/w/%E9%A6%96%E9%A1%B5', description: '欢迎来到Mooncell！' },
      { name: 'DarkSouls', href: 'https://leminerva.github.io/Dark-Souls-Documents/index.html', description: '黑暗之魂系列文本与数据档案。' },
    ]
  }
]
export default [
  {
    url: '/bbs',
    type: 'get',
    response: () => {
      return { name: '论坛BBS', src: 'bbs', tab: bbs_tab }
    }
  }
]