<template>
  <div class="right-content-content">
    <Container />
  </div>
</template>

<script>
import Container from '../../../views/content/index.vue'
export default {
  components: { Container },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.right-content-content {
  width: 100%;
  height: calc(100vh - 80px);
  overflow-x: hidden;
  overflow-y: auto;
}
</style>