const getters = {
  router: state => state.router,
  /* 主题设置 */
  /* 颜色 */
  ThemeColor: state => state.setting.color.value,
  ThemeOptions: state => state.setting.color.options
}
export default getters
