import { createStore } from "vuex";
import currentMusic from "./modules/CurrentMusic";
import currentPlaylist from "./modules/CurrentPlayList";

const store = createStore({
  modules: {
    currentMusic,
    currentPlaylist,
  },
});

export default store;
