<template>
  <div class="left-menu">
    <div class="logo">damonchu-hao</div>
    <Menu />
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
}
</style>