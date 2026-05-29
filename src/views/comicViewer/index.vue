<template>
  <div class="comic-viewer" ref="rootRef">
    <Space class="controls" align="center">
      <Switch v-model:checked="isVertical" checked-children="竖" un-checked-children="横" />
      <Button @click="toggleOrder">顺序: {{ order === 'asc' ? '顺' : '倒' }}</Button>
      <Button @click="prevAction">上一页</Button>
      <Button @click="nextAction">下一页</Button>
      <Button @click="toggleFullScreen">全屏</Button>
      <Button @click="zoomOut">-</Button>
      <span class="scale">{{ Math.round(scale * 100) }}%</span>
      <Button @click="zoomIn">+</Button>
      <input ref="dirInput" style="display:none" type="file" webkitdirectory directory multiple @change="onDirSelect" accept="image/*" />
      <Button @click="triggerDirSelect">选择文件夹</Button>
      <Button v-if="localCount>0" @click="clearLocal">清除本地({{ localCount }})</Button>
      <a-switch v-if="!isVertical" v-model:checked="tileHorizontal" checked-children="平铺" un-checked-children="分页" />
    </Space>

    <div ref="viewer" class="viewer" @scroll.passive="onScroll">
      <!-- 横版：分页展示，左右翻页 -->
      <div v-if="!isVertical" class="pages-wrap">
        <div v-if="tileHorizontal" class="tile-wrap">
          <div class="tile" v-for="(img, idx) in visibleImages" :key="img + idx">
            <img :src="img" :style="imgStyle" draggable="false" @load="onImgLoad(img)" />
          </div>
        </div>
        <div v-else class="pages" :style="pagesStyle" @wheel.prevent="onWheelHorizontal">
          <div v-for="(page, pIndex) in pages" :key="pIndex" class="page">
            <div v-for="img in page" :key="img" class="img-box">
              <img :src="img" :style="imgStyle" draggable="false" @load="onImgLoad(img)" />
            </div>
          </div>
        </div>
      </div>

      <!-- 竖版：连续滚动，滚动到底加载下一页 -->
      <div v-else class="continuous">
        <div v-for="img in loadedImages" :key="img" class="img-box-vertical">
          <img :src="img" :style="imgStyle" draggable="false" @load="onImgLoad(img)" />
        </div>
        <div class="loading" v-if="loading">加载中...</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { Space, Switch, Button, message } from 'ant-design-vue'

// 内置占位图片（当没有本地选择时使用）
const defaultImgs = []
for (let i = 1; i <= 40; i++) defaultImgs.push(`https://picsum.photos/seed/${i}/800/1200`)

const rootRef = ref(null)
const viewer = ref(null)

const isVertical = ref(true)
const order = ref('asc')
const scale = ref(1)

// 本地选择的图片（object URLs）
const localImages = ref([])
const dirInput = ref(null)
const tileHorizontal = ref(false)

const pageSize = 4
const currentPage = ref(1)
const loading = ref(false)
const loadedPages = ref(1)
const pageIndex = ref(1)
const pageCount = 3

const sourceImages = computed(() => (localImages.value.length ? localImages.value.slice() : defaultImgs.slice()))
const ordered = computed(() => (order.value === 'asc' ? sourceImages.value.slice() : sourceImages.value.slice().reverse()))

const pages = computed(() => {
  const arr = []
  for (let i = 0; i < ordered.value.length; i += pageSize) arr.push(ordered.value.slice(i, i + pageSize))
  return arr
})

const visibleImages = computed(() => {
  // 用于平铺模式：显示已加载或全部（如果本地则显示全部本地）
  if (tileHorizontal.value) return ordered.value.slice(0, Math.max(ordered.value.length, pageIndex.value * pageCount))
  // 默认显示已加载（竖版或分页的前几张）
  return ordered.value.slice(0, pageIndex.value * pageCount)
})

const loadedImages = ref(ordered.value.slice(0, pageCount * loadedPages.value))

const imgStyle = computed(() => ({ transform: `scale(${scale.value})`, transition: 'transform .15s' }))
const pagesStyle = computed(() => ({ transform: `translateX(-${(currentPage.value - 1) * 100}%)`, transition: 'transform .3s' }))

function preload(url) { const i = new Image(); i.src = url }

