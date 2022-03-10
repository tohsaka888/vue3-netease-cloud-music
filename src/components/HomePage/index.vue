<template>
  <div style="margin: 0px 24px;">
    <el-carousel type="card" height="200px" :initial-index="0">
      <el-carousel-item
        v-for="(banner, index) in banners?.banners"
        :key="index"
        style="box-shadow: 0px 0px 5px 2px #cecece;border-radius: 10px;"
      >
        <el-image :src="banner.imageUrl" class="banner" />
      </el-carousel-item>
    </el-carousel>
    <div class="title">推荐歌曲</div>
    <div class="title">推荐歌单</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { baseUrl } from '../../../config/baseUrl';

const banners = ref<{ code: number; banners: { imageUrl: string }[] }>()

const getBanner = async () => {
  const res = await fetch(`${baseUrl}/banner?type=0`);
  const data = await res.json()
  banners.value = data
}

getBanner()

</script>

<style scoped>
.banner {
  height: 200px;
  width: 100%;
  border-radius: 10px;
  min-width: 500px;
}

.title {
  font-size: 1.2rem;
}
</style>
