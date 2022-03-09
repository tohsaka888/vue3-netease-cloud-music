<script setup lang="ts">
import MusicController from './components/MusicController/index.vue';

</script>

<template>
  <div class="main-container">
    <router-view />
    <MusicController />
  </div>
</template>

<style>
html body {
  margin: 0px;
}

.main-container {
  position: relative;
  width: 100%;
  height: 100vh;
}
</style>
