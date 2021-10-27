<template>
  <div class="left-menu">
    <div class="logo">DamonChu-hao</div>
    <Menu />
    <div class="left-menu-bottom">Vue3-Demo</div>
  </div>
</template>

<script>
import Menu from './menu.vue'
export default {
  components: {
    Menu
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
    background-color: #595959;
  }
  .left-menu-bottom {
    height: 60px;
    line-height: 60px;
    color: #707070;
    background-color: #fbfbfb;
  }
}
</style>