<template>
  <div class="left-menu" :style="`left: ${IsPhone && !PhoneMenuToggle ? '-100vw' : '0px'}`">
    <div class="logo">DamonChu-hao</div>
    <Menu />
    <div class="left-menu-bottom">Vue3-Demo</div>
    <div class="mask" @click="MenuMaskClick" :style="`display: ${IsPhone ? 'block' : 'none'}; opacity: ${PhoneMenuToggle ? 0.6 : 0};`"></div>
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

    const PhoneMenuToggle = computed(() => store.getters.PhoneMenuToggle)
    const IsPhone = computed(() => store.getters.IsPhone)
    const MenuMaskClick = () => {
      store.dispatch('setting/SetMenuToggle')
    }

    return {
      BackgroundColor,
      PhoneMenuToggle,
      IsPhone,
      MenuMaskClick,
    }
  }
}
</script>

<style lang="scss" scoped>
.left-menu {
  width: 200px;
  transition: left .2s;
  position: relative;
  z-index: 3;
  background-color: var(--theme-background-1);
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
  .mask {
    width: calc(100vw - 200px);
    height: 100vh;
    position: absolute;
    right: calc(200px - 100vw);
    top: 0px;
    z-index: 2;
    background-color: rgb(0,0,0);
    opacity: 0.6;
    transition: opacity 1s;
  }
}

@media screen and (max-width: 1000px) {
  .left-menu {
    position: fixed;
  }

}
</style>