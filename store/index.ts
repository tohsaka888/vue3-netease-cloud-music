import { createStore } from "vuex";
import music from "./modules/music";

const store = createStore({
  modules: {
    music,
  }
});

export default store;
