<template>
  <div class="oscillatorType">
    <Group
      v-model:value="oscillatorType.value"
      button-style="solid"
      @change="ChangeOscillatorType"
    >
      <RadioButton v-for="t in Object.entries(oscillatorType.type)" :key="`oscillatorType-${t[0]}`" :value="t[0]">{{ t[1] }}</RadioButton>
    </Group>
  </div>
  <div id="app-piano" class="piano">
    <template v-for="(octave, octaveIndex) in octaves">
      <template v-for="(note, index) in notes">
        <div
          :class="whiteKeyClass(octaveIndex, index)"
          :style="whiteKeyStyle(octaveIndex, index)"
          @mouseover="handleKeyPressNote('white', index, octaveIndex)"
          @mouseleave="handleKeyUpNote('white', index, octaveIndex)"
        >
          <div class="tec y90-left size-lr"></div>
          <div class="tec y90-right size-lr"></div>
          <div class="tec x90-top keyTop size-t"></div>
          <div class="tec x90-front">
            <span class="f-notes">{{ note.toUpperCase() }}</span>
          </div>
        </div>
        <div
          v-if="index != 2 && index != 6"
          :class="blackKeyClass(octaveIndex, index)"
          :style="blackKeyStyle(octaveIndex, index)"
          @mouseover="handleKeyPressNote('black', index, octaveIndex)"
          @mouseleave="handleKeyUpNote('black', index, octaveIndex)"
        >
          <div class="tec y90-left size-lr"></div>
          <div class="tec y90-right size-lr"></div>
          <div class="tec x90-top keyTop size-t"></div>
          <div class="tec x90-front">
            <span class="f-notes">{{ note.toUpperCase() + '#' }}</span>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import { Group, RadioButton } from "ant-design-vue/lib/radio";
import "ant-design-vue/lib/radio/style/css";

