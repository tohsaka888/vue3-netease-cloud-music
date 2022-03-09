<template>
  <div class="container">
    <el-menu mode="horizontal" style="flex: 1;">
      <el-menu-item
        v-for="(item, index) in items"
        :index="index.toString()"
        @click="navigateTo(item.route)"
      >{{ item.name }}</el-menu-item>
    </el-menu>
  </div>
</template>
  
<script setup lang='ts'>
import { useRouter } from 'vue-router';
import items from './Items';

const router = useRouter()

const navigateTo = (route: string) => {
  router.push(route)
}


</script>
  
<style scoped>
.container {
  display: flex;
  height: 60px;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 100;
}
</style>