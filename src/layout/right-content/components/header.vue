<template>
  <div class="right-content-header" :style="`background-color: ${BackgroundColor.split(',')[0]}; color: ${BackgroundColor.split(',')[1]};`">
    <div class="menu-toggle" @click="MenuToggleClick">
      <MenuFoldOutlined v-if="PhoneMenuToggle" />
      <MenuUnfoldOutlined v-else />
    </div>
    <div class="tab-name">{{ pathName }}</div>

    <div class="set">
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
        <Group v-model:value="DrawerVal.value" button-style="solid" @change="ChangeThemeColor">
          <RadioButton value="light">明亮</RadioButton>
          <RadioButton value="dark">暗黑</RadioButton>
        </Group>
      </p>
    </Drawer>
  </div>
</template>

<script>
// 引用组件
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

// 引用组件
import Drawer from 'ant-design-vue/lib/drawer'
import "ant-design-vue/lib/drawer/style/css"
import { Group, RadioButton } from 'ant-design-vue/lib/radio'
import "ant-design-vue/lib/radio/style/css"

import {
  SyncOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined
} from '@ant-design/icons-vue';

export default {
  components: { SyncOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined, Drawer, Group, RadioButton },
  setup () {
    let loading = ref(false)
    const DrawerVal = ref({
      visible: false,
      direction: 'right',
      title: '主题设置',
      value: 'light'
    })
    
    const store = useStore()
    let pathName = computed(() => store.state.router.path)
    /* 颜色设置 */
    const ThemeColor = computed(() => store.getters.ThemeColor)
    const ThemeOptions = computed(() => store.getters.ThemeOptions)
    const BackgroundColor = computed(() => ThemeOptions.value.find(t => t.value === ThemeColor.value).colors.split('|')[2])

    /* 目录展开/收缩 */
    const PhoneMenuToggle = computed(() => store.getters.PhoneMenuToggle)
    const MenuToggleClick = () => {
      store.dispatch('setting/SetMenuToggle')
    }

    // 刷新
    const reflashPage = () => {
      window.location.reload()
    }

    // 设置主题 - 弹窗关闭监听
    const drawerClose = () => {
      DrawerVal.value.viisble = false
    }

    // 设置背景颜色 - 打开弹窗
    const SettingBackground = () => {
      DrawerVal.value.value = ThemeColor.value
      DrawerVal.value.visible = true
    }

    // 设置背景颜色 - 切换模式
    const ChangeThemeColor = (val) => {
      console.log(val.target.value, 'val.target.value')
      store.dispatch('setting/SetColorValue', val.target.value)
    }

    return {
      pathName,
      loading,
      DrawerVal,
      ThemeColor,
      BackgroundColor,
      PhoneMenuToggle,
      reflashPage,
      drawerClose,
      SettingBackground,
      ChangeThemeColor,
      MenuToggleClick
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
@media screen and (max-width: 500px) {
  .right-content-header .menu-toggle {
    display: block;
  }
}
</style>