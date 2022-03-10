<script setup lang="ts">
import { computed } from 'vue';
import MusicController from './components/MusicController/index.vue';
import Navbar from './components/Navbar/index.vue';
const reactiveStyle = computed(() => {

})
</script>

<template>
  <div class="main-container">
    <div class="main-flex">
      <Sider />
      <div class="router-view">
        <Navbar />
        <div class="route">
          <router-view />
        </div>
      </div>
    </div>
    <MusicController />
  </div>
</template>

<style>
html body {
  margin: 0px;
  overflow-x: hidden;
}

.main-container {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.main-flex {
  display: flex;
  width: 100%;
}

.router-view {
  padding: 16px 0px 0px 0px;
  width: 82vw;
  position: fixed;
  top: 0;
  bottom: 0;
  overflow: auto;
  right: 0px;
  min-width: 640px;
}

.route {
  margin-top: 60px;
  margin-bottom: 120px;
}
</style>
