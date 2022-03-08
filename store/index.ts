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
});

export default store;
