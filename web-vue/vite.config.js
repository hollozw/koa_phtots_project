import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType: "autoUpdate", // 推荐自动更新（用户几乎无感）
      devOptions: {
        enabled: true,
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff2}"],
        runtimeCaching: [
          // 1. 所有图片优先使用缓存（可长期保留）
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp|gif|ico)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images",
              expiration: { maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 }, // 30天
            },
          },

          // 2. API 请求 - 优先网络，失败用最后一次成功的缓存（推荐）
          {
            urlPattern: ({ url }) => {
              // 根据你的实际 API 前缀匹配
              return (
                url.origin === self.location.origin &&
                url.pathname.startsWith("/api/")
              );
              // 或更宽松： /\/api\//
            },
            handler: "NetworkFirst", // 优先走网络
            method: "GET",
            options: {
              cacheName: "api-responses",
              networkTimeoutSeconds: 10, // 10秒超时才用缓存
              cacheableResponse: {
                statuses: [0, 200], // 只缓存成功的响应（0是opaque跨域）
              },
              expiration: {
                maxEntries: 100, // 最多缓存100个不同请求
                maxAgeSeconds: 24 * 60 * 60, // 缓存一天（可调长）
                purgeOnQuotaError: true,
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});


