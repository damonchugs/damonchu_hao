<template>
  <div class="image-array-container" id="image-array-container">
    <div class="select">
      <div class="select-btn">
        <AButton type="primary">选择</AButton>
        <input type="file" @change="selectMkdir" multiple directory webkitdirectory />
      </div>
      <div v-show="Pages.max > 0" class="page">
        <Select class="page-select" :defaultValue="1" @change="ImageSelectChange">
          <Option v-for="t in Pages.selectSize" :key="`ImageSelectChange_${t}`" :value="t">{{ t }}</Option>
        </Select>
        <APagination
          v-model:current="Pages.current"
          :total="Pages.max"
          showQuickJumper
          :defaultPageSize="1"
          @change="PageChange" />
      </div>
      <div v-show="Pages.max > 0" class="pick-btn">
        <div class="radio-style">
          <AButton v-if="ImageStyle.direction === 'col'" :type="ImageStyle.direction === 'col' ? 'primary' : 'default'" @click="ImageStyleDirectionFoo('row')">切换横版</AButton>
          <AButton v-else :type="ImageStyle.direction === 'row' ? 'primary' : 'default'" @click="ImageStyleDirectionFoo('col')">切换竖版</AButton>
        
          <AButton v-if="Pages.sort === 1 && ImageStyle.direction === 'row'" @click="SetOrder(2)">切换倒序</AButton>
          <AButton v-if="Pages.sort === 2 && ImageStyle.direction === 'row'" @click="SetOrder(1)">切换顺序</AButton>
        </div>
      </div>
      <div class="fullscreen-btn">
        <AButton v-if="IsFullScreen" @click="FullScreenToggle">
          <FullscreenExitOutlined />
        </AButton>
        <AButton v-else @click="FullScreenToggle">
          <FullscreenOutlined />
        </AButton>
      </div>
    </div>

    <div
      :class="`images image-array-con-image ${ImageStyle.direction === 'row' ? 'x-image' : 'y-image'}`"
      @scroll="ImagesScroll">
      <div v-for="(t, index) in Images" :key="`${index}-${Date.now()}`" class="image-div">
        <img
          :src="t"
          :data-index="index" />
        <p class="image-number">{{ index + 1 }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageArray'
}
</script>

<script setup>
// 引用组件
import AButton from "ant-design-vue/lib/button";
import "ant-design-vue/lib/button/style/css";
import APagination from "ant-design-vue/lib/pagination";
import "ant-design-vue/lib/pagination/style/css";
// import ARadio from 'ant-design-vue/lib/radio';
import "ant-design-vue/lib/radio/style/css";

import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue';

import { ref, nextTick } from 'vue';

import { FullScreen } from '@/utils';

const Images = ref([]);
const OriginImageArray = ref([]);

const IsFullScreen = ref(document.fullscreenElement);

const Pages = ref({
  max: 0,
  min: 1,
  current: 1,
  pageSize: 100,
  defaultPageSize: 100,
  pageSizeOptions: ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  change: false,
  select: 1,
  selectSize: [1],
  sort: 2, // 1 顺序 2 倒序
});

const ImageStyle = ref({
  direction: 'col'
})

/* 图片页面选择，val * 100 */
const ImageSelectChange = (obj) => {
  const val = obj.target.value;
  Pages.value.select = val;

  Images.value = OriginImageArray.value.filter((t, index) => index >= (val - 1) * 100 && index < val * 100);
}

/* 选择文件夹 */
const selectMkdir = (event) => {
  // 获取文件夹下文件信息
  const files = event.target.files;
  const FilesArray = [...files];
  const images = [];

  // 按照文件名排序
  FilesArray.sort((a, b) => b.name > a.name ? -1 : 1);

  for (let i = 0; i < FilesArray.length; i++) {
    const file = FilesArray[i];
    // 只提取图片文件
    if (file.type.startsWith('image/')) {
      const imageURL = URL.createObjectURL(file);
      images.push(imageURL);
    }
  }

  // 图片展示
  OriginImageArray.value = images;
  Images.value = images.filter((t, index) => index < 100);

  // 页码设置
  Pages.value.max = images.filter((t, index) => index < 100).length;
  Pages.value.current = 1;
  Pages.value.select = 1;

  const numbers = [];
  for (let i = 1; i <= images.length / 100 + 1; i++) {
    numbers.push(i)
  }
  Pages.value.selectSize = numbers;
};

/* 页面切换 */
const PageChange = (val) => {
  // 设置为页面切换
  Pages.value.change = true;

  // 按照图片offsetTop 设置父级的滚动高度
  const ImageDom = document.querySelector('.image-array-con-image');

  if (ImageStyle.value.direction === 'col') { // 竖屏
    ImageDom.scrollTop = ImageDom.children[val - 1].offsetTop;
  } else { // 横屏
    ImageDom.scrollLeft = ImageDom.children[Pages.value.max - val].offsetLeft;
  }

  // 页面切换恢复
  nextTick(() => {
    Pages.value.change = false;
  });
}

