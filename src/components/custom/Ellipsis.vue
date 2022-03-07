<template>
  <div class="ellipsis">{{ text }}</div>
</template>
  
<script setup lang='ts'>
defineProps({
  text: String,
  width: String
})
</script>
  
<style scoped lang="css">
.ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>