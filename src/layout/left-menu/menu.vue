<template>
  <div
    class="left-menu-contanier"
  >
    <div v-for="(t, index) in menu" :key="`left-menu_${index}`">
      <p
        :class="`menu-name menu-parent ${t.open ? 'active' : ''}`"
        :style="`background-color: ${
          t.open ? BackgroundColor.split(',')[1] : ''
        };`"
        @click="openChild(menu, t)"
      >
        {{ t.name }}
      </p>

      <div
        class="menu-child-content"
        :style="`height: ${t.open ? t.children.length * 40 : 0}px;`"
      >
        <p
          v-for="(te, inv) in t.children"
          :key="`left-menu-child_${inv}`"
          :class="`menu-name menu-child ${te.open ? 'active' : ''}`"
          :style="`background-color: ${
            te.open ? BackgroundColor.split(',')[2] : ''
          };`"
          @click="gotoRouter(menu, index, te)"
        >
          {{ te.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { _isMobile } from "@/utils/index";
export default {
  setup() {
    const store = useStore();
    let router = computed(() => store.state.router.router);
    let pathName = computed(() => store.state.router.path);

    const menu = ref(router);

    onMounted(() => {
      GetMenu();
    });

    /* 获取路由信息 */
    const GetMenu = async () => {
      store.dispatch("router/getRouterMenu", { type: 'MenuList' })
    }

    /* 颜色设置 */
    const ThemeColor = computed(() => store.getters.ThemeColor);
    const ThemeOptions = computed(() => store.getters.ThemeOptions);
    const BackgroundColor = computed(
      () =>
        ThemeOptions.value
          .find((t) => t.value === ThemeColor.value)
          .colors.split("|")[1]
    );

    // 父级目录选择
    const openChild = (menu, t) => {
      t.open = !t.open;
      otherMenuSet(menu, t.name);
      store.dispatch("router/setPath", t.name);
    };

    // 子目录选择
    const gotoRouter = (menu, index, te) => {
      // this.$route.push({ path: menu[index].src + '/' + te.src })
      te.open = !te.open;
      menu[index].children
        .filter((t) => te.name !== t.name)
        .map((tem) => (tem.open = false));
      store.dispatch(
        "router/setPath",
        `${pathName.value.split("/")[0].trim()} / ${te.name}`
      );
      naver(te.src);

      // 手机端,点击目录后关闭
      if (_isMobile) store.dispatch('setting/SetMenuToggle')
    };

    // 其他menu设置false
    const otherMenuSet = (menu, name) => {
      menu
        .filter((tr) => tr.name !== name)
        .map((temp) => {
          temp.open = false;
          temp.children.map((tem) => (tem.open = false));
        });
    };

    // 跳转锚点
    let timer = null;
    const naver = (id) => {
      const obj = document.getElementById(`hao_tab-${id}`);
      const obj_scroll = document.getElementsByClassName(
        "right-content-content"
      )[0];
      const obj_container = document.getElementsByClassName("app-container")[0];
      const max = obj_container.clientHeight - obj_scroll.clientHeight;
      const oPos = obj.offsetTop - 80 - 10;

      // 如果已建立定时器，清除定时器
      if (timer) clearInterval(timer);

      scrollAnimation(obj_scroll, oPos > max ? max : oPos, 1000 / 120);
    };

    // 匀速动画 - 跳转锚点
    const scrollAnimation = (obj, Pos, time) => {
      timer = setInterval(() => {
        var currentY = obj.scrollTop; // 当前及滑动中任意时刻位置
        var distance = Pos > currentY ? Pos - currentY : currentY - Pos; // 剩余距离
        var speed = Math.ceil(distance / time); // 每时刻速度

        if (
          Math.ceil(currentY) === Pos ||
          Math.ceil(currentY) === obj.clientHeight
        ) {
          clearInterval(timer);
        } else {
          obj.scrollTo(0, Pos > currentY ? currentY + speed : currentY - speed);
        }
      }, 10);
    };

    return {
      menu,
      pathName,
      BackgroundColor,
      gotoRouter,
      openChild,
    };
  },
};
</script>

<style lang="scss" scoped>
.left-menu-contanier {
  @include scrollbar();
  height: calc(100vh - 80px - 60px);
  color: var(--theme-color-1);
  background-color: var(--theme-background-2);
  overflow-y: auto;
  overflow-x: hidden;

  .menu-name {
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    margin: 0;
    transition: padding 0.5s;
    &.menu-child {
      padding-left: 50px;
      &:hover {
        // background-color: #e1e1e1;
        padding-left: 20px;
      }
    }
    &.active {
      // background-color: #c1c1c1 !important;
      &.menu-child {
        //  background-color: #d3d3d3 !important;
        padding-left: 10px;
      }
    }
  }
  .menu-child-content {
    height: 0px;
    transition: height 0.5s;
    overflow: hidden;
    &.height-auto {
      height: auto;
    }
  }
}
</style>