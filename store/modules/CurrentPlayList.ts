import { ActionTree, Module, MutationTree } from "vuex";
import { baseUrl, realIP } from "../../config/baseUrl";
import { Playlist, PlaylistState, RootState } from "../types";

// inititalState
const state: PlaylistState = {
  currentPlaylistInfo: {
    name: "",
    id: -1,
    tracks: [],
    tags: [],
    coverImgUrl: "",
  },
};

// mutations
const mutations: MutationTree<PlaylistState> = {
  setCurrentPlaylistInfo(state, payload: { playlist: Playlist }) {
    state.currentPlaylistInfo = payload.playlist;
  },
  setPlayStatus(state, payload: { id: number }) {
    state.currentPlaylistInfo.tracks.forEach((song) => {
      if (song.id === payload.id) {
        song.playStatus = !song.playStatus;
        return false;
      }
    });
  },
};

// actions
const actions: ActionTree<PlaylistState, RootState> = {
  async getCurrentPlaylistInfo(
    { commit },
    { id, options }: { id: number; options?: RequestInit }
  ) {
    const res = await fetch(
      `${baseUrl}/playlist/detail?id=${id}${realIP}`,
      options
    );
    const data: { code: number; playlist: Playlist } = await res.json();
    if (data.code === 200) {
      commit({ type: "setCurrentPlaylistInfo", playlist: data.playlist });
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
} as Module<PlaylistState, RootState>;
