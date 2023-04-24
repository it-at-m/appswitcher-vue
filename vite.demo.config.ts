import { defineConfig } from "vite";
import { resolve } from "path";
import { VuetifyResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import vue from "@vitejs/plugin-vue2";

// https://vitejs.dev/config/
export default defineConfig({
  // GitLab pages is served with additional contextPath
  base: "/einrichtungsverwaltung/ezldap-vue-select/",
  plugins: [
    vue(),
    Components({
      dts: "components-demo.d.ts",
      resolvers: [VuetifyResolver()],
    }),
  ],
  build: {
    outDir: "dist-demo",
  },
});
