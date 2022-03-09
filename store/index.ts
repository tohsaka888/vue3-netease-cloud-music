import { createStore } from "vuex";
import currentMusic from "./modules/CurrentMusic";
import currentPlaylist from "./modules/CurrentPlayList";
import controller from "./modules/Controller";

const store = createStore({
  modules: {
    currentMusic,
    currentPlaylist,
    controller,
  },
  state: {
    tableLoading: false,
  },
  mutations: {
    setTableLoading(state, { tableLoading }: { tableLoading: boolean }) {
      state.tableLoading = tableLoading;
    },
  },
});

export default store;
