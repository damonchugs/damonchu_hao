<template>
  <Layout />
</template>

<script>
import Layout from "./layout/index.vue";

export default {
  name: "App",
  components: {
    Layout,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<style lang="scss">
@import url(./styles/index.scss);
</style>
