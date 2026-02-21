<script setup>
import { onMounted } from "vue";
import { RouterLink } from "vue-router";

onMounted(() => {
  window.addEventListener("online", () => {
    console.log("网络已连接");
    return (isOnline.value = true);
  });
  window.addEventListener("offline", () => {
    console.log("网络连接已断开");
    return (isOnline.value = false);
  });
});

const routes = [
  {
    name: '首页',
    path: '/',
  },
  {
    name: '文件编辑',
    path: '/fileEdit'
  }
]
</script>

<template>
  <header class="app-header">
    <router-link v-for="item in routes" class="link" :to="item.path">{{ item.name }}</router-link>
  </header>
  <router-view></router-view>
</template>

<style scoped lang="scss">
.app-header {
  height: 60px;
  display: flex;
  box-sizing: border-box;
  border-bottom: 1px dashed #000;
  justify-content: space-around;

  .link {
    color: #000;
    text-decoration: none;
    font-size: 18px;
    line-height: 60px;
    padding: 0 20px;
  }
}
</style>
