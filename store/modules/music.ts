import { ActionTree, Module, MutationTree } from "vuex";
import { baseUrl } from "../../config/baseUrl";
import { Music, RootState, State } from "../types";

// initialState
const state: State = {
  music: {
    name: "",
    id: -1,
    albums: [],
    artists: [],
    url: "",
  },
};

// mutations
const mutations: MutationTree<State> = {
  setCurrentPlayMusicInfo(state, payload: { song: Music }) {
    state.music = payload.song;
  },
};

// actions
const actions: ActionTree<State, RootState> = {
  async getCurrentPlayMusic({ commit }, payload: { id: number }) {
    const res = await fetch(`${baseUrl}/song/detail?ids=${payload.id}`);
    const data: { songs: Music[]; code: number } = await res.json();
    if (data.songs) {
      commit({ type: "setCurrentPlayMusicInfo", song: data.songs[0] });
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
} as Module<State, RootState>;
