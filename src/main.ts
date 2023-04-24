import Vue from "vue";
import App from "./App.vue";
import { vuetify } from "./vuetify";

Vue.config.productionTip = false;

const app = new Vue({
  vuetify: vuetify,
  render: (h) => h(App),
});

app.$mount("#app");
