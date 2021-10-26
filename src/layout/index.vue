<template>
  <div class="layout-container">
    <LeftMenu />
    <RightContent />
  </div>
</template>

<script>
  import LeftMenu from './left-menu/index.vue'
  import RightContent from './right-content/index.vue'
  export default {
    name: 'Layout-container',
    components: {
      LeftMenu, RightContent
    },
    setup() {
      return {

      }
    }
  }
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  justify-content: space-between;
}
</style>