<template>
  <div class="vr-player-container">
    <div class="input-box">
      <input class="InputText" v-model="InputFile" type="text" />
      <div class="input-button">
        <div class="FileButton">
          <input ref="InputFileRef" class="input-files" type="file" @change="(file) => InputChange(file)" />
          <Button type="primary" @click="BaseFileSelect">本地</Button>
        </div>
        <Button type="primary" @click="FileSelect">确定</Button>
      </div>
    </div>
    <div class="video-camera">
      <Spin v-if="SpinLoading" />
      <video
        v-if="Camera.videoSrc !== ''"
        :ref="VideoRef"
        id="video-vr"
        class="video-js vjs-default-skin"
        crossorigin="anonymous"
        controls
        playsinline
        :src="Camera.videoSrc"
      >
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VrPlayerDom'
}
</script>

<script setup>
import { ref, onMounted } from 'vue';
import { Button, Spin } from 'ant-design-vue';


/* 视频对象 */
const Camera = ref({
  videoSrc: '' // /video/lib/vid.mp4
});

const InputFile = ref('');
const VideoRef = ref(null);
const InputFileRef = ref(null);
const SpinLoading = ref(false);

// InputFileRef

const BaseFileSelect = () => {
  const a = document.createEvent("MouseEvents");
  a.initEvent("click", true, true);  
  InputFileRef.value.dispatchEvent(a);
}

/* 监听本地文件选择 */
const InputChange = (event) => {
  InputFile.value = getObjectURL(event.target.files[0]);
}

/* 点击确定视频播放 */
const FileSelect = () => {
  SpinLoading.value = true;
  Camera.videoSrc = '';
  // console.log(InputFile.value, 'InputFile.value', Camera.videoSrc);
  const timer = setTimeout(() => {
    Camera.value.videoSrc = InputFile.value;
    SpinLoading.value = false;
    clearTimeout(timer);
  }, 1000);
}

function getObjectURL(file)
{
    var url = null;
    if (window.createObjectURL != undefined)
    { // basic
         url = window.createObjectURL(file);
     } else if (window.URL != undefined)
     {
         // mozilla(firefox)
         url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
         // webkit or chrome
         url = window.webkitURL.createObjectURL(file);
    }
    return url;
}
</script>

<style lang="scss" scoped>
.vr-player-container {
  width: calc(100vw - 40px);
  height: calc(100vh - 50px);
  background-color: $backgroundColor-4;
  position: relative;
  .input-box {
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: white;
    display: flex;

    .InputText {
      width: calc(100vw - 40px - 128px);
    }

    .input-button {
      display: flex;
      justify-content: space-between;
    }

    .FileButton {
      display: flex;
      position: relative;
      .input-files {
        width: 64px;
        height: 32px;
        visibility: hidden;
        position: relative;
        z-index: 1;
      }

      button {
        position: absolute;
        left: 0px;
        z-index: 2;
      }
    }
  }

  .video-camera {
    width: 100%;
    height: calc(100% - 33px);
    position: absolute;
    top: 33px;
    display: flex;
    justify-content: center;
    align-items: center;

    video {
      width: 100%;
      height: 100%;
    }
  }

  .easy-player-box {
    width: 100%;
    height: 100%;
  }
}
</style>