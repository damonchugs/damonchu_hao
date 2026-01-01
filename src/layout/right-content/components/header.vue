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
      <p><SearchOutlined :spin="loading" @click="OpenSearchVisible" /></p>
      <p><CustomerServiceOutlined :spin="loading" @click="OpenPianoVisible" /></p>
      <p><VideoCameraOutlined :spin="loading" @click="OpenVrPlayerVisible" /></p>
      <p><InstagramOutlined :spin="loading" @click="GoToImageArray" /></p>
      <p><SyncOutlined :spin="loading" @click="reflashPage" /></p>
      <p><DownloadOutlined :spin="loading" @click="OpenDownloadImageVisible" /></p>
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

    <!-- 钢琴 -->
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

    <!-- Vr视频 -->
    <Drawer
      v-model:visible="VrPlayer.visible"
      :title="VrPlayer.title"
      :height="VrPlayer.height"
      :placement="VrPlayer.direction"
      width="90%"
      class="vrclass"
      @after-visible-change="VrPlayerClose"
    >
      <div class="vrclass-container">
        <VrPlayerDom v-if="VrPlayer.visible" />
      </div>
    </Drawer>

    <!-- 搜索框 -->
    <Modal
      v-model:visible="Search.visible"
      :title="Search.title"
      :footer="null"
      :width="IsPhone ? '100%' : '50%'"
      class="SearchClass"
      closable
      destroyOnClose
      @cancel="SearchClose"
    >
      <div class="Search-container">
        <SearchBoxDom v-if="Search.visible" />
      </div>
    </Modal>

    <Drawer
      v-model:visible="DownloadImage.visible"
      :title="DownloadImage.title"
      :height="DownloadImage.height"
      :placement="DownloadImage.direction"
      width="90%"
      class="pianoclass"
      @after-visible-change="DownloadImageClose"
    >
      <div class="DownloadImage-container">
        <DownloadImages />
      </div>
    </Drawer>
  </div>
</template>

<script>
// 引用组件
import { ref, computed } from "vue";
import { useStore } from "vuex";

// 引用组件
import Modal from "ant-design-vue/lib/modal";
import Drawer from "ant-design-vue/lib/drawer";
import Button from "ant-design-vue/lib/button";
import "ant-design-vue/lib/button/style/css";
import "ant-design-vue/lib/drawer/style/css";
import { Group, RadioButton } from "ant-design-vue/lib/radio";
import "ant-design-vue/lib/radio/style/css";
import LoginContainer from "@/views/login";
import BaseDataContainer from "@/views/baseData";

import Piano from '@/views/piano';
import VrPlayerDom from '@/views/vrPlayer';
import SearchBoxDom from '@/views/searchBox';
import DownloadImages from '@/views/downloadImage';

import {
  SyncOutlined,
  SettingOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CustomerServiceOutlined,
  ConsoleSqlOutlined,
  VideoCameraOutlined,
  SearchOutlined,
  InstagramOutlined,
  DownloadOutlined,
} from "@ant-design/icons-vue";

export default {
  components: {
    SyncOutlined,
    SettingOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    CustomerServiceOutlined,
    ConsoleSqlOutlined,
    VideoCameraOutlined,
    InstagramOutlined,
    SearchOutlined,
    DownloadOutlined,
    Button,
    Drawer,
    Group,
    RadioButton,
    Modal,
    LoginContainer,
    BaseDataContainer,
    Piano,
    VrPlayerDom,
    SearchBoxDom,
    DownloadImages
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
    /* 判断是否是手机pad */
    const IsPhone = computed(() => store.getters.IsPhone);
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

    const VrPlayer = ref({
      visible: false,
      title: '',
      height: '100vh',
      direction: 'top',
    })

    const Search = ref({
      visible: false,
      title: '',
    })

    const OpenVrPlayerVisible = (val) => {
      VrPlayer.value.visible = true
    }

    const VrPlayerClose = (val) => {
      VrPlayer.value.visible = false
    }

    const OpenSearchVisible = (val) => {
      Search.value.visible = true
    }

    const SearchClose = (val) => {
      Search.value.visible = false
    }

    /* 钢琴功能显示 */
    const PianoSet = ref({
      visible: false,
      title: '',
      height: '80vh',
      direction: 'top',
    })

    const OpenPianoVisible = (val) => {
      PianoSet.value.visible = true
    }

    const PianoSetClose = (val) => {
      PianoSet.value.visible = false
    }

    /* 下载图片页 */
    const DownloadImage = ref({
      visible: false,
      title: '',
      direction: 'top',
      height: '80vh'
    })
    
    /* 打开下载图片页 */
    const OpenDownloadImageVisible = () => {
      DownloadImage.value.visible = true;
    }
    /* 关闭下载图片页 */
    const DownloadImageClose = () => {
      DownloadImage.value.visible = false;
    }

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

    // 跳转图片页
    const GoToImageArray = () => {
      
      window.open('/hao/#/images');
    };

    return {
      pathName,
      loading,
      DrawerVal,
      BaseData,
      ThemeColor,
      BackgroundColor,
      PhoneMenuToggle,
      VrPlayer,
      OpenVrPlayerVisible,
      VrPlayerClose,
      PianoSet,
      OpenPianoVisible,
      PianoSetClose,
      Search,
      OpenSearchVisible,
      SearchClose,
      reflashPage,
      drawerClose,
      SettingBackground,
      ChangeThemeColor,
      MenuToggleClick,
      GoToImageArray,
      IsPhone,
      DownloadImage,
      OpenDownloadImageVisible,
      DownloadImageClose,
      DownloadOutlined,
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

  .tab-name {
    @include Ellipsis();
    min-width: 112px;
  }

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

<style lang="scss">
  .pianoclass.ant-drawer .ant-drawer-content {
    overflow-y: hidden;
  }
  .vrclass.ant-drawer {
    .ant-drawer-close {
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .anticon.anticon-close {
      position: relative;
      top: 0px;
      left: -15px;
    }
  }

  // .Search-container {
    
  // }
</style>