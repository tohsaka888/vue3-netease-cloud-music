<template>
  <div>{{ playlist.name }}</div>
  <div>{{ playlist.id }}</div>
</template>
  
<script setup lang='ts'>
import { toRef } from 'vue';
import { useStore } from 'vuex';
import { PlaylistState } from '../../../store/types';

const store = useStore()

store.dispatch({ type: 'currentPlaylist/getCurrentPlaylistInfo', id: 5396302207 })
const playlist = toRef<PlaylistState, keyof (PlaylistState)>(store.state.currentPlaylist, "currentPlaylistInfo")

</script>
  
<style scoped>

</style>