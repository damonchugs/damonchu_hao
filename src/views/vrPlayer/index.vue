<template>
  <div
    ref="PlayerRootRef"
    class="vr-player-container"
    :class="{ 'is-web-fullscreen': IsWebFullscreen, 'controls-hidden': AreControlsHidden }"
    @mousemove="RevealControls"
    @touchstart="RevealControls"
    @keydown.esc="IsWebFullscreen = false"
  >
    <div class="source-bar">
      <input
        v-model="InputUrl"
        class="source-input"
        type="text"
        :placeholder="SourceName || '粘贴视频网络地址'"
        aria-label="视频网络地址"
        @keydown.enter="PlayUrl"
      />
      <input
        ref="InputFileRef"
        class="input-files"
        type="file"
        accept="video/*"
        @change="InputChange"
      />
      <Button @click="BaseFileSelect">选择本地文件</Button>
      <Button type="primary" @click="PlayUrl">播放地址</Button>
    </div>

    <div ref="PlayerStageRef" class="player-stage" @dblclick="ToggleWindowFullscreen">
      <video
        ref="VideoRef"
        class="video-element"
        playsinline
        preload="metadata"
        :src="Camera.videoSrc || undefined"
        @loadedmetadata="SyncVideoState"
        @timeupdate="SyncVideoState"
        @durationchange="SyncVideoState"
        @play="HandlePlay"
        @pause="HandlePause"
        @waiting="SpinLoading = true"
        @canplay="SpinLoading = false"
        @error="HandleVideoError"
      ></video>

      <div v-if="!Camera.videoSrc" class="empty-state">
        <span class="empty-state-title">准备播放</span>
        <span>选择本地视频，或输入视频网络地址</span>
      </div>
      <div v-if="SpinLoading" class="loading-state">正在加载视频...</div>
      <div v-if="ErrorMessage" class="error-state">{{ ErrorMessage }}</div>
      <div v-if="VolumeHint" class="volume-hint">{{ VolumeHint }}</div>
      <div v-if="Camera.videoSrc && !IsPlaying" class="stage-play" @click="TogglePlayback">
        <PlayCircleOutlined />
      </div>
    </div>

    <div class="control-bar">
      <div class="timeline-row">
        <span class="time-label">{{ FormatTime(CurrentTime) }}</span>
        <input
          class="timeline"
          type="range"
          min="0"
          :max="Duration || 0"
          step="0.1"
          :value="CurrentTime"
          :disabled="!Camera.videoSrc || !Duration"
          aria-label="播放进度"
          @input="SeekTo"
        />
        <span class="time-label">{{ FormatTime(Duration) }}</span>
      </div>

      <div class="controls-row">
        <button class="control-button" type="button" :disabled="!Camera.videoSrc" :aria-label="IsPlaying ? '暂停' : '播放'" :title="IsPlaying ? '暂停 (空格)' : '播放 (空格)'" @click="TogglePlayback">
          <PauseCircleOutlined v-if="IsPlaying" />
          <PlayCircleOutlined v-else />
        </button>
        <button class="control-button" type="button" :disabled="!Camera.videoSrc" aria-label="后退 10 秒" title="后退 10 秒 (←)" @click="Skip(-10)">
          <BackwardOutlined />
        </button>
        <button class="control-button" type="button" :disabled="!Camera.videoSrc" aria-label="快进 10 秒" title="快进 10 秒 (→)" @click="Skip(10)">
          <ForwardOutlined />
        </button>
        <span class="volume-icon" title="音量 (↑ / ↓)"><SoundOutlined /></span>
        <input
          class="volume-slider"
          type="range"
          min="0"
          max="1"
          step="0.1"
          :value="Volume"
          aria-label="音量"
          @input="SetVolume"
        />
        <select v-model.number="PlaybackRate" class="speed-select" aria-label="播放速度" @change="SetPlaybackRate">
          <option v-for="rate in PlaybackRates" :key="rate" :value="rate">{{ rate }}x</option>
        </select>
        <span class="control-spacer"></span>
        <button class="text-control" type="button" :disabled="!Camera.videoSrc" @click="ToggleWebFullscreen">
          {{ IsWebFullscreen ? '退出网页全屏' : '网页全屏' }}
        </button>
        <button class="control-button" type="button" :disabled="!Camera.videoSrc" :aria-label="IsWindowFullscreen ? '退出窗口全屏' : '窗口全屏'" :title="IsWindowFullscreen ? '退出窗口全屏' : '窗口全屏'" @click="ToggleWindowFullscreen">
          <FullscreenOutlined />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VrPlayerDom'
}
</script>

