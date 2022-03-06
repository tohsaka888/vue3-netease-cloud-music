import { createStore } from "vuex";
import currentMusic from "./modules/CurrentMusic";

const store = createStore({
  modules: {
    currentMusic,
  }
});

export default store;
