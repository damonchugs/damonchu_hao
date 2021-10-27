<template>
  <div class="left-menu-contanier">
    <div v-for="(t, index) in menu" :key="`left-menu_${index}`">
      <p :class="`menu-name menu-parent ${t.open ? 'active' : ''}`" @click="openChild(menu, t)">{{ t.name }}</p>
      
      <div class="menu-child-content" :style="`height: ${t.open ? t.children.length * 40 : 0}px;`">
        <p v-for="(te, inv) in t.children" :key="`left-menu-child_${inv}`" :class="`menu-name menu-child ${te.open ? 'active' : ''}`" @click="gotoRouter(menu, index, te)">{{ te.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex';
export default {
  setup () {
    const store = useStore();
    let router = computed(() => store.state.router.router)
    let pathName = computed(() => store.state.router.path)

    const menu = ref(router)

    // 父级目录选择
    const openChild = (menu, t) => {
      t.open = !t.open
      otherMenuSet(menu, t.name)
      store.dispatch('router/setPath', t.name)
    }

    // 子目录选择
    const gotoRouter = (menu, index, te) => {
      // this.$route.push({ path: menu[index].src + '/' + te.src })
      te.open = !te.open
      menu[index].children.filter(t => te.name !== t.name).map(tem => tem.open = false)
      store.dispatch('router/setPath', `${pathName.value.split('/')[0].trim()} / ${te.name}`)
      naver(te.src)
    }

    // 其他menu设置false
    const otherMenuSet = (menu, name) => {
      menu.filter(tr => tr.name !== name).map(temp => {
        temp.open = false
        temp.children.map(tem => tem.open = false)
      })
    }

    // 跳转锚点
    const naver = (id) => {
      const obj = document.getElementById(`hao_tab-${id}`);
      const obj_scroll = document.getElementsByClassName('right-content-content')[0]
      const oPos = obj.offsetTop
      return obj_scroll.scrollTo(0, oPos - 80 - 10)
    }

    return {
      menu,
      pathName,
      gotoRouter,
      openChild
    }
  }
}
</script>

<style lang="scss" scoped>
.left-menu-contanier {
  height: calc(100vh - 80px - 60px);
  background-color: #e8e8e8;
  .menu-name {
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    margin: 0;
    &.menu-child {
      padding-left: 50px;
      &:hover {
        background-color: #e1e1e1;
      }
    }
    &.active {
      background-color: #c1c1c1 !important;
      &.menu-child {
        background-color: #d3d3d3 !important;
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