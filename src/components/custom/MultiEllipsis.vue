<template>
  <div :style="{ '-webkit-line-clamp': columns }" class="text" :id="id">{{ text }}</div>
</template>
  
<script setup lang='ts'>
defineProps({
  columns: Number,
  text: String,
  class: String,
  id: String
})
</script>
  
<style>
.text {
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>