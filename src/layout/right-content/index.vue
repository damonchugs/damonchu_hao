<template>
  <div class="right-content">
    <Header />
    <Content />
  </div>
</template>

<script>
import Header from './components/header.vue'
import Content from './components/content.vue'
export default {
  components: { Header, Content },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.right-content {
  width: calc(100vw - 200px);
}
</style>