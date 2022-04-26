<template>
  <div class="left-menu" :style="`background-color: ${BackgroundColor};`">
    <div class="logo">DamonChu-hao</div>
    <Menu />
    <div class="left-menu-bottom">Vue3-Demo</div>
  </div>
</template>

<script>
// 引用组件
import Menu from './menu.vue'

// 引用组件
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'LayoutLeftMenu',
  components: {
    Menu
  },
  setup() {
    const store = useStore()

    /* 颜色设置 */
    const ThemeColor = computed(() => store.getters.ThemeColor)
    const ThemeOptions = computed(() => store.getters.ThemeOptions)
    const BackgroundColor = computed(() => ThemeOptions.value.find(t => t.value === ThemeColor.value).colors.split('|')[0])

    return {
      BackgroundColor
    }
  }
}
</script>

<style lang="scss" scoped>
.left-menu {
  width: 200px;
  .logo {
    height: 80px;
    line-height: 80px;
    color: white;
    font-family: 'ChannelSlanted2';
  }
  .left-menu-bottom {
    height: 60px;
    line-height: 60px;
    color: #707070;
    background-color: #fbfbfb;
  }
}
</style>