<template>
  <div>{{ playlist.name }}</div>
  <div>{{ playlist.id }}</div>
  <el-table :data="playlist.tracks" stripe :row-key="row => row.id">
    <el-table-column type="index" label="序号" width="100">
      <template #default="{ row, $index }">
        <div class="flex" style="width: 60%;">
          <span style="margin-right: 8px;">{{ $index + 1 }}</span>
          <el-icon style="cursor: pointer;" @click="playMusic(row.id)">
            <video-play size="30" />
          </el-icon>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="歌名">
      <template #default="{ row }">
        <Ellipsis :text="row.name" />
      </template>
    </el-table-column>
    <el-table-column label="时长">
      <template #default="scope">{{ moment(scope.row.dt).format('mm:ss') }}</template>
    </el-table-column>
    <el-table-column label="歌手">
      <template #default="{ row }">
        <Ellipsis :text="getArtistsName(row.ar)" />
      </template>
    </el-table-column>
    <el-table-column prop="name" label="专辑" />
  </el-table>
</template>
  
<script setup lang='ts'>
import moment from 'moment'
import { toRef } from 'vue';
import { useStore } from 'vuex';
import { PlaylistState } from '../../../store/types';
import Ellipsis from '../custom/Ellipsis.vue';
import { VideoPlay, VideoPause } from '@element-plus/icons-vue'

const store = useStore()

store.dispatch({ type: 'currentPlaylist/getCurrentPlaylistInfo', id: 5396302207 })
const playlist = toRef<PlaylistState, keyof (PlaylistState)>(store.state.currentPlaylist, "currentPlaylistInfo")

const getArtistsName = (artists: { name: string }[]) => {
  let arr: string[] = []
  artists.map(item => {
    arr.push(item.name)
  })
  return arr.join('/')
}

const playMusic = (id: number) => {
  store.dispatch({
    type: "currentMusic/getCurrentMusicUrl",
    id: id,
  });
}

</script>
  
<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
