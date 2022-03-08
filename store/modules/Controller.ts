import { Module, MutationTree } from "vuex";
import { Controller, RootState } from "../types";

// initialState
const state: Controller = {
  duration: 1,
  currentTime: 0,
  playStatus: false,
};

// mutations
const mutations: MutationTree<Controller> = {
  setDuration(state, { duration }: { duration: number }) {
    state.duration = duration;
  },
  setCurrentTime(state, { currentTime }: { currentTime: number }) {
    state.currentTime = currentTime;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
} as Module<Controller, RootState>;
