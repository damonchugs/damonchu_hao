const state = {
  path: '前端学习 / 前端论坛',
  router: [
    {
      name: '前端学习', src: 'web', open: true,
      children: [
        { name: '前端论坛', src: 'bbs', open: true },
        { name: '代码hub', src: 'hub', open: false },
        { name: '大牛博客', src: 'blog', open: false },
      ]
    },
    {
      name: '影视娱乐', src: 'video', open: false,
      children: [
        { name: '视频网站', src: 'videoweb', open: false },
        { name: '电影下载', src: 'download', open: false },
        { name: '字幕组', src: 'zimu', open: false },
      ]
    },
  ]
}

const mutations = {
  SETPATH (state, path) {
    state.path = path
  },
  GETROUTER (state) {
    return state.router
  }
}

const actions = {
  setPath ({ commit }, path) {
    commit('SETPATH', path)
  },
  getRouter({ state }) {
    return new Promise((resolve, reject) => {
      if (state.router.length === 0) {
        reject(state.router)
      } else {
        resolve(state.router)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}