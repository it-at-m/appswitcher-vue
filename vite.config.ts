import { defineConfig } from "vite";
import { resolve } from "path";
import { VuetifyResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import vue from "@vitejs/plugin-vue2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VuetifyResolver()],
    }),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/components/index.ts"),
      name: "Appswitcher",
      // the proper extensions will be added
      fileName: "appswitcher",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["vue", "vuetify", "vuetify/lib"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: "Vue",
          "vuetify/lib": "Vuetify",
        },
      },
    },
  },
});
