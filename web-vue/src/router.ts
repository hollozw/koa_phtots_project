import { createWebHistory, createRouter } from "vue-router";
import HomeView from "@/packages/HomeView.vue";
import FileView from "@/packages/FileView.vue";
import FileEdit from "./packages/FileEdit.vue";

const routes = [
  { path: "/", name: 'Home', component: HomeView },
  { path: "/file", name: 'File', component: FileView },
  { path: "/fileEdit", name: 'FileEdit', component: FileEdit },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
