<template>
  <div style="margin-left: 24px">
    <div class="flex" style="justify-content: flex-start;margin-bottom: 24px;">
      <el-image class="playlist-cover" :src="playlist.coverImgUrl" />
      <div class="playlist-info">
        <div class="title">{{ playlist.name || '正在加载中......' }}</div>
        <div class="creator">
          <el-image class="avatar" :src="playlist.creator.avatarUrl" />
          <span class="nickname">{{ playlist.creator.nickname }}</span>
        </div>
        <el-tag v-if="playlist.tags.length" v-for="tag in playlist.tags">{{ tag }}</el-tag>
        <el-tag v-else>暂无标签</el-tag>
        <MultiEllipsis v-if="playlist.description" :text="playlist.description" :columns="4" />
        <Ellipsis v-else text="暂无描述" style="font-size: 14px; margin-top: 8px;" />
      </div>
    </div>
    <el-table
      :data="playlist.tracks"
      stripe
      :row-key="row => row.id"
      border
      v-loading="tableLoading"
      element-loading-background="rgba(f, f, f, 0.01)"
    >
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
  </div>
</template>
  
<script setup lang='ts'>
import moment from 'moment'
import { toRef } from 'vue';
import { useStore } from 'vuex';
import { Music, PlaylistState, RootState, State } from '../../../store/types';
import Ellipsis from '../custom/Ellipsis.vue';
import { VideoPlay, VideoPause } from '@element-plus/icons-vue'
import MultiEllipsis from '../custom/MultiEllipsis.vue';

const store = useStore()

store.dispatch({ type: 'currentPlaylist/getCurrentPlaylistInfo', id: 7165353697, options: { mode: 'cors' } })
const playlist = toRef<PlaylistState, keyof (PlaylistState)>(store.state.currentPlaylist, "currentPlaylistInfo")
const currentMusicInfo = toRef<State, keyof (State)>(store.state.currentMusic, 'currentMusicInfo')
const tableLoading = toRef<RootState, keyof (RootState)>(store.state, 'tableLoading')

const getArtistsName = (artists: { name: string }[]) => {
  let arr: string[] = []
  artists.map(item => {
    arr.push(item.name)
  })
  return arr.join('/')
}

const playMusic = async (song: Music) => {
  if (currentMusicInfo.value.id !== song.id) {
    store.commit({ type: 'setTableLoading', tableLoading: true })
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
    store.commit({ type: 'setTableLoading', tableLoading: false })
  }
}

</script>
  
<style scoped>
.flex {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
}

.playlist-cover {
  width: 200px;
  min-width: 200px;
  aspect-ratio: 1/1;
  box-shadow: 0px 0px 20px 10px #cecece;
}

.playlist-info {
  margin-left: 24px;
}

.avatar {
  width: 40px;
  aspect-ratio: 1/1;
  min-width: 40px;
  border-radius: 50%;
  margin-right: 8px;
}

.creator {
  display: flex;
  align-items: center;
  margin: 8px 0px;
}

.title {
  font-size: 1.8rem;
  /* font-weight: bold; */
}
</style>
