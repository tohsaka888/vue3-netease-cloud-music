<template>
  <div>{{ currentMusicInfo }}</div>
</template>

<script lang="ts" setup>
import { toRef } from "vue";
import { useStore } from "vuex";
import { State } from "../../../store/types";

const store = useStore();

store.dispatch({
  type: "currentMusic/getCurrentMusicInfo",
  id: 1824020871,
});

const currentMusicInfo = toRef<State, keyof (State)>(store.state.currentMusic, 'currentMusicInfo')

</script>

<style scoped>
</style>
