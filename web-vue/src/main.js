import "./assets/main.css";
import { registerSW } from "virtual:pwa-register";
import { createApp } from "vue";
import App from "./App.vue";

const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    if (confirm("有新内容可用，是否刷新？")) updateSW();
  },
  onOfflineReady() {
    console.log("App ready to work offline");
  },
});
createApp(App).mount("#app");
