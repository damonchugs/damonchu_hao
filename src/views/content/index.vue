<template>
  <div class="app-container">
    <div
      v-for="(t, index) in hao_data"
      :key="`hao_tab_${index}`"
      class="hao_tab"
      :id="`hao_tab-${t.src}`"
    >
      <Divider orientation="left" style="border-color: #7cb305" dashed>
        {{ t.name }}
        <span style="font-size: 12px">{{
          t.subtitle ? ` - ${t.subtitle}` : ""
        }}</span>
      </Divider>

      <div class="href_tab_div">
        <div
          v-for="(te, inv) in t.hao"
          :key="`href_${inv}`"
          class="href_tab"
          @click="gotoHref(te.href)"
        >
          <p>{{ te.name }}</p>
          <p>{{ te.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 引用组件
import Divider from "ant-design-vue/lib/divider";
import "ant-design-vue/lib/divider/style/css";
// 引用插件
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
// 请求数据
import axios from "axios";

const store = useStore();

const pathName = computed(() => store.state.router.path);
const route = computed(() => store.state.router.router);
const subject = computed(() => store.state.router.subject);
const hao_data = ref([]);

// 监听地址，刷新页面数据
watch(pathName, (val, new_val) => {
  if (new_val.trim().split("/")[0] !== val.trim().split("/")[0]) {
    const src = route.value.find((t) => t.open)?.src || null;
    if (src) {
      getTabData(src);
    }
  }
});

onMounted(() => {
  getTabData(subject.value);
});

// 获取tab_data
const getTabData = (url) => {
  axios.get(`/mock/${url}`).then((response) => {
    hao_data.value = response.data.tab;

    // 保存上次浏览专题
    store.dispatch("router/setSubject", url);
    localStorage.setItem("dchaoStorage", url);
  });
};

// 跳转链接
const gotoHref = (src) => {
  window.open(src);
};
</script>

<style lang="scss" scoped>
.app-container {
  text-align: left;
  padding: 10px;
  .hao_tab {
    margin-bottom: 30px;
    background-color: white;
    border-radius: 5px;
    padding: 10px 20px;
    .href_tab_div {
      display: flex;
      flex-wrap: wrap;
      .href_tab {
        margin-right: 15px;
        border: 1px solid #8b8b8b;
        padding: 10px;
        min-width: 120px;
        max-width: 280px;
        cursor: pointer;
        margin-bottom: 15px;
        overflow-wrap: break-word;
        p {
          margin: 0px;
          font-size: $fontSize-12;
          color: #8b8b8b;
          &:first-child {
            margin-bottom: 10px;
            font-size: $fontSize-15;
            color: #656565;
          }
        }
      }
    }
  }
}
</style>