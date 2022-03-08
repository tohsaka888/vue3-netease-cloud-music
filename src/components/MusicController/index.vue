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
  <div class="flex music-controller">
    <div class="song-info">
      <el-image
        :src="currentMusicInfo.al?.picUrl"
        :class="`${reactiveStyle.picture} picture-main`"
      />
      <div class="info-text">
        <multi-ellipsis
          :columns="(lg || md || sm) ? 1 : 2"
          :id="reactiveStyle.iconArea"
          style="text-align: center;"
          :text="currentMusicInfo.name || '暂无播放中的歌曲'"
        />
        <ellipsis
          id="artist"
          style="text-align: center;"
          v-if="currentMusicInfo.ar"
          :text="getArtistsName(currentMusicInfo.ar) || '暂无歌手'"
        />
      </div>
    </div>
    <el-slider
      v-model="controller.currentTime"
      :min="0"
      :max="controller.duration"
      @change="onSilderChange"
      size="small"
      :show-tooltip="false"
      :class="reactiveStyle.slider"
    />
    <div class="icon-area">
      <left-circle-outlined class="icon-style" />
      <template v-if="!controller.playStatus">
        <play-circle-outlined
          class="icon-style"
          style="font-size: 38px;"
          @click="changePlayStatus"
        />
      </template>
      <template v-else>
        <pause-circle-outlined
          class="icon-style"
          style="font-size: 38px;"
          @click="changePlayStatus"
        />
      </template>
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
import Ellipsis from "../custom/Ellipsis.vue";

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

/**
 * 歌曲播放时执行,根据interval间隔不同,效果不同
 * @returns {any}
 */
const onPlay = () => {
  store.commit({ type: 'controller/setPlayStatus', playStatus: true })
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
  store.commit({ type: 'controller/setPlayStatus', playStatus: false })
  window.clearInterval(intervalId.value)
}

/**
 * 拖动slider触发事件,此事件在拖动完成后执行
 * @param {number} val
 * @returns {any}
 */
const onSilderChange = (val: number) => {
  if (audioRef.value) {
    audioRef.value.currentTime = val
  }
}

/**
 * 将后端返回数据格式化为字符串
 * @param {any} artists:{name:string}[]
 * @returns {any}
 */
const getArtistsName = (artists: { name: string }[]) => {
  let arr: string[] = []
  artists.map(item => {
    arr.push(item.name)
  })
  return arr.join('/')
}

const changePlayStatus = () => {
  if (currentMusicInfo.value.url) {
    store.commit({ type: 'controller/setPlayStatus', playStatus: !controller.playStatus })
    console.log(controller.playStatus)
    switch (controller.playStatus) {
      case true:
        audioRef.value?.play()
        break
      case false:
        audioRef.value?.pause()
        break
    }
  }
}

/**
 * 响应式样式
 * @param {any} (
 * @returns {any}
 */
const reactiveStyle = computed(() => {
  let iconArea = ''
  let picture = ''
  let slider = ''
  if (xxxl.value) {
    iconArea = 'music-name'
    picture = 'picture'
    slider = 'slider'
  } else if (xxl.value) {
    iconArea = 'xxl-music-name'
    picture = 'xxl-picture'
    slider = 'xxl-slider'
  } else if (xl.value) {
    iconArea = 'xl-music-name'
    picture = 'xl-picture'
    slider = 'xl-slider'
  } else if (lg.value) {
    iconArea = 'lg-music-name'
    picture = 'lg-picture'
    slider = 'lg-slider'
  } else if (md.value) {
    iconArea = 'md-music-name'
    picture = 'md-picture'
    slider = 'md-slider'
  } else if (sm.value) {
    iconArea = 'sm-music-name'
    picture = 'sm-picture'
    slider = 'sm-slider'
  }
  return {
    iconArea,
    picture,
    slider
  }
})

</script>