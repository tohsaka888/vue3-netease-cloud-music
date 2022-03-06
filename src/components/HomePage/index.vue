<template>
  <div>{{store.state.music.music}}</div>
</template>

<script lang="ts" setup>
import { isReactive } from "vue";
import { useStore } from "vuex";

const store = useStore();

store.dispatch({
  type: "music/getCurrentPlayMusic",
  id: 1824020871,
});

console.log(isReactive(store.state.music.music));
console.log(store.state.music.music)
</script>

<style scoped>
</style>
