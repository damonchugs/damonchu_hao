<template>
  <div class="login-container">
    <div class="left-image">left</div>
    <div class="right-form">form</div>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<script setup>
</script>

<style lang="scss" scoped>
.login-container {
  justify-content: space-between;
  .left-image,
  .right-form {
    width: 50%;
  }

  .left-image {
    background-color: $backgroundColor-1;
  }
}
</style>