<script setup>
import { onBeforeUnmount, onMounted, ref, nextTick } from 'vue';
import { Button } from 'ant-design-vue';
import {
  BackwardOutlined,
  ForwardOutlined,
  FullscreenOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  SoundOutlined
} from '@ant-design/icons-vue';

/* 视频对象 */
const Camera = ref({
  videoSrc: ''
});

const InputUrl = ref('');
const VideoRef = ref(null);
const InputFileRef = ref(null);
const PlayerRootRef = ref(null);
const PlayerStageRef = ref(null);
const SpinLoading = ref(false);
const IsPlaying = ref(false);
const AreControlsHidden = ref(false);
const IsWebFullscreen = ref(false);
const IsWindowFullscreen = ref(false);
const CurrentTime = ref(0);
const Duration = ref(0);
const Volume = ref(1);
const PlaybackRate = ref(1);
const PlaybackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];
const SourceName = ref('');
const ErrorMessage = ref('');
const VolumeHint = ref('');
const CurrentObjectUrl = ref('');
let HideControlsTimer = null;
let VolumeHintTimer = null;

const BaseFileSelect = () => {
  InputFileRef.value.click();
};

const InputChange = (event) => {
  const file = event.target.files && event.target.files[0];
  event.target.value = '';
  if (!file) return;

  const objectUrl = URL.createObjectURL(file);
  LoadSource(objectUrl, file.name, objectUrl);
};

const PlayUrl = () => {
  const url = InputUrl.value.trim();
  if (!url) {
    ErrorMessage.value = '请输入视频网络地址';
    return;
  }
  LoadSource(url, url);
};

const LoadSource = async (source, name, objectUrl) => {
  const video = VideoRef.value;
  if (video) {
    video.pause();
    video.removeAttribute('src');
    video.load();
  }
  if (CurrentObjectUrl.value) {
    URL.revokeObjectURL(CurrentObjectUrl.value);
  }
  CurrentObjectUrl.value = objectUrl || '';
  if (objectUrl) InputUrl.value = '';
  Camera.value.videoSrc = '';
  SpinLoading.value = true;
  IsPlaying.value = false;
  CurrentTime.value = 0;
  Duration.value = 0;
  ErrorMessage.value = '';
  SourceName.value = name;
  Camera.value.videoSrc = source;

  await nextTick();
  if (!VideoRef.value) return;
  VideoRef.value.load();
  VideoRef.value.play().catch(() => {
    SpinLoading.value = false;
  });
};

const TogglePlayback = () => {
  if (!VideoRef.value || !Camera.value.videoSrc) return;
  if (VideoRef.value.paused) {
    VideoRef.value.play().catch(() => {});
  } else {
    VideoRef.value.pause();
  }
};

const ShowControls = () => {
  AreControlsHidden.value = false;
  if (HideControlsTimer) {
    clearTimeout(HideControlsTimer);
    HideControlsTimer = null;
  }
};

const ScheduleHideControls = () => {
  if (HideControlsTimer) clearTimeout(HideControlsTimer);
  HideControlsTimer = setTimeout(() => {
    if (IsPlaying.value) AreControlsHidden.value = true;
  }, 2500);
};

const RevealControls = () => {
  ShowControls();
  if (IsPlaying.value) ScheduleHideControls();
};

const HandlePlay = () => {
  IsPlaying.value = true;
  ScheduleHideControls();
};

const HandlePause = () => {
  IsPlaying.value = false;
  ShowControls();
};

const Skip = (seconds) => {
  if (VideoRef.value) {
    VideoRef.value.currentTime = Math.max(0, Math.min(Duration.value || Infinity, VideoRef.value.currentTime + seconds));
  }
};

