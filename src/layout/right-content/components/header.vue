<template>
  <div
    class="right-content-header"
  >
    <div class="menu-toggle" @click="MenuToggleClick">
      <MenuFoldOutlined v-if="PhoneMenuToggle" />
      <MenuUnfoldOutlined v-else />
    </div>
    <div class="tab-name">{{ pathName }}</div>

    <div class="set">
      <p><CustomerServiceOutlined :spin="loading" @click="OpenPianoVisible" /></p>
      <p><SyncOutlined :spin="loading" @click="reflashPage" /></p>
      <p><SettingOutlined :spin="loading" @click="SettingBackground" /></p>
    </div>

    <Drawer
      v-model:visible="DrawerVal.visible"
      :title="DrawerVal.title"
      :placement="DrawerVal.direction"
      @after-visible-change="drawerClose"
    >
      <p>
        <span>颜色：</span>
        <Group
          v-model:value="DrawerVal.value"
          button-style="solid"
          @change="ChangeThemeColor"
        >
          <RadioButton value="light">明亮</RadioButton>
          <RadioButton value="dark">暗黑</RadioButton>
        </Group>
      </p>
      <!-- <div>
        <Button type="primary" @click="BaseData.visible = true"
          >登录</Button
        >
      <div>
        <Button type="primary" @click="OpenPianoVisible">
          钢琴
        </Button>
      </div> -->
    </Drawer>

    <!-- <Drawer
      v-model:visible="BaseData.visible"
      :title="BaseData.title"
      :placement="BaseData.direction"
      width="90%"
      @after-visible-change="BaseDataClose"
    >
      <div class="BaseData-container">
        <LoginContainer v-if="!BaseData.loginCheck" />
        <BaseDataContainer v-else />
      </div>
    </Drawer> -->
    <Drawer
      v-model:visible="PianoSet.visible"
      :title="PianoSet.title"
      :height="PianoSet.height"
      :placement="PianoSet.direction"
      width="90%"
      class="pianoclass"
      @after-visible-change="PianoSetClose"
    >
      <div class="PianoSet-container">
        <Piano />
      </div>
    </Drawer>
  </div>
</template>

<script>
// 引用组件
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

// 引用组件
import Drawer from "ant-design-vue/lib/drawer";
import Button from "ant-design-vue/lib/button";
import "ant-design-vue/lib/button/style/css";
import "ant-design-vue/lib/drawer/style/css";
import { Group, RadioButton } from "ant-design-vue/lib/radio";
import "ant-design-vue/lib/radio/style/css";
import LoginContainer from "@/views/login";
import BaseDataContainer from "@/views/baseData";
import Piano from '@/views/piano';

import {
  SyncOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CustomerServiceOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons-vue";

export default {
  components: {
    SyncOutlined,
    SettingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    CustomerServiceOutlined,
    ConsoleSqlOutlined,
    Button,
    Drawer,
    Group,
    RadioButton,
    LoginContainer,
    BaseDataContainer,
    Piano
  },
  setup() {
    let loading = ref(false);
    const DrawerVal = ref({
      visible: false,
      direction: "right",
      title: "主题设置",
      value: "light",
    });

    const BaseData = ref({
      visible: false,
      direction: "right",
      title: "",
      value: "light",
      loginCheck: () => {
        return localStorage.getItem("dcHaoLogin");
      },
    });

    const store = useStore();
    let pathName = computed(() => store.state.router.path);
    /* 颜色设置 */
    const ThemeColor = computed(() => store.getters.ThemeColor);
    const ThemeColorValue = computed(() => ThemeColor.value);
    const ThemeOptions = computed(() => store.getters.ThemeOptions);
    const BackgroundColor = computed(
      () =>
        ThemeOptions.value
          .find((t) => t.value === ThemeColor.value)
          .colors.split("|")[2]
    );

    /* 目录展开/收缩 */
    const PhoneMenuToggle = computed(() => store.getters.PhoneMenuToggle);
    const MenuToggleClick = () => {
      store.dispatch("setting/SetMenuToggle");
    };

    // 刷新
    const reflashPage = () => {
      window.location.reload();
    };

    // 设置主题 - 弹窗关闭监听
    const drawerClose = () => {
      DrawerVal.value.viisble = false;
    };

    // 设置主题 - 弹窗关闭监听
    const BaseDataClose = () => {
      BaseData.value.viisble = false;
    };

    // 设置背景颜色 - 打开弹窗
    const SettingBackground = () => {
      DrawerVal.value.value = ThemeColor.value;
      DrawerVal.value.visible = true;
    };

    // 设置背景颜色 - 切换模式
    const ChangeThemeColor = (val) => {
      store.dispatch("setting/SetColorValue", val.target.value);
    };

    return {
      pathName,
      loading,
      DrawerVal,
      BaseData,
      ThemeColor,
      BackgroundColor,
      PhoneMenuToggle,
      PianoSet,
      OpenPianoVisible,
      PianoSetClose,
      reflashPage,
      drawerClose,
      SettingBackground,
      ChangeThemeColor,
      MenuToggleClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.right-content-header {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  line-height: 80px;
  color: var(--theme-color-1);
  background-color: var(--theme-background-5);
  .set {
    display: flex;
    p {
      margin-left: 15px;
      cursor: pointer;
      margin-bottom: 0;
      font-size: 16px;
    }
  }

  .menu-toggle {
    width: 40px;
    height: 80px;
    font-size: 20px;
    display: none;
  }
}

@media screen and (max-width: 1000px) {
  .right-content-header .menu-toggle {
    display: block;
  }
}
</style>

<style>
  .pianoclass.ant-drawer .ant-drawer-content {
    overflow-y: hidden;
  }
</style>