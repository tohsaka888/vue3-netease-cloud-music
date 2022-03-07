import { ActionTree, Module, MutationTree } from "vuex";
import { baseUrl } from "../../config/baseUrl";
import { Music, RootState, State } from "../types";

// initialState
const state: State = {
  // 当前播放音乐的信息
  currentMusicInfo: {
    name: "",
    id: -1,
    albums: [],
    artists: [],
    url: "",
  },
};

// mutations
const mutations: MutationTree<State> = {
  // 设置当前音乐信息
  setCurrentMusicInfo(state, payload: { song: Music }) {
    state.currentMusicInfo = { ...state.currentMusicInfo, ...payload.song };
  },
  setCurrentMusicUrl(state, payload: { url: string }) {
    state.currentMusicInfo.url = payload.url;
  },
};

// actions
const actions: ActionTree<State, RootState> = {
  // 获取当前播放音乐信息
  async getCurrentMusicInfo({ commit }, payload: { id: number }) {
    const res = await fetch(`${baseUrl}/song/detail?ids=${payload.id}`, {
      mode: "cors",
    });
    const data: { songs: Music[]; code: number } = await res.json();
    if (data.songs) {
      commit({ type: "setCurrentMusicInfo", song: data.songs[0] });
    }
  },
  // 获取当前播放音乐url
  async getCurrentMusicUrl(
    { commit },
    payload: { id: number; options: RequestInit }
  ) {
    const res = await fetch(
      `${baseUrl}/song/url?id=${payload.id}`,
      payload.options
    );
    const data: { code: number; data: Music[] } = await res.json();
    commit({ type: "setCurrentMusicUrl", url: data.data[0].url });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
} as Module<State, RootState>;
