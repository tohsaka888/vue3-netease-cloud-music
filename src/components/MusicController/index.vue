<template>
  <audio
    :src="currentMusicInfo.url"
    autoplay
    controls
  />
</template>

<script lang="ts" setup>
import { toRef } from "vue";
import { useStore } from "vuex";
import { State } from "../../../store/types";

const store = useStore();

const currentMusicInfo = toRef<State, keyof (State)>(store.state.currentMusic, 'currentMusicInfo')
</script>

<style scoped>
</style>