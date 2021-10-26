const video_tab = [
  {
    name: '视频网站',
    hao: [
      { name: 'Bilibili', href: 'https://www.bilibili.com/', description: '哔哩哔哩 (゜-゜)つロ 干杯~-bilibili' },
      { name: 'AcFun', href: 'https://www.acfun.cn/', description: 'AcFun是国内首家弹幕视频网站，这里有全网独家动漫新番， 友好的弹幕氛围，有趣的UP主，好玩有科技感的虚拟偶像，年轻人都在用。' },
      { name: '美剧星球', href: 'https://meijuxingqiu.net/', description: '比起看剧，小破球更想陪你一起看更广阔的世界！' },
      { name: '奈菲影视', href: 'https://www.nfmovies.com/', description: '奈非copy' },
    ]
  },
  {
    name: '电影下载',
    hao: [
      { name: '电影天堂吧', href: 'http://www.dytt8.net/', description: '电影天堂吧' },
      { name: '电影天堂', href: 'http://www.dy2018.com/', description: '电影天堂' },
      { name: '磁力熊', href: 'https://www.cilixiong.com/', description: '纯净的1080P高分电影磁力下载站' }
    ]
  }
]

export default [
  {
    url: '/video',
    type: 'get',
    response: () => {
      return video_tab
    }
  }
]