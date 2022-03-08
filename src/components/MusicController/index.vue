<template>
  <audio
    :src="currentMusicInfo.url"
    autoplay
    controls
    @play="onPlay"
    ref="audioRef"
    @pause="onPause"
    @canplay="onCanPlay"
  />
  <div class="flex">
    <div class="song-info">
      <el-image
        :src="currentMusicInfo.al?.picUrl"
        :class="`${reactiveStyle.picture} picture-main`"
      />
      <div class="info-text">
        <multi-ellipsis
          :columns="2"
          :id="reactiveStyle.iconArea"
          :text="currentMusicInfo.name || '暂无播放中的歌曲'"
        />
        <div
          id="artist"
          v-if="currentMusicInfo.ar"
        >{{ getArtistsName(currentMusicInfo.ar) || '暂无歌手' }}</div>
      </div>
    </div>
    <el-slider
      v-model="controller.currentTime"
      :min="0"
      :max="controller.duration"
      @change="onSilderChange"
      size="small"
      :show-tooltip="false"
      class="slider"
    />
    <div class="icon-area">
      <left-circle-outlined class="icon-style" />
      <play-circle-outlined class="icon-style" style="font-size: 38px;" />
      <right-circle-outlined class="icon-style" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, toRef } from "vue";
import { useStore } from "vuex";
import { Controller, State } from "../../../store/types";
import { PlayCircleOutlined, PauseCircleOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import './index.css'
import MultiEllipsis from "../custom/MultiEllipsis.vue";

const breakpoints = useBreakpoints(breakpointsTailwind)

const sm = breakpoints.smaller('sm')
const md = breakpoints.between('sm', 'md')
const lg = breakpoints.between('md', 'lg')
const xl = breakpoints.between('lg', 'xl')
const xxl = breakpoints.between('xl', '2xl')
const xxxl = breakpoints['2xl']

const audioRef = ref<HTMLAudioElement>()
const intervalId = ref<number>()

const store = useStore();

const currentMusicInfo = toRef<State, keyof (State)>(store.state.currentMusic, 'currentMusicInfo')

const controller = reactive<Controller>(store.state.controller)

const onPlay = () => {
  intervalId.value = window.setInterval(() => {
    let currentTime = audioRef.value?.currentTime
    if (currentTime) {
      store.commit({ type: 'controller/setCurrentTime', currentTime: currentTime })
    }
  }, 300)
}

const onCanPlay = () => {
  if (audioRef.value) {
    controller.duration = audioRef.value?.duration
  }
}

const onPause = () => {
  window.clearInterval(intervalId.value)
}

const onSilderChange = (val: number) => {
  if (audioRef.value) {
    audioRef.value.currentTime = val
  }
}

const getArtistsName = (artists: { name: string }[]) => {
  let arr: string[] = []
  artists.map(item => {
    arr.push(item.name)
  })
  return arr.join('/')
}

const reactiveStyle = computed(() => {
  let iconArea = ''
  let picture = ''
  if (xxxl.value) {
    iconArea = 'music-name'
    picture = 'picture'
  } else if (xxl.value) {
    iconArea = 'xxl-music-name'
    picture = 'xxl-picture'
  } else if (xl.value) {
    iconArea = 'xl-music-name'
    picture = 'xl-picture'
  } else if (lg.value) {
    iconArea = 'lg-music-name'
    picture = 'lg-picture'
  } else if (md.value) {
    iconArea = 'md-music-name'
    picture = 'md-picture'
  } else if (sm.value) {
    iconArea = 'sm-music-name'
    picture = 'sm-picture'
  }
  return {
    iconArea,
    picture
  }
})

</script>