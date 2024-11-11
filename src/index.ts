/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components

// Composables
import { createApp } from "vue";

import App from "./App.vue";
// Plugins
import { registerPlugins } from "./plugins/index";

const app = createApp(App);

registerPlugins(app);

app.mount("#app");