/* 页大小修改回调 */
// const PageSizeChange = (val) => {
  
// }

/* 下拉监听 */
const ImagesScroll = (event) => {
  // 若是切换页码下拉，则不需要计算
  if (Pages.value.change) return false;

  // 通过 每级的图片的高度计算 及 父级滚动高度，计算当前显示的图片序号
  const ImageDom = document.querySelector('.image-array-con-image');
  let length = 0;
  let index = 0;
  for (let i = 0; i < event.target.children.length; i++) {
    const scrollNumber = ImageStyle.value.direction === 'row' ? ImageDom.scrollLeft : ImageDom.scrollTop;
    if (scrollNumber >= length) {
      length += event.target.children[i][ImageStyle.value.direction === 'row' ? 'clientWidth' : 'clientHeight'];
    } else {
      index = i;
      break;
    }
  }

  // 序号赋值到分页器
  if (ImageStyle.value.direction === 'col') { // 竖屏
    Pages.value.current = index === 0 ? Pages.value.max : index;
  } else { // 横屏
    Pages.value.current = index === 0
      ? 1
      : (Pages.value.sort === 2 ? Pages.value.max - index : index);
  }
}

/**
 * 根据给定值调整图片样式的方向，并执行相应的滚动动画。
 * @param {string} val - 图片排列方向，可为 'row'（行）或其他值。
 */
const ImageStyleDirectionFoo = (val) => {
  // 设置图片排列方向
  ImageStyle.value.direction = val;
  const ImageDom = document.querySelector('.image-array-con-image');
  if (val === 'row') {
    // 如果方向为行，反转图片数组并应用
    Images.value = [...Images.value];
    Images.value.reverse();
    // 使用 setTimeout 延迟执行滚动到最右边的动画
    setTimeout(() => {
      // 获取最后一个图片元素的位置和宽度
      const { offsetLeft, clientWidth } = ImageDom.children[ImageDom.children.length - 1];
      // 设置滚动条位置到最右边
      ImageDom.scrollLeft = offsetLeft + clientWidth;
    }, 10) // 延迟 10ms 执行，以便确保 DOM 更新完毕
  } else {
    // 如果方向不是行，重置图片数组并滚动到顶部
    Images.value = [...Images.value];
    // 直接设置滚动条到顶部
    ImageDom.scrollTop = 0;
  }
}

/* 打开/关闭 全屏显示 */
const FullScreenToggle = () => {
  if (document.fullscreenElement) {
    FullScreen.close();
    IsFullScreen.value = !IsFullScreen.value;
  } else {
    FullScreen.open(document.querySelector('#image-array-container'));
    IsFullScreen.value = !IsFullScreen.value;
  }
}

/**
 * 设置顺序显示
 */
const SetOrder = (type) => {
  Pages.value.sort = type;

  // 获取图片数组 - 按顺序处理
  const images = [...Images.value];

  images.reverse();

  // 设置图片数组
  Images.value = images;
  nextTick(() => {
    PageChange(type === 1 ? Pages.value.max : 1);
  })
}

</script>

<style lang="scss" scoped>
$SelectHeight: 40px;
.image-array-container {
  width: 100vw;
  height: 100vh;
  position: relative;

  .select {
    width: 100vw;
    height: $SelectHeight;
    padding: 5px 0;
    border-bottom: 1px solid var(--theme-background-1);
    background-color: var(--theme-background-2);
    color: var(--theme-background-1);
    display: flex;
    justify-content: center;

    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1111;

    .select-btn {
      width: 100px;
      height: 30px;
      overflow: hidden;
      position: relative;
      
      &>input {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
      }
      .ant-btn {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }

    .page {
      margin-left: 10px;
      margin-top: 0px;
      position: relative;
      z-index: 999;
      display: flex;

      .page-select {
        margin-right: 5px;
        // padding-top: 3px;
      }
    }

    .pick-btn, .fullscreen-btn {
      margin-left: 10px;
      &.fullscreen-btn>button {
        background-color: transparent;
      }
    }
  }

  .images {
    width: 100vw;
    height: calc(100vh - #{($SelectHeight)});
    position: fixed;
    top: $SelectHeight + 1px;
    left: 0;
    .image-div {
      position: relative;
      .image-number {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 12px;
        opacity: .5;
        color: white;
        background-color: rgba(0,0,0,.4);
        padding: 0px 3px;
        border-radius: 3px;
        user-select: none;
      }
    }
    &.x-image {
      overflow-x: auto;
      overflow-y: hidden;

      display: flex;
      img {
        width: auto;
        height: 100%;
      }
    }
    &.y-image {
      overflow-y: auto;
      overflow-x: hidden;

      display: block;
      img {
        width: 100vw;
        height: auto;
      }
    }
  }
}
</style>