const tone = {
  c: [16.35, 32.7, 65.41, 130.81, 261.63, 523.25, 1046.5, 2093.0, 4186.01],
  "c#": [17.32, 34.65, 69.3, 138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92],
  d: [18.35, 36.71, 73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.64],
  "d#": [
    19.45,
    38.89,
    77.78,
    155.56,
    311.13,
    622.25,
    1244.51,
    2489.02,
    4978.03
  ],
  e: [20.6, 41.2, 82.41, 164.81, 329.63, 659.26, 1318.51, 2637.02],
  f: [21.83, 43.65, 87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83],
  "f#": [23.12, 46.25, 92.5, 185.0, 369.99, 739.99, 1479.98, 2959.96],
  g: [24.5, 49.0, 98.0, 196.0, 392.0, 783.99, 1567.98, 3135.96],
  "g#": [25.96, 51.91, 103.83, 207.65, 415.3, 830.61, 1661.22, 3322.44],
  a: [27.5, 55.0, 110.0, 220.0, 440.0, 880.0, 1760.0, 3520.0],
  "a#": [29.14, 58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31],
  b: [30.87, 61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07]
};
export default {
  components: { Group, RadioButton },
  data() {
    return {
      octaves: new Array(2),
      notes: ["c", "d", "e", "f", "g", "a", "b"],
      keyMap: {},
      activeButtonIdMap: {},
      keys: [],
      audio: null,
      gainNode: null,
      oscillatorType: {
        value: 'sine',
        type: {
          sine: '正弦波', square: '方波', triangle: '三角波', sawtooth: '锯齿波'
        }
      }
    };
  },
  created() {
    window.addEventListener("keypress", this.handleKeyPressNote);
    window.addEventListener("keyup", this.handleKeyUpNote);
  },
  mounted() {
    this.initKeys();
    this.initAudio();
  },
  methods: {
    /*  */
    ChangeOscillatorType(val) {
      this.oscillatorType.value = val.target.value;
    },
    initAudio() {
      this.audio = new (window.AudioContext || window.webkitAudioContext)();
      this.gainNode = this.audio.createGain();
      this.gainNode.gain.value = 0.1;
      this.gainNode.connect(this.audio.destination);
    },
    playTone(id) {
      let oscillator;

      oscillator = this.audio.createOscillator();
      oscillator.type = this.oscillatorType.value || "sine";
      oscillator.connect(this.gainNode);
      oscillator.frequency.value = this.getFrequency(id);
      oscillator.start();

      return { oscillator };
    },
    stopTone(id) {
      const { oscillator } = this.activeButtonIdMap[id];
;
      oscillator?.stop();
    },
    whiteKeyClass(octaveIndex, index) {
      return `white-key-group key tom-${this.notes[index]}${this.isActive(
        this.keys[index + octaveIndex * 12]
      )}`;
    },
    whiteKeyStyle(octaveIndex, index) {
      return `left:${60 * octaveIndex * this.notes.length + 60 * index}px`;
    },
    blackKeyClass(octaveIndex, index) {
      return `black-key-group key tom-s${this.notes[index]}${this.isActive(
        this.keys[
          index + (index === 0 || index === 1 ? 7 : 6) + octaveIndex * 12
        ]
      )}`;
    },
    blackKeyStyle(octaveIndex, index) {
      return `left: ${
        60 * octaveIndex * this.notes.length + 60 * index + 45
      }px`;
    },
    isActive(key) {
      return this.activeButtonIdMap[this.keyMap[key]] ? " pressed" : "";
    },
    initKeys() {
      this.keyMap = {
        a: "C3",
        s: "D3",
        d: "E3",
        f: "F3",
        h: "G3",
        j: "A3",
        k: "B3",
        q: "C#3",
        w: "D#3",
        e: "F#3",
        r: "G#3",
        t: "A#3",
        z: "C4",
        x: "D4",
        c: "E4",
        v: "F4",
        b: "G4",
        n: "A4",
        m: "B4",
        y: "C#4",
        u: "D#4",
        i: "F#4",
        o: "G#4",
        p: "A#4"
      };
      this.keys = Object.keys(this.keyMap);
    },
    getFrequency(note) {
      var octave, key;
      note = note.toLowerCase();

      if (note.length === 3) {
        octave = note.charAt(2);
        key = note.slice(0, 2);
      } else {
        octave = note.charAt(1);
        key = note.slice(0, 1);
      }
      octave = +octave + 1;
      return tone[key][octave];
    },
    handleKeyPressNote(e, index, octaveIndex) {
      let key = "";
      if (e.key) {
        key = e.key.toLowerCase();
      } else {
        if (e === "white") {
          key = this.keys[index + octaveIndex * 12];
        } else {
          key = this.keys[
            index + (index === 0 || index === 1 ? 7 : 6) + octaveIndex * 12
          ];
        }
      }
      const id = this.keyMap[key];

      if (!this.activeButtonIdMap[id]) {
        const { oscillator } = this.playTone(id);
        this.activeButtonIdMap[id] = { oscillator };
      }
    },
    handleKeyUpNote(e, index, octaveIndex) {
      let key = "";
      if (e.key) {
        key = e.key.toLowerCase();
      } else {
        if (e === "white") {
          key = this.keys[index + octaveIndex * 12];
        } else {
          key = this.keys[
            index + (index === 0 || index === 1 ? 7 : 6) + octaveIndex * 12
          ];
        }
      }
      const id = this.keyMap[key];

      if (id && this.activeButtonIdMap[id]) {
        this.stopTone(id);
        // this.$delete(this.activeButtonIdMap, id);
        if (this.activeButtonIdMap[id]) delete this.activeButtonIdMap[id];
      }
    }
  }
};
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style lang="scss">
@mixin createKey(
  $colorLeft,
  $colorRight,
  $colorTop,
  $colorFront,
  $borderColor,
  $keyWidth,
  $keyHeight,
  $keyDeep
) {
  transform-style: preserve-3d;
  width: $keyWidth;
  height: $keyHeight;
  position: absolute;
  transform-origin: 0% 0% (-$keyDeep);
  backface-visibility: hidden;
  transition: 0.2s;

  .size-lr {
    width: $keyDeep;
    height: $keyHeight;
  }
  .size-t {
    width: $keyWidth;
    height: $keyDeep;
  }
  .tec {
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: 0% 0%;
    border: 1px solid $borderColor;
  }
  .y90-left {
    transform: rotateY(90deg);
    background: $colorLeft;
    background-image: linear-gradient(to bottom right, $colorTop, $colorLeft);
  }
  .y90-right {
    transform: rotateY(90deg);
    left: $keyWidth;
    background: $colorRight;
    background-image: linear-gradient(to bottom right, $colorTop, $colorRight);
  }
  .x90-top {
    transform: rotateX(-90deg);
    background: $colorTop;
    background-image: linear-gradient(to bottom right, $colorFront, $colorTop);
  }
  .x90-front {
    transform: rotateX(0deg);
    width: $keyWidth;
    height: $keyHeight;
    background: $colorFront;
    background-image: linear-gradient(to top bottom, $colorTop, $colorFront);
    position: relative;
  }
  .x90-front2 {
    transform: rotateY(0deg);
    margin-left: $keyWidth;
    width: $keyWidth;
    height: $keyHeight;
    background: $colorFront;
    background-image: linear-gradient(
      to bottom right,
      $colorRight,
      $colorFront
    );
  }
}
#app-piano {
  width: 800px;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  // position: relative;
  // overflow-y: hidden;
}

.oscillatorType {
  position: absolute;
  top: 50px;
  right: 50px;
}

.piano {
  transform-style: preserve-3d;
  perspective: 1500px;
  position: absolute;
  width: 1260px;
  height: 70px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateZ(10px) rotateY(0deg) rotateX(-50deg);
}
.white-key-group {
  z-index: 1;
  @include createKey(#999, #999, #fff, #eee, #ccc, 60px, 70px, 400px);
  &.pressed {
    transform: rotateX(-10deg);
  }
}
.black-key-group {
  margin-top: -42px;
  transform: translateZ(-150px);
  z-index: 100;
  @include createKey(#222, #222, #111, #333, #222, 30px, 40px, 250px);

  .f-notes {
    color: #eee;
    top: 5%;
  }
  .f-keymap {
    color: #eee;
    bottom: 5%;
  }

  &.pressed {
    transform: rotateX(-10deg) translateZ(-150px);
    margin-top: -20px;
  }
}

.active {
  box-shadow: 0px 0px 150px 10px #72ecfc;
}
.f-notes {
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #222;
  position: absolute;
  top: 10%;
  width: 100%;
  text-align: center;
}
.f-keymap {
  text-align: center;
  font-weight: bold;
  font-size: 12px;
  color: #222;
  position: absolute;
  bottom: 10%;
  width: 100%;
  text-align: center;
}
</style>
