<template>
  <div>{{ playlist.name }}</div>
  <div>{{ playlist.id }}</div>
  <el-table :data="playlist.tracks" stripe :row-key="row => row.id" border>
    <el-table-column type="index" label="序号" width="100">
      <template #default="{ row, $index }">
        <div class="flex">
          <span>{{ $index + 1 }}</span>
          <el-icon style="cursor: pointer;" @click="playMusic(row)" :size="20">
            <template v-if="!row.playStatus">
              <video-play />
            </template>
            <template v-else>
              <video-pause />
            </template>
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
    <el-table-column label="专辑">
      <template #default="{ row }">
        <Ellipsis :text="row.al.name" />
      </template>
    </el-table-column>
  </el-table>
</template>
  
<script setup lang='ts'>
import moment from 'moment'
import { toRef } from 'vue';
import { useStore } from 'vuex';
import { Music, PlaylistState, State } from '../../../store/types';
import Ellipsis from '../custom/Ellipsis.vue';
import { VideoPlay, VideoPause } from '@element-plus/icons-vue'

const store = useStore()

store.dispatch({ type: 'currentPlaylist/getCurrentPlaylistInfo', id: 7165353697, options: { mode: 'cors' } })
const playlist = toRef<PlaylistState, keyof (PlaylistState)>(store.state.currentPlaylist, "currentPlaylistInfo")
const currentMusicInfo = toRef<State, keyof (State)>(store.state.currentMusic, 'currentMusicInfo')

const getArtistsName = (artists: { name: string }[]) => {
  let arr: string[] = []
  artists.map(item => {
    arr.push(item.name)
  })
  return arr.join('/')
}

const playMusic = async (song: Music) => {
  if (currentMusicInfo.value.id !== song.id) {
    await store.dispatch({
      type: "currentMusic/getCurrentMusicUrl",
      id: song.id,
      options: {
        mode: 'cors',
      }
    });
    // await store.dispatch({
    //   type: "currentMusic/getCurrentMusicInfo",
    //   id: song.id,
    //   options: {
    //     mode: 'cors',
    //   }
    // })
    store.commit({ type: 'currentMusic/setCurrentMusicInfo', song })
    store.commit({ type: 'currentPlaylist/setPlayStatus', id: song.id })
  }
}

</script>
  
<style scoped>
.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
