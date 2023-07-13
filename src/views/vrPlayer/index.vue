<template>
  <div class="vr-player-container">
    <input class="input-files" type="file" @change="(file) => InputChange(file)" />
    <video
      v-if="Camera.videoSrc !== ''"
      :ref="VideoRef"
      id="video-vr"
      class="video-js vjs-default-skin"
      crossorigin="anonymous"
      controls
      playsinline
    >
      <source
        :src="Camera.videoSrc"
        id="videoVr-${contId}"
        type="video/mp4"
      />
    </video>
  </div>
</template>

<script>
export default {
  name: 'VrPlayerDom'
}
</script>

<script setup>
import { ref, onMounted } from 'vue';

/* 视频对象 */
const Camera = ref({
  videoSrc: '' // /video/lib/vid.mp4
});

const InputFile = ref('');
const VideoRef = ref(null);

const InputChange = (event) => {
  Camera.videoSrc = ''
  const timer = setTimeout(() => {
    Camera.value.videoSrc = getObjectURL(event.target.files[0]);
    clearTimeout(timer);
  }, 100);
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
  .input-files {
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: white;
  }

  .video-js {
    width: 100%;
    height: calc(100% - 30px);
    position: absolute;
    top: 30px;
  }

  .easy-player-box {
    width: 100%;
    height: 100%;
  }
}
</style>