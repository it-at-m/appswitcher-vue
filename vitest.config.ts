import { defineConfig } from "vitest/config";
import { VuetifyResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import vue from "@vitejs/plugin-vue2";

// https://vitest.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VuetifyResolver()],
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    deps: {
      inline: ["vuetify"],
    },
    setupFiles: "tests/setup.ts",
  },
});
