import { createApp } from "vue";
import App from "./App.vue";
import routes from "../config/router.config";
import { createRouter, createWebHashHistory } from "vue-router";

const app = createApp(App);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

app.use(router);

app.mount("#app");