function onImgLoad(url) {
  const idx = sourceImages.value.indexOf(url)
  if (idx >= 0) sourceImages.value.slice(idx + 1, idx + 4).forEach(preload)
}

function loadNextPage() {
  if (loading.value) return
  const max = Math.ceil(sourceImages.value.length / pageCount)
  if (pageIndex.value >= max) return
  loading.value = true
  setTimeout(() => {
    pageIndex.value++
    loadedImages.value = ordered.value.slice(0, pageIndex.value * pageCount)
    ordered.value.slice((pageIndex.value - 1) * pageCount, pageIndex.value * pageCount).forEach(preload)
    loading.value = false
  }, 200)
}

function onScroll(e) {
  if (!isVertical.value) return
  const el = e.target
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 150) loadNextPage()
}

function onWheelHorizontal(e) { if (e.deltaY > 0) nextAction(); else prevAction() }

function toggleOrder() { order.value = order.value === 'asc' ? 'desc' : 'asc'; resetPaging() }
function resetPaging() { currentPage.value = 1; loadedPages.value = 1; pageIndex.value = 1; loadedImages.value = ordered.value.slice(0, pageCount) }

function prevAction() {
  if (isVertical.value) viewer.value?.scrollBy({ top: -window.innerHeight, behavior: 'smooth' })
  else currentPage.value = Math.max(1, currentPage.value - 1)
}
function nextAction() {
  if (isVertical.value) loadNextPage()
  else currentPage.value = Math.min(pages.value.length, currentPage.value + 1)
}

function zoomIn() { scale.value = Math.min(3, +(scale.value + 0.1).toFixed(2)) }
function zoomOut() { scale.value = Math.max(0.4, +(scale.value - 0.1).toFixed(2)) }

function toggleFullScreen() {
  const el = rootRef.value
  if (!el) return
  if (!document.fullscreenElement) el.requestFullscreen?.(); else document.exitFullscreen?.()
}

function onKey(e) {
  if (e.key === 'ArrowRight') nextAction()
  if (e.key === 'ArrowLeft') prevAction()
  if (e.key === '+') zoomIn()
  if (e.key === '-') zoomOut()
}

function triggerDirSelect() { dirInput.value && dirInput.value.click() }

function onDirSelect(e) {
  const files = Array.from(e.target.files || [])
  const imgsFiles = files.filter(f => f.type.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp)$/i.test(f.name))
  if (!imgsFiles.length) return message.warning('所选文件夹中没有图片')
  // 按文件名排序
  imgsFiles.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
  // 清理已有本地 URLs
  clearLocal(true)
  imgsFiles.forEach(f => localImages.value.push(URL.createObjectURL(f)))
  // 更新来源与预加载
  resetPaging()
  ordered.value.slice(0, pageCount * 2).forEach(preload)
}

function clearLocal(skipRevoke = false) {
  if (!skipRevoke) {
    localImages.value.forEach(u => URL.revokeObjectURL(u))
  } else {
    // revoke existing then leave new ones
    localImages.value.forEach(u => URL.revokeObjectURL(u))
  }
  localImages.value = []
  resetPaging()
}

function totalPagesCount() { return pages.value.length }

onMounted(() => {
  window.addEventListener('keydown', onKey)
  // 预加载首屏
  ordered.value.slice(0, pageCount * 2).forEach(preload)
  loadedImages.value = ordered.value.slice(0, pageCount * loadedPages.value)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  // 释放本地 URL
  localImages.value.forEach(u => URL.revokeObjectURL(u))
})

watch(order, () => resetPaging())

const localCount = computed(() => localImages.value.length)
</script>

<style scoped lang="scss">
.comic-viewer{display:flex;flex-direction:column;height:100%}
.controls{padding:8px 12px}
.viewer{flex:1;overflow:auto;padding:12px;background:#0b0b0b}
.pages-wrap{width:100%;height:100%;overflow:hidden}
.pages{display:flex;width:100%;height:100%}
.page{min-width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;padding:12px}
.img-box img{max-width:90%;height:auto;display:block}
.continuous{display:flex;flex-direction:column;align-items:center;gap:12px}
.img-box-vertical img{max-width:60%;height:auto}
.loading{color:#fff;padding:12px}
.scale{color:#333;padding:0 6px}
</style>
