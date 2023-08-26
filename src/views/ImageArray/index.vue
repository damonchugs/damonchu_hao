<template>
  <div class="image-array-container">
    <div class="select">
      <div class="select-btn">
        <AButton type="primary">选择</AButton>
        <input type="file" @change="selectMkdir" multiple directory webkitdirectory />
      </div>
      <div v-show="Pages.max > 0" class="page">
        <APagination v-model:current="Pages.current" simple :total="Pages.max" @change="PageChange" />
      </div>
    </div>

    <div class="images image-array-con-image" @scroll="ImagesScroll">
      <img
        v-for="(t, index) in Images" :key="`${index}-${Date.now()}`"
        :src="t"
        :data-index="index"
        style="width: 100vw;"
        />
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

import { ref } from 'vue';

const Images = ref([]);

const Pages = ref({
  max: 0,
  min: 1,
  current: 1,
  change: false,
})

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
  Images.value = images;
  // 页码设置
  Pages.value.max = images.length * 10;
  Pages.value.current = 1;
};

/* 页面切换 */
const PageChange = (val) => {
  // 设置为页面切换
  Pages.value.change = true;

  // 按照图片offsetTop 设置父级的滚动高度
  const ImageDom = document.querySelector('.image-array-con-image');
  ImageDom.scrollTop = ImageDom.children[val - 1].offsetTop;

  // 页面切换恢复
  setTimeout(() => {
    Pages.value.change = false;
  }, 50);
}

/* 下拉监听 */
const ImagesScroll = (event) => {
  // 若是切换页码下拉，则不需要计算
  if (Pages.value.change) return false;

  // 通过 每级的图片的高度计算 及 父级滚动高度，计算当前显示的图片序号
  const ImageDom = document.querySelector('.image-array-con-image');
  let top = 0;
  let index = 0;
  for (let i = 0; i < event.target.children.length; i++) {
    if (ImageDom.scrollTop >= top) {
      top += event.target.children[i].height;
    } else {
      index = i;
      break;
    }
  }

  // 序号赋值到分页器
  Pages.value.current = index === 0 ? Pages.value.max : index;
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
      margin-top: 3px;
    }
  }

  .images {
    width: 100vw;
    height: calc(100vh - #{($SelectHeight)});
    position: fixed;
    top: $SelectHeight + 1px;
    left: 0;
    overflow-y: auto;
    overflow-x: hidden;

    .el-image {
      width: 100%;
    }
  }
}
</style>