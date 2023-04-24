import Vue from "vue";
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/dist/vuetify.min.css";
import Vuetify from "vuetify";

Vue.use(Vuetify);

export const vuetify = new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    dark: false,
  },
});
