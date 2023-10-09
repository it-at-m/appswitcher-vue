import { defineConfig } from "vite";
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'


// https://vitejs.dev/config/
export default defineConfig({
  // GitLab pages is served with additional contextPath
  base: "/einrichtungsverwaltung/ezldap-vue-select/",
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    vuetify({
      autoImport: true,
    }),
    ViteFonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
  ],
  build: {
    outDir: "dist-demo",
  },
});
