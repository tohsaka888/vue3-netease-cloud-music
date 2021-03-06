import { RouteRecordRaw } from "vue-router";
import HomePage from "../src/components/HomePage/index.vue";
import My from "../src/components/My/index.vue";
import Playlist from "../src/components/Playlist/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/my",
    component: My,
  },
  {
    path: "/playlist",
    component: Playlist,
  },
];

export default routes;
