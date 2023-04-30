import Server from "@/api/index";

/* 获取目录 - 转换代码格式 */
function CheckData(routerArray) {
  const route = [];
  const menu = routerArray.filter((t) => t.parent_id === null);
  menu.forEach((te) => {
    const { id, name, src, parent_id } = te;
    const arr = { id, parent_id, name, src, open: false, children: [] };
    const tab = routerArray.filter((t) => t.parent_id === id);
    tab.forEach((t) => {
      arr.children.push({
        ...t,
        open: false,
      });
    });
    route.push(arr);
  });

  // 获取上次浏览专题 - 默认第一个专题
  const subject = localStorage.getItem("dchaoStorage") || route[0].src;
  const router = route.find((t) => t.src === subject);

  router.open = true;
  router.children[0].open = true;

  return {
    router,
    route,
    subject,
  };
}

/* 获取网页列表 - 转换代码格式 */
function CheckTab(router, subject, tab_list) {
  const list = router.find((t) => t.src === subject)?.children || null;

  if (list === null) return [];

  /* 整理 */
  const Tab = [];
  list.forEach((temp) => {
    const { id, name, src, subtitle } = temp;
    console.log(temp, "temp");
    Tab.push({
      name,
      src,
      subtitle,
      hao: tab_list.filter((t) => t.directory_id === id),
    });
  });

  return Tab;
}

const state = {
  subject: "",
  path: "",
  router: [],
  tab: [],
  hao: [],
};

const mutations = {
  SET_PATH(state, path) {
    state.path = path;
  },
  GET_ROUTER(state) {
    return state.router;
  },
  SET_ROUTER(state, router) {
    state.router = router;
  },
  SET_SUBJECT(state, src) {
    state.subject = src;
  },
  SET_TAB(state, tab) {
    state.tab = tab;
  },
  GET_TAB(state) {
    return state.tab;
  },
  SET_HAO(state, hao) {
    state.hao = hao;
  },
};

const actions = {
  setPath({ commit }, path) {
    commit("SET_PATH", path);
  },
  setSubject({ commit }, src) {
    commit("SET_SUBJECT", src);
  },
  getRouterTab({ state, commit }, payload) {
    return new Promise(async (resolve) => {
      let Tab = [];
      if (state.tab.length === 0) {
        const { data } = await Server.hao.GetMainMenu({ type: "HaoList" });

        const { router, subject } = state;
        Tab = CheckTab(router, payload, data);
        commit("SET_HAO", data);
        commit("SET_TAB", Tab);
      } else {
        const { router, subject, hao } = state;
        Tab = CheckTab(router, payload, hao);
      }
      resolve(Tab);
    });
  },
  getRouterMenu({ state, commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        if (state.router.length === 0) {
          const response_menu = await Server.hao.GetMainMenu({
            type: "MenuList",
          });
          const { router, route, subject } = CheckData(response_menu.data);

          commit("SET_SUBJECT", subject);
          commit("SET_PATH", `${router.name} / ${router.children[0].name}`);
          commit("SET_ROUTER", route);
          resolve(router);
        } else {
          resolve(state.router);
        }
      } catch (err) {
        resolve([]);
      }
    });
  },
  getRouter({ state }, payload) {
    return new Promise(async (resolve, reject) => {
      if (state.router.length === 0) {
        reject(state.router);
      } else {
        resolve(state.router);
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