const SeekTo = (event) => {
  if (VideoRef.value) VideoRef.value.currentTime = Number(event.target.value);
};

const SetVolume = (event) => {
  Volume.value = Math.round(Number(event.target.value) * 10) / 10;
  if (VideoRef.value) VideoRef.value.volume = Volume.value;
  ShowVolumeHint();
};

const ShowVolumeHint = () => {
  VolumeHint.value = `音量 ${Math.round(Volume.value * 100)}%`;
  if (VolumeHintTimer) clearTimeout(VolumeHintTimer);
  VolumeHintTimer = setTimeout(() => {
    VolumeHint.value = '';
    VolumeHintTimer = null;
  }, 1000);
};

const SetPlaybackRate = () => {
  if (VideoRef.value) VideoRef.value.playbackRate = PlaybackRate.value;
};

const SyncVideoState = () => {
  if (!VideoRef.value) return;
  CurrentTime.value = VideoRef.value.currentTime || 0;
  Duration.value = Number.isFinite(VideoRef.value.duration) ? VideoRef.value.duration : 0;
};

const FormatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const totalSeconds = Math.floor(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;
  const pad = (value) => String(value).padStart(2, '0');
  return hours ? `${hours}:${pad(minutes)}:${pad(remainingSeconds)}` : `${pad(minutes)}:${pad(remainingSeconds)}`;
};

const ToggleWebFullscreen = () => {
  IsWebFullscreen.value = !IsWebFullscreen.value;
};

const ToggleWindowFullscreen = async () => {
  const player = PlayerRootRef.value;
  if (!player) return;
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else if (player.requestFullscreen) {
      await player.requestFullscreen();
    }
  } catch (error) {
    ErrorMessage.value = '当前浏览器无法进入全屏模式';
  }
};

const SyncFullscreenState = () => {
  IsWindowFullscreen.value = document.fullscreenElement === PlayerRootRef.value;
};

const HandleVideoError = () => {
  SpinLoading.value = false;
  ErrorMessage.value = '视频无法播放，请检查地址或文件格式';
};

const HandleKeyboard = (event) => {
  const target = event.target;
  if (target && /INPUT|SELECT|TEXTAREA/.test(target.tagName)) return;
  if (!Camera.value.videoSrc) return;

  if (event.code === 'Space') {
    event.preventDefault();
    TogglePlayback();
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    Skip(-10);
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    Skip(10);
  } else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault();
    const volumeLevel = Math.round(Volume.value * 10);
    const nextLevel = Math.max(0, Math.min(10, volumeLevel + (event.key === 'ArrowUp' ? 1 : -1)));
    Volume.value = nextLevel / 10;
    if (VideoRef.value) VideoRef.value.volume = Volume.value;
    ShowVolumeHint();
  }
};

onMounted(() => {
  window.addEventListener('keydown', HandleKeyboard);
  document.addEventListener('fullscreenchange', SyncFullscreenState);
});

onBeforeUnmount(() => {
  if (HideControlsTimer) clearTimeout(HideControlsTimer);
  if (VolumeHintTimer) clearTimeout(VolumeHintTimer);
  window.removeEventListener('keydown', HandleKeyboard);
  document.removeEventListener('fullscreenchange', SyncFullscreenState);
  if (VideoRef.value) {
    VideoRef.value.pause();
    VideoRef.value.removeAttribute('src');
    VideoRef.value.load();
  }
  if (CurrentObjectUrl.value) URL.revokeObjectURL(CurrentObjectUrl.value);
});
</script>

