<template>
  <div class="Image-loader" :id="`image-loader-${index}`" :style="styleObject" ref="containerRef">
    <img
      ref="imgRef"
      :data-index="index" />
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  src: String,
  index: Number,
  direction: String,
});

// 根据图片src获取图片信息宽高，设置Image-loader样式。当图片出现在视口时，才加载图片。
const containerRef = ref(null);
const imgRef = ref(null);
const inView = ref(false);
const loaded = ref(false);
const styleObject = ref({});
let observer = null;

function applySize(w, h) {
  if (!w || !h) return;
  // 使用占位容器保持比例： 百分比
  const ratio = (h / w) * 100;
  styleObject.value = {
    width: props.direction === 'row' ? `auto` : '100vw',
    height: props.direction === 'row' ? 'calc(100vh - 41px)' : `${ratio}%`,
    paddingLeft: props.direction === 'row' ? `calc((100vh - 41px) * ${w/h})` : '0',
    overflow: 'hidden',
  };
}

function loadImage() {
  if (!props.src) return;
  const img = new Image();
  img.src = props.src;
  img.onload = () => {
    applySize(img.naturalWidth, img.naturalHeight);
    loaded.value = true;
    // set actual img src in template by assigning to imgRef when available
    if (imgRef.value) imgRef.value.src = props.src;
  };
}

onMounted(() => {
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const containerRef = entry.target;
        if (entry.isIntersecting) {
          inView.value = true;
          loadImage();
          if (observer && containerRef.value) observer.unobserve(containerRef.value);
        } else {
          if (imgRef.value) {
            imgRef.value.src = '';
            imgRef.value.removeAttribute('src');
          }
        }
      });
    }, { threshold: 0.1 });
    if (containerRef.value) observer.observe(containerRef.value);
  } else {
    // fallback: load immediately
    inView.value = true;
    loadImage();
  }
});

onBeforeUnmount(() => {
  if (observer && containerRef.value) observer.unobserve(containerRef.value);
});

watch(() => props.src, (n) => {
  // reset when src changes
  loaded.value = false;
  styleObject.value = {};
  if (inView.value) loadImage();
});

</script>

<style lang="scss" scoped>
.Image-loader {
  display: flex;
  position: relative;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: opacity 0.3s ease-in-out;
  }
}
</style>