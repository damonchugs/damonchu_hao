<template>
  <div class="left-menu-contanier">
    <div v-for="(t, index) in menu" :key="`left-menu_${index}`">
      <p class="menu-name menu-parent" @click="openChild(t)">{{ t.name }}</p>
      
      <div v-for="(te, index) in (t.open ? t.children : [])" :key="`left-menu-child_${index}`">
        <p class="menu-name menu-child" @click="gotoRouter(te.src)">{{ t.name }}</p>
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
        children: [{ name: 'fa_1_1', src: 'faSrc_1_1' }, { name: 'fa_1_2', src: 'faSrc_1_2' }, { name: 'fa_1_3', src: 'faSrc_1_3' }]
      },
      {
        name: 'fa_2',
        src: 'faSrc_2',
        open: false,
        children: [{ name: 'fa_2_1', src: 'faSrc_2_1' }, { name: 'fa_2_2', src: 'faSrc_2_2' }, { name: 'fa_2_3', src: 'faSrc_2_3' }]
      },
      {
        name: 'fa_3',
        src: 'faSrc_3',
        open: false,
        children: [{ name: 'fa_3_1', src: 'faSrc_3_1' }, { name: 'fa_3_2', src: 'faSrc_3_2' }, { name: 'fa_3_3', src: 'faSrc_3_3' }]
      }
    ])

    const gotoRouter = (src) => {
      console.log(src)
    }

    const openChild = (t) => {
      console.log(t)
      t.open = !t.open
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
}
</style>