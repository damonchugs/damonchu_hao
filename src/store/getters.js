const getters = {
  router: state => state.router,
  /* 主题设置 */
  /* 颜色 */
  ThemeColor: state => state.setting.color.value,
  ThemeOptions: state => state.setting.color.options,
  /* 手机端-目录展开/收起 */
  IsPhone: state => state.setting.isPhone,
  PhoneMenuToggle: state => state.setting.menu.toggle,
}
export default getters
