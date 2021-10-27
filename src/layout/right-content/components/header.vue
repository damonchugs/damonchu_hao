<template>
  <div class="right-content-header">
    <div class="tab-name">{{ pathName }}</div>

    <div class="set">
      <p><SyncOutlined :spin="loading" @click="reflashPage" /></p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'

import {
  SyncOutlined,
} from '@ant-design/icons-vue';

export default {
  components: { SyncOutlined },
  setup () {
    let loading = ref(false)
    
    const store = useStore()
    let pathName = computed(() => store.state.router.path)

    // 刷新
    const reflashPage = () => {
      window.location.reload()
    }

    return {
      pathName,
      loading,
      reflashPage
    }
  }
}
</script>

<style lang="scss" scoped>
.right-content-header {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  line-height: 80px;
  background-color: #bcbcbc;
  .set {
    display: flex;
    p {
      margin-left: 10px;
      cursor: pointer;
      margin-bottom: 0;
    }
  }
}
</style>