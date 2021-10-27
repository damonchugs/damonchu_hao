import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

// mock数据
require('/mock/index.js')

// 引入图标
// import * as Icon from '@ant-design/icons-vue'

const app = createApp(App)
app.use(store).mount('#app')

// // 全局导入图标
// for (const i in Icon) {
//   app.component(i, Icon[i])
// }
