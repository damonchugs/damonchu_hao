import { router } from "./router";

import * as NProgress from "nprogress";
import "nprogress/nprogress.css";

/* 设置路由守卫 */
router.beforeEach((to, from, next) => {
  NProgress.start();

  /* 检测是否有用户登录，且页面不是‘login’ */
  if (to.path === "/") {
    next(`/home`);
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done(true);
});
