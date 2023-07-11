<template>
  <div class="music">
    <div @click="play" :class="`musicbox ${status}`"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
let audio = new Audio();
audio.src = require("@/assets/music.mp3");
audio.autoplay = true;
audio.volume = 0.5;

export default defineComponent({
  name: "MusicPlayer",
  data() {
    return {
      status: "pause",
    };
  },
  methods: {
    play() {
      if (this.status === "play") {
        audio.play();
        this.status = "pause";
        return;
      } else {
        audio.pause();
        this.status = "play";
        return;
      }
    },
  },
});
</script>

<style scoped>
.music {
  position: fixed;
  top: 10px;
  width: 60px;
  height: 60px;
  left: 20px;
  z-index: 100;
}

.musicbox {
  cursor: pointer;
  width: 30px;
  height: 30px;
}

.play {
  background-image: url("@/assets/play.png");
  background-size: 30px 30px;
  background-repeat: no-repeat;
}

.pause {
  background-image: url("@/assets/pause.png");
  background-size: 30px 30px;
  background-repeat: no-repeat;
}
</style>
