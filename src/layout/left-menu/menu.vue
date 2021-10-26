<template>
  <div class="left-menu-contanier">
    <div v-for="(t, index) in menu" :key="`left-menu_${index}`">
      <p :class="`menu-name menu-parent ${t.open ? 'active' : ''}`" @click="openChild(menu, t)">{{ t.name }}</p>
      
      <div class="menu-child-content" :style="`height: ${t.open ? t.children.length * 40 : 0}px;`">
        <p v-for="(te, inv) in t.children" :key="`left-menu-child_${inv}`" :class="`menu-name menu-child ${te.open ? 'active' : ''}`" @click="gotoRouter(menu, index, te)">{{ t.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup () {
    const menu = ref([
      {
        name: 'fa_1',
        src: 'faSrc_1',
        open: true,
        children: [{ name: 'fa_1_1', src: 'faSrc_1_1', open: false }, { name: 'fa_1_2', src: 'faSrc_1_2', open: false }, { name: 'fa_1_3', src: 'faSrc_1_3', open: false }]
      },
      {
        name: 'fa_2',
        src: 'faSrc_2',
        open: false,
        children: [{ name: 'fa_2_1', src: 'faSrc_2_1', open: false }, { name: 'fa_2_2', src: 'faSrc_2_2', open: false }, { name: 'fa_2_3', src: 'faSrc_2_3', open: false }]
      },
      {
        name: 'fa_3',
        src: 'faSrc_3',
        open: false,
        children: [{ name: 'fa_3_1', src: 'faSrc_3_1', open: false }, { name: 'fa_3_2', src: 'faSrc_3_2', open: false }, { name: 'fa_3_3', src: 'faSrc_3_3', open: false }]
      }
    ])

    const gotoRouter = (menu, index, te) => {
      console.log(te.src)
      te.open = !te.open
      // otherMenuSet(menu, te.name)
      menu[index].children.filter(t => te.name !== t.name).map(tem => tem.open = false)
    }

    const openChild = (menu, t) => {
      t.open = !t.open
      otherMenuSet(menu, t.name)
    }

    // 其他menu设置false
    const otherMenuSet = (menu, name) => {
      menu.filter(tr => tr.name !== name).map(temp => {
        temp.open = false
        temp.children.map(tem => tem.open = false)
      })
    }

    return {
      menu,
      gotoRouter,
      openChild
    }
  }
}
</script>

<style lang="scss" scoped>
.left-menu-contanier {
  height: calc(100vh - 80px);
  background-color: #e8e8e8;
  .menu-name {
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    &.menu-child {
      padding-left: 20px;
      &:hover {
        background-color: #e1e1e1;
      }
    }
    &.active {
      background-color: #c1c1c1 !important;
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