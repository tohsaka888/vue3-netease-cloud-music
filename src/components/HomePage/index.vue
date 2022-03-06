<template>
  <div>{{ currentMusicInfo }}</div>
</template>

<script lang="ts" setup>
import { isReactive, toRef } from "vue";
import { useStore } from "vuex";

const store = useStore();

store.dispatch({
  type: "currentMusic/getCurrentMusicInfo",
  id: 1824020871,
});


console.log(isReactive(store.state.currentMusic.currentMusicInfo));

const currentMusicInfo = toRef(store.state.currentMusic, 'currentMusicInfo')

</script>

<style scoped>
</style>
