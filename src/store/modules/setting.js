const state = {
  color: {
    value: localStorage.getItem('DamonchuHaoTheme') || 'light',
    options: [
      { value: 'light', colors: '#595959|#e8e8e8,#c1c1c1,#d3d3d3,#000000|#bcbcbc,#000000' },
      { value: 'dark', colors: '#000000|#001529,#096dd9,#1890ff,#ffffff|#001529,#ffffff' },
    ]
  },
  isPhone: window.screen.width <= 1000,
  menu: {
    toggle: false,
  }
}

const mutations = {
  SET_COLOR_VALUE(state, payload) {
    state.color.value = payload
  },
  SET_MENU_TOGGLE(state) {
    state.menu.toggle = !state.menu.toggle
  }
}

const actions = {
  /* 设置主题颜色 */
  SetColorValue({ commit }, payload) {
    localStorage.setItem('DamonchuHaoTheme', payload)
    commit('SET_COLOR_VALUE', payload)
  },
  SetMenuToggle({ commit }) {
    commit('SET_MENU_TOGGLE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}