<style lang="scss" scoped>
.vr-player-container {
  --player-bg: #101417;
  --player-panel: #1b2226;
  --player-text: #f1f3f2;
  --player-muted: #9da8a8;
  --player-accent: #45d6b1;
  width: 100%;
  min-height: 420px;
  height: calc(100vh - 0px);
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: var(--player-text);
  background: var(--player-bg);
  font-family: "Avenir Next", Avenir, sans-serif;

  .source-bar {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    gap: 8px;
    padding: 12px;
    background: rgba(27, 34, 38, 0.35);
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  .source-input {
    flex: 1;
    min-width: 0;
    height: 32px;
    padding: 0 10px;
    border: 1px solid #3a4549;
    border-radius: 4px;
    outline: none;
    color: var(--player-text);
    background: #111719;
  }

  .source-input:focus {
    border-color: var(--player-accent);
  }

  .input-files {
    display: none;
  }

  .player-stage {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: #07090a;
  }

  .video-element {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .empty-state,
  .loading-state,
  .error-state {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: var(--player-muted);
    text-align: center;
    pointer-events: none;
  }

  .empty-state-title {
    color: var(--player-text);
    font-size: 20px;
  }

  .loading-state {
    padding: 10px 14px;
    border-radius: 4px;
    color: var(--player-text);
    background: rgba(0, 0, 0, 0.72);
  }

  .error-state {
    max-width: calc(100% - 32px);
    padding: 10px 14px;
    border-radius: 4px;
    color: #ffb4a9;
    background: rgba(0, 0, 0, 0.82);
  }

  .volume-hint {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    padding: 10px 16px;
    border-radius: 4px;
    color: var(--player-text);
    background: rgba(0, 0, 0, 0.65);
    font-size: 15px;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .stage-play {
    position: absolute;
    display: grid;
    width: 64px;
    height: 64px;
    place-items: center;
    border-radius: 50%;
    color: white;
    background: rgba(0, 0, 0, 0.58);
    font-size: 38px;
    cursor: pointer;
  }

  .control-bar {
    position: absolute;
    z-index: 2;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 8px 14px 10px;
    background: rgba(27, 34, 38, 0.35);
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  .timeline-row,
  .controls-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .timeline-row {
    gap: 10px;
    margin-bottom: 5px;
  }

  .time-label {
    min-width: 42px;
    color: var(--player-muted);
    font-size: 12px;
    font-variant-numeric: tabular-nums;
  }

  .timeline,
  .volume-slider {
    accent-color: var(--player-accent);
    cursor: pointer;
  }

  .timeline {
    flex: 1;
    min-width: 0;
  }

  .volume-slider {
    width: 82px;
  }

  .control-button,
  .text-control {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 7px;
    border: 0;
    border-radius: 4px;
    color: var(--player-text);
    background: transparent;
    font-size: 17px;
    cursor: pointer;
  }

  .control-button:hover:not(:disabled),
  .text-control:hover:not(:disabled) {
    color: var(--player-accent);
    background: #293236;
  }

  .control-button:disabled,
  .text-control:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .text-control {
    font-size: 13px;
  }

  .volume-icon {
    display: inline-flex;
    color: var(--player-muted);
  }

  .speed-select {
    height: 30px;
    padding: 0 5px;
    border: 1px solid #3a4549;
    border-radius: 4px;
    color: var(--player-text);
    background: #111719;
  }

  .control-spacer {
    flex: 1;
  }

  .source-caption {
    overflow: hidden;
    margin-top: 5px;
    color: var(--player-muted);
    font-size: 11px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.vr-player-container.controls-hidden {
  .source-bar {
    opacity: 0;
    transform: translateY(-100%);
    pointer-events: none;
  }

  .control-bar {
    opacity: 0;
    transform: translateY(100%);
    pointer-events: none;
  }
}

.vr-player-container.is-web-fullscreen {
  position: fixed;
  z-index: 9999;
  inset: 0;
  width: 100vw;
  height: 100vh;
  min-height: 0;
}

.vr-player-container:fullscreen {
  width: 100vw;
  height: 100vh;
  min-height: 0;
  background: #000;
}

@media (max-width: 640px) {
  .vr-player-container {
    height: calc(100vh - 50px);
    min-height: 320px;

    .source-bar {
      flex-wrap: wrap;
    }

    .source-input {
      flex-basis: 100%;
    }

    .controls-row {
      gap: 5px;
    }

    .volume-slider {
      width: 56px;
    }

    .text-control {
      padding: 0 4px;
      font-size: 11px;
    }
  }
}
</style>