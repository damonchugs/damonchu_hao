import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { router } from "./router/index.js";

import "ant-design-vue/dist/antd.css";

// mock数据
require("/mock/index.js");

// 添加setting
require("./setting.js");

import "loading-api";

// 引入图标
// import * as Icon from '@ant-design/icons-vue'

const app = createApp(App);
app
  .use(store)
  .use(router)
  .mount("#app");

// // 全局导入图标
// for (const i in Icon) {
//   app.component(i, Icon[i])
// }
